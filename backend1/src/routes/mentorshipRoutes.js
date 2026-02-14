const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  getMentors,
  sendConnectionRequest,
  getConnectionRequests,
  respondToRequest,
  getUserProfile,
  getConnectedUsers,
  checkMentorStatus,
  becomeMentor
} = require('../controllers/mentorshipController');

// All routes require authentication
router.use(authMiddleware);

// Get all mentors/users
router.get('/mentors', getMentors);

// Check if current user is a mentor
router.get('/mentor-status', checkMentorStatus);

// Become a mentor
router.post('/become-mentor', becomeMentor);

// Send connection request
router.post('/connect', sendConnectionRequest);

// Get connection requests (notifications)
router.get('/requests', getConnectionRequests);

// Respond to connection request (accept/reject)
router.post('/requests/:requestId/respond', respondToRequest);

// Get user profile by ID
router.get('/profile/:userId', getUserProfile);

// Get connected users (accepted connections)
router.get('/connected', getConnectedUsers);

module.exports = router;
