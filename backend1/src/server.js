require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');
const initializeSocket = require('./config/socket');

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = initializeSocket(server);

// Make io accessible in routes
app.set('io', io);
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiting to all API routes
app.use('/api', apiLimiter);

// Logging middleware (development only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Khwopa College Portal API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        signup: 'POST /api/auth/signup',
        verifyOTP: 'POST /api/auth/verify-otp',
        resendOTP: 'POST /api/auth/resend-otp',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout',
        refreshToken: 'POST /api/auth/refresh-token',
        profile: 'GET /api/auth/profile (Protected)',
        updateProfile: 'PUT /api/auth/profile (Protected)'
      },
      chat: {
        conversations: 'GET /api/chat/conversations (Protected)',
        messages: 'GET /api/chat/messages/:otherUserId (Protected)',
        sendMessage: 'POST /api/chat/messages (Protected)',
        markAsRead: 'PUT /api/chat/messages/read (Protected)',
        deleteMessage: 'DELETE /api/chat/messages/:messageId (Protected)',
        mentors: 'GET /api/chat/mentors (Protected)'
      },
      socket: {
        event: 'ws://localhost:' + (process.env.PORT || 5001),
        events: {
          connect: 'Connect with auth token',
          'message:send': 'Send a message',
          'message:receive': 'Receive a message',
          'typing:start': 'User started typing',
          'typing:stop': 'User stopped typing',
          'users:online': 'Get online users',
          'user:online': 'User came online',
          'user:offline': 'User went offline'
        }
      }
    }
  });
});

// API routes
app.use('/api', routes);

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Start server
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Khwopa College Portal Backend');
  console.log('='.repeat(50));
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`📡 Socket.io running on: ws://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log('='.repeat(50));
  console.log('📚 API Documentation available at: http://localhost:' + PORT);
  console.log('='.repeat(50));
});

module.exports = { app, server, io };
