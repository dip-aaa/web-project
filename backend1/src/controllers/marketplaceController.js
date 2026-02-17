const prisma = require('../config/database');
const imagekit = require('../config/imagekit');
const { createNotification } = require('./notificationController');

/**
 * Upload image to ImageKit
 */
const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    // Upload to ImageKit
    const result = await imagekit.files.upload({
      file: req.file.buffer.toString('base64'),
      fileName: `marketplace_${Date.now()}_${req.file.originalname}`,
      folder: '/marketplace'
    });

    res.status(200).json({
      success: true,
      data: {
        url: result.url,
        fileId: result.fileId
      }
    });
  } catch (error) {
    console.error('Image upload error:', error);
    next(error);
  }
};

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
        category: true,
        reviews: {
          select: {
            rating: true
          }
        }
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
        imageUrl: item.imageUrl || `https://placehold.co/800x600/png?text=${encodeURIComponent(item.itemName)}`,
        description: `Contact ${item.seller.user.name} for more details.`,
        avgRating: item.reviews.length > 0
          ? parseFloat((item.reviews.reduce((acc, curr) => acc + curr.rating, 0) / item.reviews.length).toFixed(1))
          : 0,
        reviewCount: item.reviews.length
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
    const { title, price, category, condition, description, imageUrl } = req.body;
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
        imageUrl: imageUrl || null,
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
        category: true,
        reviews: true
      }
    });

    // Notify all users about new item (in background)
    try {
      const allUsers = await prisma.user.findMany({
        where: { id: { not: userId } },
        select: { id: true }
      });

      // Create notifications for all users except the seller
      for (const user of allUsers) {
        await createNotification({
          userId: user.id,
          type: 'new_item',
          title: '🛍️ New Item Listed',
          message: `${item.seller.user.name} listed "${item.itemName}" for Rs ${item.cost}`,
          data: { itemId: item.id, itemName: item.itemName, price: item.cost, category: category }
        });
      }
    } catch (notifError) {
      console.error('Error creating notifications:', notifError);
      // Don't fail the request if notifications fail
    }

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
        imageUrl: item.imageUrl || `https://placehold.co/800x600/png?text=${encodeURIComponent(item.itemName)}`,
        description: description || `Contact ${item.seller.user.name} for more details.`,
        avgRating: item.reviews && item.reviews.length > 0
          ? parseFloat((item.reviews.reduce((acc, curr) => acc + curr.rating, 0) / item.reviews.length).toFixed(1))
          : 0,
        reviewCount: item.reviews ? item.reviews.length : 0
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
        imageUrl: item.imageUrl || `https://placehold.co/800x600/png?text=${encodeURIComponent(item.itemName)}`
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

    // Notify seller about the comment (if commenter is not the seller)
    if (item.sellerId !== userId) {
      try {
        const itemWithDetails = await prisma.item.findUnique({
          where: { id: parseInt(itemId) },
          include: { seller: { include: { user: true } } }
        });

        await createNotification({
          userId: item.sellerId,
          type: 'item_comment',
          title: '💬 New Comment on Your Item',
          message: `${comment.user.name} commented on "${itemWithDetails.itemName}": ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`,
          data: { itemId: item.id, commentId: comment.id, commenterName: comment.user.name }
        });
      } catch (notifError) {
        console.error('Error creating notification:', notifError);
      }
    }

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

/**
 * Request to buy an item
 */
const requestToBuy = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const buyerId = req.user.id;

    // Find item and seller
    const item = await prisma.item.findUnique({
      where: { id: parseInt(itemId) },
      include: {
        seller: {
          include: {
            user: {
              select: { id: true, name: true }
            }
          }
        }
      }
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    if (item.sellerId === buyerId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot buy your own item'
      });
    }

    const buyer = await prisma.user.findUnique({
      where: { id: buyerId },
      select: { name: true }
    });

    // Create notification for seller
    await createNotification({
      userId: item.sellerId,
      type: 'buy_request',
      title: '🛒 Buy Request',
      message: `${buyer.name} is wanting to buy your "${item.itemName}"`,
      data: {
        itemId: item.id,
        itemName: item.itemName,
        buyerId: buyerId,
        buyerName: buyer.name
      }
    });

    res.status(200).json({
      success: true,
      message: 'Request sent to seller successfully'
    });
  } catch (error) {
    console.error('Request to buy error:', error);
    next(error);
  }
};

/**
 * Accept a buy request
 */
const acceptBuyRequest = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const sellerUserId = req.user.id;

    // Get notification to get data
    const notification = await prisma.notification.findUnique({
      where: { id: parseInt(notificationId) }
    });

    if (!notification || notification.userId !== sellerUserId) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    const data = JSON.parse(notification.data);
    const buyerUserId = data.buyerId;

    // Ensure connection exists (Mentorship style)
    // 1. Ensure seller is a Mentor
    let mentor = await prisma.mentor.findUnique({
      where: { userId: sellerUserId }
    });
    if (!mentor) {
      mentor = await prisma.mentor.create({
        data: { userId: sellerUserId }
      });
    }

    // 2. Ensure buyer is a Mentee
    let mentee = await prisma.mentee.findUnique({
      where: { userId: buyerUserId }
    });
    if (!mentee) {
      mentee = await prisma.mentee.create({
        data: { userId: buyerUserId }
      });
    }

    // 3. Create/Update accepted Request
    const existingRequest = await prisma.request.findFirst({
      where: {
        mentorId: sellerUserId,
        menteeId: buyerUserId
      }
    });

    if (existingRequest) {
      await prisma.request.update({
        where: { id: existingRequest.id },
        data: {
          requestStatus: 'accepted',
          requestReceived: new Date()
        }
      });
    } else {
      await prisma.request.create({
        data: {
          mentorId: sellerUserId,
          menteeId: buyerUserId,
          requestStatus: 'accepted',
          requestSent: new Date(),
          requestReceived: new Date()
        }
      });
    }

    // Mark notification as read
    await prisma.notification.update({
      where: { id: parseInt(notificationId) },
      data: { read: true }
    });

    // Notify buyer
    await createNotification({
      userId: buyerUserId,
      type: 'buy_request_accepted',
      title: '✅ Request Accepted',
      message: `${req.user.name} accepted your request for "${data.itemName}"! You can now chat.`,
      data: { sellerId: sellerUserId, itemId: data.itemId }
    });

    res.status(200).json({
      success: true,
      message: 'Request accepted. You can now chat with the buyer.'
    });
  } catch (error) {
    console.error('Accept buy request error:', error);
    next(error);
  }
};

/**
 * Reject a buy request
 */
const rejectBuyRequest = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const sellerUserId = req.user.id;

    const notification = await prisma.notification.findUnique({
      where: { id: parseInt(notificationId) }
    });

    if (!notification || notification.userId !== sellerUserId) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Mark notification as read (dismiss)
    await prisma.notification.update({
      where: { id: parseInt(notificationId) },
      data: { read: true }
    });

    res.status(200).json({
      success: true,
      message: 'Request dismissed'
    });
  } catch (error) {
    console.error('Reject buy request error:', error);
    next(error);
  }
};

module.exports = {
  uploadImage,
  getItems,
  createItem,
  getMyItems,
  deleteItem,
  getComments,
  addComment,
  deleteComment,
  requestToBuy,
  acceptBuyRequest,
  rejectBuyRequest
};
