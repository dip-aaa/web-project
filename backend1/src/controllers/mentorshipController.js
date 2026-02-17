const prisma = require('../config/database');
const { createNotification } = require('./notificationController');

/**
 * Get all users who can be mentors
 */
const getMentors = async (req, res, next) => {
  try {
    const { search, department, year } = req.query;
    const currentUserId = req.user.id;

    // Build filter
    const where = {
      id: { not: currentUserId }, // Exclude current user
      isVerified: true,
      mentor: {
        isNot: null // Only users who are mentors
      }
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { department: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (department) {
      where.department = department;
    }

    // Get users who are mentors
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
        phoneNumber: true,
        mentor: {
          select: {
            expertiseArea: true,
            reviews: {
              select: {
                rating: true
              }
            }
          }
        }
      },
      take: 50
    });

    // Format response
    const formattedUsers = users.map(user => {
      const avgRating = user.mentor?.reviews.length > 0
        ? user.mentor.reviews.reduce((acc, curr) => acc + curr.rating, 0) / user.mentor.reviews.length
        : 0;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department || 'Not specified',
        phoneNumber: user.phoneNumber,
        role: 'mentor',
        expertiseArea: user.mentor?.expertiseArea,
        isMentor: true,
        avgRating: parseFloat(avgRating.toFixed(1)),
        reviewCount: user.mentor?.reviews.length || 0
      };
    });

    res.status(200).json({
      success: true,
      data: formattedUsers
    });
  } catch (error) {
    console.error('Get mentors error:', error);
    next(error);
  }
};


/**
 * Send connection request to a mentor
 */
const sendConnectionRequest = async (req, res, next) => {
  try {
    const { mentorId } = req.body;
    const menteeUserId = req.user.id;

    if (!mentorId) {
      return res.status(400).json({
        success: false,
        message: 'Mentor ID is required'
      });
    }

    // Check if mentor exists and has mentor profile
    const mentor = await prisma.mentor.findUnique({
      where: { userId: parseInt(mentorId) },
      include: { user: true }
    });

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found or user is not a mentor'
      });
    }

    // Ensure current user is a mentee
    let mentee = await prisma.mentee.findUnique({
      where: { userId: menteeUserId }
    });

    if (!mentee) {
      // Create mentee profile if doesn't exist
      mentee = await prisma.mentee.create({
        data: {
          userId: menteeUserId
        }
      });
    }

    // Check for ANY existing requests between these two users
    const existingRequests = await prisma.request.findMany({
      where: {
        mentorId: mentor.userId,
        menteeId: mentee.userId
      }
    });

    // Cleanup logic: If there are multiple requests or cancelled ones, we might need to clean up
    if (existingRequests.length > 0) {
      // Check if there is already a pending or accepted request
      const activeRequest = existingRequests.find(r =>
        r.requestStatus === 'pending' || r.requestStatus === 'accepted'
      );

      if (activeRequest) {
        if (activeRequest.requestStatus === 'accepted') {
          return res.status(400).json({
            success: false,
            message: 'You are already connected with this mentor'
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Connection request already sent'
          });
        }
      }

      // If we're here, it means all existing requests are rejected or cancelled (or some other state)
      // We should delete them to avoid clutter and allow a new request
      // (Optionally, we could just update the status of one, but creating fresh is cleaner and avoids history confusion)
      await prisma.request.deleteMany({
        where: {
          mentorId: mentor.userId,
          menteeId: mentee.userId
        }
      });
    }

    // Create connection request
    const request = await prisma.request.create({
      data: {
        mentorId: mentor.userId,
        menteeId: mentee.userId,
        requestStatus: 'pending',
        requestSent: new Date()
      },
      include: {
        mentor: {
          include: {
            user: true
          }
        },
        mentee: {
          include: {
            user: true
          }
        }
      }
    });

    // Notify mentor about new connection request
    try {
      await createNotification({
        userId: mentor.userId,
        type: 'mentorship_request',
        title: '🤝 New Connection Request',
        message: `${request.mentee.user.name} wants to connect with you as a mentor`,
        data: { requestId: request.id, menteeId: mentee.userId, menteeName: request.mentee.user.name }
      });
    } catch (notifError) {
      console.error('Error creating notification:', notifError);
    }

    res.status(201).json({
      success: true,
      message: 'Connection request sent successfully',
      data: {
        id: request.id,
        mentorName: request.mentor.user.name,
        menteeName: request.mentee.user.name,
        status: request.requestStatus,
        sentAt: request.requestSent
      }
    });
  } catch (error) {
    console.error('Send connection request error:', error);
    next(error);
  }
};


/**
 * Get connection requests (notifications) for current user
 */
const getConnectionRequests = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { type = 'received' } = req.query; // received or sent

    let requests;
    if (type === 'received') {
      // Get requests received by current user (as mentor)
      requests = await prisma.request.findMany({
        where: {
          mentorId: userId
        },
        include: {
          mentee: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  department: true
                }
              }
            }
          }
        },
        orderBy: {
          requestSent: 'desc'
        }
      });

      const formattedRequests = requests.map(req => ({
        id: req.id,
        status: req.requestStatus,
        sentAt: req.requestSent,
        receivedAt: req.requestReceived,
        mentee: {
          id: req.mentee.user.id,
          name: req.mentee.user.name,
          email: req.mentee.user.email,
          department: req.mentee.user.department
        }
      }));

      res.status(200).json({
        success: true,
        data: formattedRequests
      });
    } else {
      // Get requests sent by current user (as mentee)
      requests = await prisma.request.findMany({
        where: {
          menteeId: userId
        },
        include: {
          mentor: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  department: true
                }
              }
            }
          }
        },
        orderBy: {
          requestSent: 'desc'
        }
      });

      const formattedRequests = requests.map(req => ({
        id: req.id,
        status: req.requestStatus,
        sentAt: req.requestSent,
        receivedAt: req.requestReceived,
        mentor: {
          id: req.mentor.user.id,
          name: req.mentor.user.name,
          email: req.mentor.user.email,
          department: req.mentor.user.department
        }
      }));

      res.status(200).json({
        success: true,
        data: formattedRequests
      });
    }
  } catch (error) {
    console.error('Get connection requests error:', error);
    next(error);
  }
};

/**
 * Accept or reject connection request
 */
const respondToRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const { action } = req.body; // 'accept' or 'reject'
    const userId = req.user.id;

    if (!['accept', 'reject'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Use "accept" or "reject"'
      });
    }

    // Get request
    const request = await prisma.request.findUnique({
      where: { id: parseInt(requestId) },
      include: {
        mentor: { include: { user: true } },
        mentee: { include: { user: true } }
      }
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Verify user is the mentor
    if (request.mentorId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to respond to this request'
      });
    }

    // Update request status
    const updatedRequest = await prisma.request.update({
      where: { id: parseInt(requestId) },
      data: {
        requestStatus: action === 'accept' ? 'accepted' : 'rejected',
        requestReceived: new Date()
      }
    });

    // Notify mentee about response
    try {
      await createNotification({
        userId: request.menteeId,
        type: 'mentorship_response',
        title: action === 'accept' ? '✅ Request Accepted!' : '❌ Request Declined',
        message: action === 'accept'
          ? `${request.mentor.user.name} accepted your mentorship request`
          : `${request.mentor.user.name} declined your mentorship request`,
        data: { requestId: request.id, mentorId: request.mentorId, mentorName: request.mentor.user.name, action }
      });
    } catch (notifError) {
      console.error('Error creating notification:', notifError);
    }

    res.status(200).json({
      success: true,
      message: `Request ${action}ed successfully`,
      data: {
        id: updatedRequest.id,
        status: updatedRequest.requestStatus
      }
    });
  } catch (error) {
    console.error('Respond to request error:', error);
    next(error);
  }
};

/**
 * Cancel a pending connection request (for mentees who sent the request)
 */
const cancelConnectionRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const userId = req.user.id;

    // Get request
    const request = await prisma.request.findUnique({
      where: { id: parseInt(requestId) },
      include: {
        mentor: { include: { user: true } },
        mentee: { include: { user: true } }
      }
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Verify user is the mentee who sent the request
    if (request.menteeId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to cancel this request'
      });
    }

    // Only pending requests can be canceled
    if (request.requestStatus !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending requests can be canceled'
      });
    }

    // Delete the request
    await prisma.request.delete({
      where: { id: parseInt(requestId) }
    });

    res.status(200).json({
      success: true,
      message: 'Connection request canceled successfully'
    });
  } catch (error) {
    console.error('Cancel connection request error:', error);
    next(error);
  }
};

/**
 * Get user profile by ID
 */
const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
        phoneNumber: true,
        createdAt: true,
        college: {
          select: {
            name: true,
            location: true
          }
        },
        mentor: {
          select: {
            expertiseArea: true,
            requestsReceived: {
              where: {
                requestStatus: 'accepted'
              },
              select: {
                id: true
              }
            },
            reviews: {
              select: {
                rating: true
              }
            }
          }
        },
        mentee: {
          select: {
            interestArea: true,
            requestsSent: {
              where: {
                requestStatus: 'accepted'
              },
              select: {
                id: true
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

    // Format response
    const profile = {
      id: user.id,
      name: user.name,
      email: user.email,
      department: user.department || 'Not specified',
      phoneNumber: user.phoneNumber,
      college: user.college.name,
      location: user.college.location,
      memberSince: user.createdAt,
      role: user.mentor && user.mentee ? 'both' : user.mentor ? 'mentor' : user.mentee ? 'mentee' : 'student',
      expertiseArea: user.mentor?.expertiseArea,
      interestArea: user.mentee?.interestArea,
      mentorConnections: user.mentor?.requestsReceived.length || 0,
      menteeConnections: user.mentee?.requestsSent.length || 0,
      avgRating: user.mentor?.reviews.length > 0
        ? parseFloat((user.mentor.reviews.reduce((acc, curr) => acc + curr.rating, 0) / user.mentor.reviews.length).toFixed(1))
        : 0,
      reviewCount: user.mentor?.reviews.length || 0
    };

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    next(error);
  }
};

/**
 * Get connected users (accepted mentorship connections)
 */
const getConnectedUsers = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log('=== getConnectedUsers DEBUG ===');
    console.log('Current userId:', userId);

    // Get accepted requests where user is either mentor or mentee
    const acceptedRequests = await prisma.request.findMany({
      where: {
        OR: [
          { mentorId: userId },
          { menteeId: userId }
        ],
        requestStatus: 'accepted'
      },
      include: {
        mentor: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                department: true
              }
            }
          }
        },
        mentee: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                department: true
              }
            }
          }
        }
      }
    });

    console.log('Found accepted requests:', acceptedRequests.length);
    acceptedRequests.forEach((req, idx) => {
      console.log(`Request ${idx}:`, {
        id: req.id,
        mentorId: req.mentorId,
        menteeId: req.menteeId,
        status: req.requestStatus,
        mentorName: req.mentor?.user?.name,
        menteeName: req.mentee?.user?.name
      });
    });

    // Extract connected users
    const connectedUsers = acceptedRequests.map(request => {
      // If current user is the mentor, return mentee; otherwise return mentor
      const connectedUser = request.mentorId === userId
        ? request.mentee.user
        : request.mentor.user;

      console.log('Mapping request - isMentor:', request.mentorId === userId, 'returning:', connectedUser.name);

      return {
        id: connectedUser.id,
        name: connectedUser.name,
        email: connectedUser.email,
        department: connectedUser.department,
        connectionType: request.mentorId === userId ? 'mentee' : 'mentor'
      };
    });

    console.log('Returning connected users:', connectedUsers.length);
    console.log('=== END DEBUG ===');

    res.status(200).json({
      success: true,
      data: connectedUsers
    });
  } catch (error) {
    console.error('Get connected users error:', error);
    next(error);
  }
};

/**
 * Check if current user is a mentor
 */
const checkMentorStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const mentor = await prisma.mentor.findUnique({
      where: { userId },
      select: {
        userId: true,
        expertiseArea: true
      }
    });

    res.status(200).json({
      success: true,
      data: {
        isMentor: !!mentor,
        expertiseArea: mentor?.expertiseArea
      }
    });
  } catch (error) {
    console.error('Check mentor status error:', error);
    next(error);
  }
};

/**
 * Become a mentor (create mentor record for current user)
 */
const becomeMentor = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { expertiseArea } = req.body;

    // Check if user is already a mentor
    const existingMentor = await prisma.mentor.findUnique({
      where: { userId }
    });

    if (existingMentor) {
      return res.status(400).json({
        success: false,
        message: 'You are already a mentor'
      });
    }

    // Create mentor record
    const mentor = await prisma.mentor.create({
      data: {
        userId,
        expertiseArea: expertiseArea?.trim() || null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Successfully registered as a mentor!',
      data: {
        userId: mentor.userId,
        expertiseArea: mentor.expertiseArea,
        user: mentor.user
      }
    });
  } catch (error) {
    console.error('Become mentor error:', error);
    next(error);
  }
};

module.exports = {
  getMentors,
  sendConnectionRequest,
  getConnectionRequests,
  respondToRequest,
  cancelConnectionRequest,
  getUserProfile,
  getConnectedUsers,
  checkMentorStatus,
  becomeMentor
};
