const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
    createReview,
    getItemReviews,
    getMentorReviews
} = require('../controllers/reviewController');

// POST /api/reviews - Submit a review (Authenticated)
router.post('/', authMiddleware, createReview);

// GET /api/reviews/item/:itemId - Get reviews for an item (Public)
router.get('/item/:itemId', getItemReviews);

// GET /api/reviews/mentor/:mentorId - Get reviews for a mentor (Public)
router.get('/mentor/:mentorId', getMentorReviews);

module.exports = router;
