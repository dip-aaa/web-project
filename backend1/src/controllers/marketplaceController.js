const prisma = require('../config/database');

/**
 * Get all marketplace items
 */
const getItems = async (req, res, next) => {
  try {
    const { category, condition, minPrice, maxPrice } = req.query;

    // Build filter object
    const where = {};
    
    if (category && category !== 'All Items' && category !== 'Select Category') {
      where.category = {
        name: category
      };
    }

    if (condition && condition !== 'All Conditions') {
      where.condition = condition;
    }

    if (minPrice || maxPrice) {
      where.cost = {};
      if (minPrice) where.cost.gte = parseFloat(minPrice);
      if (maxPrice) where.cost.lte = parseFloat(maxPrice);
    }

    const items = await prisma.item.findMany({
      where,
      include: {
        seller: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        category: true
      },
      orderBy: {
        id: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: items.map(item => ({
        id: item.id.toString(),
        title: item.itemName,
        price: item.cost,
        seller: item.seller.user.name,
        conditionLabel: item.condition,
        category: item.category.name,
        imageUrl: `https://placehold.co/800x600/png?text=${encodeURIComponent(item.itemName)}`,
        description: `Contact ${item.seller.user.name} for more details.`
      }))
    });
  } catch (error) {
    console.error('Get items error:', error);
    next(error);
  }
};

/**
 * Create a new marketplace item
 */
const createItem = async (req, res, next) => {
  try {
    const { title, price, category, condition, description } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!title || !price || !category || !condition) {
      return res.status(400).json({
        success: false,
        message: 'Title, price, category, and condition are required'
      });
    }

    // Ensure user is a seller
    let seller = await prisma.seller.findUnique({
      where: { userId }
    });

    if (!seller) {
      // Create seller profile if doesn't exist
      seller = await prisma.seller.create({
        data: {
          userId
        }
      });
    }

    // Get or create category
    let categoryRecord = await prisma.category.findUnique({
      where: { name: category }
    });

    if (!categoryRecord) {
      categoryRecord = await prisma.category.create({
        data: { name: category }
      });
    }

    // Create item
    const item = await prisma.item.create({
      data: {
        itemName: title,
        cost: parseFloat(price),
        condition,
        sellerId: seller.userId,
        categoryId: categoryRecord.id
      },
      include: {
        seller: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        category: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: {
        id: item.id.toString(),
        title: item.itemName,
        price: item.cost,
        seller: item.seller.user.name,
        conditionLabel: item.condition,
        category: item.category.name,
        imageUrl: `https://placehold.co/800x600/png?text=${encodeURIComponent(item.itemName)}`,
        description: description || `Contact ${item.seller.user.name} for more details.`
      }
    });
  } catch (error) {
    console.error('Create item error:', error);
    next(error);
  }
};

/**
 * Get user's own items
 */
const getMyItems = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const seller = await prisma.seller.findUnique({
      where: { userId }
    });

    if (!seller) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    const items = await prisma.item.findMany({
      where: {
        sellerId: seller.userId
      },
      include: {
        category: true
      },
      orderBy: {
        id: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: items.map(item => ({
        id: item.id.toString(),
        title: item.itemName,
        price: item.cost,
        conditionLabel: item.condition,
        category: item.category.name,
        imageUrl: `https://placehold.co/800x600/png?text=${encodeURIComponent(item.itemName)}`
      }))
    });
  } catch (error) {
    console.error('Get my items error:', error);
    next(error);
  }
};

/**
 * Delete an item
 */
const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const item = await prisma.item.findUnique({
      where: { id: parseInt(id) }
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    if (item.sellerId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own items'
      });
    }

    await prisma.item.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Delete item error:', error);
    next(error);
  }
};

/**
 * Get all comments for an item
 */
const getComments = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const comments = await prisma.itemComment.findMany({
      where: {
        itemId: parseInt(itemId)
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: comments.map(comment => ({
        id: comment.id,
        text: comment.text,
        createdAt: comment.createdAt,
        user: {
          id: comment.user.id,
          name: comment.user.name,
          email: comment.user.email
        }
      }))
    });
  } catch (error) {
    console.error('Get comments error:', error);
    next(error);
  }
};

/**
 * Add a comment to an item
 */
const addComment = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Comment text is required'
      });
    }

    // Check if item exists
    const item = await prisma.item.findUnique({
      where: { id: parseInt(itemId) }
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    const comment = await prisma.itemComment.create({
      data: {
        text: text.trim(),
        userId,
        itemId: parseInt(itemId)
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: {
        id: comment.id,
        text: comment.text,
        createdAt: comment.createdAt,
        user: {
          id: comment.user.id,
          name: comment.user.name,
          email: comment.user.email
        }
      }
    });
  } catch (error) {
    console.error('Add comment error:', error);
    next(error);
  }
};

/**
 * Delete a comment
 */
const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await prisma.itemComment.findUnique({
      where: { id: parseInt(commentId) }
    });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own comments'
      });
    }

    await prisma.itemComment.delete({
      where: { id: parseInt(commentId) }
    });

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    next(error);
  }
};

module.exports = {
  getItems,
  createItem,
  getMyItems,
  deleteItem,
  getComments,
  addComment,
  deleteComment
};
