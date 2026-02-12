const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middleware/errorHandler');
const { loginLimiter, otpLimiter } = require('../middleware/rateLimiter');
const {
  signup,
  verifyOTP,
  resendOTP,
  login,
  refreshAccessToken,
  logout,
  getProfile,
  updateProfile
} = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', otpLimiter, asyncHandler(signup));
router.post('/verify-otp', asyncHandler(verifyOTP));
router.post('/resend-otp', otpLimiter, asyncHandler(resendOTP));
router.post('/login', loginLimiter, asyncHandler(login));
router.post('/refresh-token', asyncHandler(refreshAccessToken));
router.post('/logout', asyncHandler(logout));

// Protected routes
router.get('/profile', authMiddleware, asyncHandler(getProfile));
router.put('/profile', authMiddleware, asyncHandler(updateProfile));

module.exports = router;
