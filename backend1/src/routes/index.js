const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const chatRoutes = require('./chatRoutes');

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

module.exports = router;
