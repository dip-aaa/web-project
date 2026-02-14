const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middleware/errorHandler');
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  getConversations,
  getMessages,
  sendMessage,
  markAsRead,
  getMentors,
  deleteMessage
} = require('../controllers/chatController');

// All chat routes require authentication
router.use(authMiddleware);

// Chat routes
router.get('/conversations', asyncHandler(getConversations));
router.get('/messages/:otherUserId', asyncHandler(getMessages));
router.post('/messages', asyncHandler(sendMessage));
router.put('/messages/read', asyncHandler(markAsRead));
router.delete('/messages/:messageId', asyncHandler(deleteMessage));

// Get mentors for chat
router.get('/mentors', asyncHandler(getMentors));

module.exports = router;
