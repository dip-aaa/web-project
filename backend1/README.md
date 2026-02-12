# Khwopa College Portal Backend

A secure backend system built with Express.js, featuring JWT-based authentication with OTP email verification, and real-time chat functionality using Socket.io.

## Features

### 🔐 Authentication & Security
- **Email Validation**: Only `@khwopa.edu.np` email addresses allowed
- **OTP Verification**: 6-digit OTP sent via email for account verification
- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Password Security**: Bcrypt hashing with strong password requirements
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Comprehensive input sanitization and validation

### 💬 Real-time Chat
- **Socket.io Integration**: Real-time bidirectional communication
- **Direct Messaging**: Chat with mentors and other students
- **Typing Indicators**: See when others are typing
- **Online Status**: Track who's currently online
- **Message History**: Persistent message storage
- **Read Receipts**: Know when messages are read

### 🗄️ Database
- **Prisma ORM**: Type-safe database access
- **SQLite**: Lightweight, file-based database
- **Migration System**: Version control for database schema

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Install Dependencies**
```bash
cd backend1
npm install
```

2. **Configure Environment Variables**
Copy `.env.example` to `.env` and update the values:
```bash
cp .env.example .env
```

Required environment variables:
- `PORT`: Server port (default: 5001)
- `DATABASE_URL`: SQLite database file path
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_REFRESH_SECRET`: Secret key for refresh tokens
- `EMAIL_HOST`: SMTP server host
- `EMAIL_PORT`: SMTP server port
- `EMAIL_USER`: Email account for sending OTPs
- `EMAIL_PASSWORD`: Email account password (use app-specific password)
- `FRONTEND_URL`: Frontend URL for CORS

3. **Setup Email (Gmail Example)**
   - Go to Google Account Settings
   - Enable 2-Factor Authentication
   - Generate an App Password
   - Use the app password in `EMAIL_PASSWORD`

4. **Initialize Database**
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. **Start Server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication Endpoints

#### 1. Signup
**POST** `/api/auth/signup`

Create a new user account and send OTP.

**Request Body:**
```json
{
  "email": "student@khwopa.edu.np",
  "password": "SecurePass123",
  "name": "John Doe",
  "phoneNumber": "+977-9812345678",
  "department": "Computer Engineering",
  "collegeId": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Signup successful! OTP sent to your email.",
  "data": {
    "userId": 1,
    "email": "student@khwopa.edu.np",
    "name": "John Doe",
    "otpExpiresIn": "10 minutes"
  }
}
```

#### 2. Verify OTP
**POST** `/api/auth/verify-otp`

Verify email with OTP and complete registration.

**Request Body:**
```json
{
  "email": "student@khwopa.edu.np",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully! You are now logged in.",
  "data": {
    "user": {
      "id": 1,
      "email": "student@khwopa.edu.np",
      "name": "John Doe",
      "phoneNumber": "+977-9812345678",
      "department": "Computer Engineering",
      "collegeId": 1
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

#### 3. Resend OTP
**POST** `/api/auth/resend-otp`

Request a new OTP.

**Request Body:**
```json
{
  "email": "student@khwopa.edu.np"
}
```

#### 4. Login
**POST** `/api/auth/login`

Login with email and password.

**Request Body:**
```json
{
  "email": "student@khwopa.edu.np",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful!",
  "data": {
    "user": { ... },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

#### 5. Refresh Token
**POST** `/api/auth/refresh-token`

Get new access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

#### 6. Logout
**POST** `/api/auth/logout`

Logout and invalidate refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

#### 7. Get Profile (Protected)
**GET** `/api/auth/profile`

Get current user profile.

**Headers:**
```
Authorization: Bearer <access_token>
```

#### 8. Update Profile (Protected)
**PUT** `/api/auth/profile`

Update user profile.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "phoneNumber": "+977-9812345678",
  "department": "Software Engineering"
}
```

### Chat Endpoints

All chat endpoints require authentication (Bearer token).

#### 1. Get Conversations
**GET** `/api/chat/conversations`

Get list of all conversations with unread counts.

**Headers:**
```
Authorization: Bearer <access_token>
```

#### 2. Get Messages
**GET** `/api/chat/messages/:otherUserId`

Get message history with another user.

**Query Parameters:**
- `limit`: Number of messages to fetch (default: 50)
- `before`: Fetch messages before this timestamp (for pagination)

#### 3. Send Message
**POST** `/api/chat/messages`

Send a message (also works via Socket.io).

**Request Body:**
```json
{
  "receiverId": 2,
  "content": "Hello, I need help with..."
}
```

#### 4. Mark as Read
**PUT** `/api/chat/messages/read`

Mark all messages from a user as read.

**Request Body:**
```json
{
  "senderId": 2
}
```

#### 5. Delete Message
**DELETE** `/api/chat/messages/:messageId`

Delete your own message.

#### 6. Get Mentors
**GET** `/api/chat/mentors`

Get list of all mentors available for chat.

## Socket.io Events

### Connection
```javascript
const socket = io('http://localhost:5001', {
  auth: {
    token: 'your-jwt-access-token'
  }
});
```

### Client → Server Events

#### Send Message
```javascript
socket.emit('message:send', {
  receiverId: 2,
  content: 'Hello!'
});
```

#### Typing Indicators
```javascript
socket.emit('typing:start', { receiverId: 2 });
socket.emit('typing:stop', { receiverId: 2 });
```

#### Mark as Read
```javascript
socket.emit('messages:read', { senderId: 2 });
```

#### Get Online Users
```javascript
socket.emit('users:online');
```

### Server → Client Events

#### Receive Message
```javascript
socket.on('message:receive', (data) => {
  console.log('New message:', data.message);
});
```

#### Message Sent Confirmation
```javascript
socket.on('message:sent', (data) => {
  console.log('Message delivered:', data.message);
});
```

#### User Typing
```javascript
socket.on('typing:user', (data) => {
  console.log(`${data.name} is typing:`, data.isTyping);
});
```

#### User Online/Offline
```javascript
socket.on('user:online', (data) => {
  console.log(`${data.name} is online`);
});

socket.on('user:offline', (data) => {
  console.log(`${data.name} went offline`);
});
```

#### Online Users List
```javascript
socket.on('users:online:list', (data) => {
  console.log('Online users:', data.userIds);
});
```

#### Error
```javascript
socket.on('error', (data) => {
  console.error('Error:', data.message);
});
```

## Security Features

### Rate Limiting
- **Login**: 5 attempts per 15 minutes
- **OTP Requests**: 3 attempts per 5 minutes
- **API Calls**: 100 requests per 15 minutes

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### Email Domain Restriction
- Only `@khwopa.edu.np` emails allowed
- Case-insensitive validation

### JWT Tokens
- Access Token: 7 days validity
- Refresh Token: 30 days validity
- Secure token storage in database

## Database Schema

### Key Models
- **User**: User accounts with authentication
- **OTP**: One-time passwords for verification
- **RefreshToken**: JWT refresh tokens
- **Message**: Chat messages between users
- **Mentor/Mentee**: Student roles
- **Buyer/Seller**: Marketplace roles
- **College**: Educational institutions

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict (duplicate)
- `429`: Too Many Requests (rate limit)
- `500`: Internal Server Error

## Development

### Database Management
```bash
# Generate Prisma Client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# Open Prisma Studio (GUI)
npm run prisma:studio
```

### Testing Email Locally
For development, you can use services like:
- [Mailtrap](https://mailtrap.io/) - Email testing service
- [Ethereal Email](https://ethereal.email/) - Fake SMTP service

## Production Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Use strong JWT secrets
3. Configure production email service
4. Set up SSL/TLS
5. Enable logging and monitoring

### Security Checklist
- [ ] Change default JWT secrets
- [ ] Use environment-specific email credentials
- [ ] Enable HTTPS
- [ ] Set up proper CORS origins
- [ ] Configure rate limiting for production traffic
- [ ] Set up database backups
- [ ] Enable logging and monitoring

## Troubleshooting

### OTP Email Not Sending
- Check email credentials in `.env`
- Ensure 2FA and app password for Gmail
- Verify SMTP settings
- Check firewall/network restrictions

### Database Connection Issues
- Verify `DATABASE_URL` in `.env`
- Run migrations: `npm run prisma:migrate`
- Check file permissions for SQLite

### Socket.io Connection Fails
- Verify JWT token is valid
- Check CORS settings
- Ensure server is running
- Check firewall rules

## Support

For issues and questions:
- Check the API documentation at `http://localhost:5001/`
- Review error messages in console
- Check server logs

## License

This project is for educational purposes as part of Khwopa College Portal.
