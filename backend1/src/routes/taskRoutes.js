const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/authMiddleware');

// All task routes require authentication
router.use(authMiddleware);

// Get all tasks for the user
router.get('/', taskController.getTasks);

// Get tasks by specific date
router.get('/date/:date', taskController.getTasksByDate);

// Create a new task
router.post('/', taskController.createTask);

// Update a task
router.put('/:id', taskController.updateTask);

// Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
