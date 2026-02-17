const bcrypt = require('bcryptjs');
const prisma = require('../config/database');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../config/jwt');
const { sendOTPEmail, sendWelcomeEmail } = require('../utils/emailService');
const { generateOTP, getOTPExpiryTime } = require('../utils/otpGenerator');
const {
  validateEmail,
  validateKhwopaEmail,
  validatePassword,
  sanitizeInput
} = require('../utils/validators');

/**
 * Signup - Step 1: Create user account and send OTP
 */
const signup = async (req, res, next) => {
  try {
    const { email, password, name, phoneNumber, department, collegeId } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required'
      });
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedName = sanitizeInput(name);

    // Validate email format
    if (!validateEmail(sanitizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate Khwopa email domain
    if (!validateKhwopaEmail(sanitizedEmail)) {
      return res.status(400).json({
        success: false,
        message: `Email must be from ${process.env.ALLOWED_EMAIL_DOMAIN || '@khwopa.edu.np'} domain`
      });
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.message
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: sanitizedEmail }
    });

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(409).json({
          success: false,
          message: 'User already exists. Please login.'
        });
      } else {
        // User exists but not verified, delete old account and create new
        await prisma.user.delete({
          where: { id: existingUser.id }
        });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Determine collegeId (default to 1 if not provided)
    const userCollegeId = collegeId || 1;

    // Check if college exists, if not create default college
    let college = await prisma.college.findUnique({
      where: { id: userCollegeId }
    });

    if (!college) {
      college = await prisma.college.create({
        data: {
          id: 1,
          name: 'Khwopa College of Engineering',
          location: 'Bhaktapur, Nepal'
        }
      });
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email: sanitizedEmail,
        password: hashedPassword,
        name: sanitizedName,
        phoneNumber: phoneNumber || null,
        department: department || null,
        collegeId: college.id,
        isVerified: false
      }
    });

    // Generate OTP
    const otpCode = generateOTP(parseInt(process.env.OTP_LENGTH) || 6);
    const otpExpiry = getOTPExpiryTime(parseInt(process.env.OTP_EXPIRES_IN) || 10);

    // Save OTP to database
    await prisma.oTP.create({
      data: {
        code: otpCode,
        expiresAt: otpExpiry,
        userId: user.id
      }
    });

    // Send OTP email
    const emailResult = await sendOTPEmail(sanitizedEmail, otpCode, sanitizedName);

    if (!emailResult.success) {
      // If email fails, delete user and return error
      await prisma.user.delete({ where: { id: user.id } });

      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? emailResult.error : undefined
      });
    }

    res.status(201).json({
      success: true,
      message: 'Signup successful! OTP sent to your email.',
      data: {
        userId: user.id,
        email: user.email,
        name: user.name,
        otpExpiresIn: `${process.env.OTP_EXPIRES_IN || 10} minutes`
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify OTP - Step 2: Verify OTP and complete registration
 */
const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    // Validate required fields
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedOTP = sanitizeInput(otp);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: sanitizedEmail }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'User already verified. Please login.'
      });
    }

    // Find valid OTP
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        userId: user.id,
        code: sanitizedOTP,
        used: false,
        expiresAt: {
          gt: new Date()
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Mark OTP as used
    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { used: true }
    });

    // Update user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true }
    });

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Save refresh token
    const refreshExpiry = new Date();
    refreshExpiry.setDate(refreshExpiry.getDate() + 30); // 30 days

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        expiresAt: refreshExpiry,
        userId: user.id
      }
    });

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully! You are now logged in.',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phoneNumber: user.phoneNumber,
          department: user.department,
          collegeId: user.collegeId
        },
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Resend OTP
 */
const resendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const sanitizedEmail = sanitizeInput(email).toLowerCase();

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: sanitizedEmail }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'User already verified. Please login.'
      });
    }

    // Mark all previous OTPs as used
    await prisma.oTP.updateMany({
      where: {
        userId: user.id,
        used: false
      },
      data: { used: true }
    });

    // Generate new OTP
    const otpCode = generateOTP(parseInt(process.env.OTP_LENGTH) || 6);
    const otpExpiry = getOTPExpiryTime(parseInt(process.env.OTP_EXPIRES_IN) || 10);

    // Save OTP to database
    await prisma.oTP.create({
      data: {
        code: otpCode,
        expiresAt: otpExpiry,
        userId: user.id
      }
    });

    // Send OTP email
    const emailResult = await sendOTPEmail(sanitizedEmail, otpCode, user.name);

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email. Please try again later.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP resent successfully!',
      data: {
        email: user.email,
        otpExpiresIn: `${process.env.OTP_EXPIRES_IN || 10} minutes`
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const sanitizedEmail = sanitizeInput(email).toLowerCase();

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: sanitizedEmail }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if verified
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Email not verified. Please verify your email first.'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Save refresh token
    const refreshExpiry = new Date();
    refreshExpiry.setDate(refreshExpiry.getDate() + 30);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        expiresAt: refreshExpiry,
        userId: user.id
      }
    });

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phoneNumber: user.phoneNumber,
          department: user.department,
          profileImageUrl: user.profileImageUrl,
          coverImageUrl: user.coverImageUrl,
          collegeId: user.collegeId
        },
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh access token
 */
const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
    }

    // Check if token exists in database
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken }
    });

    if (!tokenRecord) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not found'
      });
    }

    // Check if token expired
    if (new Date() > tokenRecord.expiresAt) {
      // Delete expired token
      await prisma.refreshToken.delete({
        where: { id: tokenRecord.id }
      });

      return res.status(401).json({
        success: false,
        message: 'Refresh token expired. Please login again.'
      });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(decoded.userId);

    res.status(200).json({
      success: true,
      message: 'Access token refreshed successfully',
      data: {
        accessToken: newAccessToken
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout
 */
const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      // Delete refresh token from database
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        department: true,
        profileImageUrl: true,
        coverImageUrl: true,
        collegeId: true,
        isVerified: true,
        createdAt: true,
        college: {
          select: {
            id: true,
            name: true,
            location: true
          }
        },
        mentor: {
          select: {
            reviews: {
              select: {
                rating: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const avgRating = user.mentor?.reviews.length > 0
      ? user.mentor.reviews.reduce((acc, curr) => acc + curr.rating, 0) / user.mentor.reviews.length
      : 0;

    const responseUser = {
      ...user,
      avgRating: parseFloat(avgRating.toFixed(1)),
      reviewCount: user.mentor?.reviews.length || 0
    };
    delete responseUser.mentor;

    res.status(200).json({
      success: true,
      data: { user: responseUser }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, phoneNumber, department, profileImageUrl, coverImageUrl } = req.body;

    const updateData = {};
    if (name) updateData.name = sanitizeInput(name);
    if (phoneNumber) updateData.phoneNumber = sanitizeInput(phoneNumber);
    if (department) updateData.department = sanitizeInput(department);
    if (profileImageUrl !== undefined) updateData.profileImageUrl = profileImageUrl;
    if (coverImageUrl !== undefined) updateData.coverImageUrl = coverImageUrl;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        department: true,
        profileImageUrl: true,
        coverImageUrl: true,
        collegeId: true,
        createdAt: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  verifyOTP,
  resendOTP,
  login,
  refreshAccessToken,
  logout,
  getProfile,
  updateProfile
};
