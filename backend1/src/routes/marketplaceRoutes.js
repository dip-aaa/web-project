const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  uploadImage,
  getItems,
  createItem,
  getMyItems,
  deleteItem,
  getComments,
  addComment,
  deleteComment
} = require('../controllers/marketplaceController');

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Public routes
router.get('/items', getItems);
router.get('/items/:itemId/comments', getComments);

// Protected routes
router.post('/upload-image', authMiddleware, upload.single('image'), uploadImage);
router.post('/items', authMiddleware, createItem);
router.get('/my-items', authMiddleware, getMyItems);
router.delete('/items/:id', authMiddleware, deleteItem);
router.post('/items/:itemId/comments', authMiddleware, addComment);
router.delete('/comments/:commentId', authMiddleware, deleteComment);

module.exports = router;
