const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

/**
 * Get all tasks for the authenticated user
 */
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: [
        { date: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks'
    });
  }
};

/**
 * Create a new task
 */
exports.createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, date } = req.body;

    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required'
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Task date is required'
      });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD'
      });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        date,
        userId,
        completed: false
      }
    });

    res.status(201).json({
      success: true,
      data: task,
      message: 'Task created successfully'
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create task'
    });
  }
};

/**
 * Update a task (toggle completion or update title/date)
 */
exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, date, completed } = req.body;

    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        userId
      }
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Build update data
    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (date !== undefined) {
      // Validate date format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid date format. Use YYYY-MM-DD'
        });
      }
      updateData.date = date;
    }
    if (completed !== undefined) updateData.completed = completed;

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.status(200).json({
      success: true,
      data: task,
      message: 'Task updated successfully'
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update task'
    });
  }
};

/**
 * Delete a task
 */
exports.deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        userId
      }
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete task'
    });
  }
};

/**
 * Get tasks for a specific date
 */
exports.getTasksByDate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.params;

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD'
      });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
        date
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Get tasks by date error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks'
    });
  }
};
