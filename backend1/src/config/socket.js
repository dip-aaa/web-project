const { Server } = require('socket.io');
const { verifyAccessToken } = require('../config/jwt');
const prisma = require('../config/database');

// Store active socket connections
const activeUsers = new Map(); // userId -> socketId

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Authentication middleware for Socket.io
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication token required'));
      }

      const decoded = verifyAccessToken(token);

      if (!decoded) {
        return next(new Error('Invalid or expired token'));
      }

      // Get user from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          isVerified: true
        }
      });

      if (!user || !user.isVerified) {
        return next(new Error('User not found or not verified'));
      }

      // Attach user to socket
      socket.userId = user.id;
      socket.userEmail = user.email;
      socket.userName = user.name;

      next();
    } catch (error) {
      console.error('Socket authentication error:', error);
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userName} (${socket.userId})`);

    // Store active user
    activeUsers.set(socket.userId, socket.id);

    // Emit online status to all connected clients
    socket.broadcast.emit('user:online', {
      userId: socket.userId,
      name: socket.userName
    });

    // Join user to their personal room
    socket.join(`user:${socket.userId}`);

    // Send message
    socket.on('message:send', async (data) => {
      try {
        const { receiverId, content } = data;

        if (!receiverId || !content) {
          socket.emit('error', { message: 'Receiver ID and content are required' });
          return;
        }

        // Check if receiver exists
        const receiver = await prisma.user.findUnique({
          where: { id: parseInt(receiverId) }
        });

        if (!receiver) {
          socket.emit('error', { message: 'Receiver not found' });
          return;
        }

        // Save message to database
        const message = await prisma.message.create({
          data: {
            content: content.trim(),
            senderId: socket.userId,
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

        // Send to sender (confirmation)
        socket.emit('message:sent', {
          success: true,
          message
        });

        // Send to receiver if online
        io.to(`user:${receiverId}`).emit('message:receive', {
          message
        });

        console.log(`Message sent from ${socket.userId} to ${receiverId}`);
      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Typing indicator
    socket.on('typing:start', (data) => {
      const { receiverId } = data;
      io.to(`user:${receiverId}`).emit('typing:user', {
        userId: socket.userId,
        name: socket.userName,
        isTyping: true
      });
    });

    socket.on('typing:stop', (data) => {
      const { receiverId } = data;
      io.to(`user:${receiverId}`).emit('typing:user', {
        userId: socket.userId,
        name: socket.userName,
        isTyping: false
      });
    });

    // Mark messages as read
    socket.on('messages:read', async (data) => {
      try {
        const { senderId } = data;

        await prisma.message.updateMany({
          where: {
            senderId: parseInt(senderId),
            receiverId: socket.userId,
            read: false
          },
          data: {
            read: true
          }
        });

        // Notify sender that messages were read
        io.to(`user:${senderId}`).emit('messages:read', {
          readBy: socket.userId
        });
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    });

    // Get online users
    socket.on('users:online', () => {
      const onlineUserIds = Array.from(activeUsers.keys());
      socket.emit('users:online:list', {
        userIds: onlineUserIds
      });
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userName} (${socket.userId})`);
      activeUsers.delete(socket.userId);

      // Emit offline status
      socket.broadcast.emit('user:offline', {
        userId: socket.userId,
        name: socket.userName
      });
    });

    // Error handling
    socket.on('error', (error) => {
      console.error('Socket error:', error);
      socket.emit('error', { message: 'An error occurred' });
    });
  });

  // Helper function to get online status
  io.isUserOnline = (userId) => {
    return activeUsers.has(userId);
  };

  // Helper function to send notification to specific user
  io.sendNotificationToUser = (userId, event, data) => {
    io.to(`user:${userId}`).emit(event, data);
  };

  console.log('Socket.io initialized successfully');

  return io;
};

module.exports = initializeSocket;
