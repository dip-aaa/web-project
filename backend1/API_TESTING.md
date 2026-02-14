# API Test Examples

Use these examples with tools like Postman, Insomnia, or curl.

## Base URL
```
http://localhost:5001/api
```

## 1. Signup (Register New User)

**POST** `/api/auth/signup`

```json
{
  "email": "test.student@khwopa.edu.np",
  "password": "SecurePass123",
  "name": "Test Student",
  "phoneNumber": "+977-9812345678",
  "department": "Computer Engineering"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Signup successful! OTP sent to your email.",
  "data": {
    "userId": 1,
    "email": "test.student@khwopa.edu.np",
    "name": "Test Student",
    "otpExpiresIn": "10 minutes"
  }
}
```

## 2. Verify OTP

**POST** `/api/auth/verify-otp`

```json
{
  "email": "test.student@khwopa.edu.np",
  "otp": "123456"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Email verified successfully! You are now logged in.",
  "data": {
    "user": {
      "id": 1,
      "email": "test.student@khwopa.edu.np",
      "name": "Test Student",
      ...
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Save the `accessToken` for authenticated requests!**

## 3. Login

**POST** `/api/auth/login`

```json
{
  "email": "test.student@khwopa.edu.np",
  "password": "SecurePass123"
}
```

## 4. Get Profile (Authenticated)

**GET** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

## 5. Send Message (Authenticated)

**POST** `/api/chat/messages`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

**Body:**
```json
{
  "receiverId": 2,
  "content": "Hello! I need help with my project."
}
```

## 6. Get Conversations (Authenticated)

**GET** `/api/chat/conversations`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

## 7. Get Messages with User (Authenticated)

**GET** `/api/chat/messages/2`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

Replace `2` with the actual user ID.

## Socket.io Test (JavaScript)

```javascript
// Install: npm install socket.io-client
const io = require('socket.io-client');

const socket = io('http://localhost:5001', {
  auth: {
    token: 'YOUR_ACCESS_TOKEN_HERE'
  }
});

socket.on('connect', () => {
  console.log('Connected to server');
  
  // Send a message
  socket.emit('message:send', {
    receiverId: 2,
    content: 'Hello via Socket.io!'
  });
});

socket.on('message:receive', (data) => {
  console.log('New message:', data.message);
});

socket.on('message:sent', (data) => {
  console.log('Message delivered:', data.message);
});

socket.on('error', (error) => {
  console.error('Socket error:', error);
});
```

## Testing Tips

1. **Email Setup**: Make sure to configure a valid email in `.env` to receive OTPs
2. **JWT Tokens**: Save the access token after login/verify-otp for authenticated requests
3. **Rate Limiting**: Be aware of rate limits during testing
4. **Error Handling**: Check response status codes for proper error handling

## Common Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Email and password are required"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid or expired token. Please login again."
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "User already exists. Please login."
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "message": "Too many login attempts. Please try again after 15 minutes."
}
```
