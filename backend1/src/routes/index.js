const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const chatRoutes = require('./chatRoutes');
const marketplaceRoutes = require('./marketplaceRoutes');
const mentorshipRoutes = require('./mentorshipRoutes');

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/marketplace', marketplaceRoutes);
router.use('/mentorship', mentorshipRoutes);

module.exports = router;
