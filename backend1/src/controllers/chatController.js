const prisma = require('../config/database');

/**
 * Get user's conversations (list of users they've chatted with)
 */
const getConversations = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get all messages where user is sender or receiver
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Get unique conversations
    const conversationsMap = new Map();

    messages.forEach(message => {
      const otherUserId = message.senderId === userId ? message.receiverId : message.senderId;
      
      if (!conversationsMap.has(otherUserId)) {
        const otherUser = message.senderId === userId ? message.receiver : message.sender;
        
        conversationsMap.set(otherUserId, {
          user: otherUser,
          lastMessage: {
            id: message.id,
            content: message.content,
            createdAt: message.createdAt,
            read: message.read,
            isSent: message.senderId === userId
          },
          unreadCount: 0
        });
      }
    });

    // Count unread messages for each conversation
    for (const [otherUserId, conversation] of conversationsMap) {
      const unreadCount = await prisma.message.count({
        where: {
          senderId: otherUserId,
          receiverId: userId,
          read: false
        }
      });
      conversation.unreadCount = unreadCount;
    }

    const conversations = Array.from(conversationsMap.values());

    res.status(200).json({
      success: true,
      data: { conversations }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get messages between current user and another user
 */
const getMessages = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.params;
    const { limit = 50, before } = req.query;

    if (!otherUserId) {
      return res.status(400).json({
        success: false,
        message: 'Other user ID is required'
      });
    }

    // Build query conditions
    const whereCondition = {
      OR: [
        { senderId: userId, receiverId: parseInt(otherUserId) },
        { senderId: parseInt(otherUserId), receiverId: userId }
      ]
    };

    // Add pagination
    if (before) {
      whereCondition.createdAt = {
        lt: new Date(before)
      };
    }

    const messages = await prisma.message.findMany({
      where: whereCondition,
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: parseInt(limit)
    });

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        senderId: parseInt(otherUserId),
        receiverId: userId,
        read: false
      },
      data: {
        read: true
      }
    });

    res.status(200).json({
      success: true,
      data: {
        messages: messages.reverse() // Return in chronological order
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Send a message (REST endpoint - also handled by Socket.io)
 */
const sendMessage = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({
        success: false,
        message: 'Receiver ID and content are required'
      });
    }

    // Check if receiver exists
    const receiver = await prisma.user.findUnique({
      where: { id: parseInt(receiverId) }
    });

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: 'Receiver not found'
      });
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        content: content.trim(),
        senderId,
        receiverId: parseInt(receiverId)
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        receiver: {
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
      message: 'Message sent successfully',
      data: { message }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Mark messages as read
 */
const markAsRead = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { senderId } = req.body;

    if (!senderId) {
      return res.status(400).json({
        success: false,
        message: 'Sender ID is required'
      });
    }

    await prisma.message.updateMany({
      where: {
        senderId: parseInt(senderId),
        receiverId: userId,
        read: false
      },
      data: {
        read: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Messages marked as read'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all mentors (for chat selection)
 */
const getMentors = async (req, res, next) => {
  try {
    const mentors = await prisma.mentor.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
            phoneNumber: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: { mentors }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a message
 */
const deleteMessage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { messageId } = req.params;

    const message = await prisma.message.findUnique({
      where: { id: parseInt(messageId) }
    });

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Only sender can delete
    if (message.senderId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own messages'
      });
    }

    await prisma.message.delete({
      where: { id: parseInt(messageId) }
    });

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConversations,
  getMessages,
  sendMessage,
  markAsRead,
  getMentors,
  deleteMessage
};
