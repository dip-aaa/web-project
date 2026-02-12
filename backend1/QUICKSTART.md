# Quick Start Guide

## Prerequisites
- Node.js v16 or higher
- Gmail account (for sending OTP emails)
- Text editor (VS Code recommended)

## Setup Steps

### 1. Configure Email (Important!)

The system needs to send OTP emails. Here's how to set up Gmail:

1. **Enable 2-Factor Authentication** on your Google Account:
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or Other)
   - Click "Generate"
   - Copy the 16-character password

3. **Update `.env` file**:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   EMAIL_FROM=noreply@khwopa.edu.np
   ```

### 2. Install Dependencies

```bash
cd backend1
npm install
```

### 3. Initialize Database

```bash
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
```

### 4. Start Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on: **http://localhost:5001**

## Testing the System

### Method 1: Using Browser/Postman

1. **Register a new user**:
   ```
   POST http://localhost:5001/api/auth/signup
   ```
   Body:
   ```json
   {
     "email": "your.name@khwopa.edu.np",
     "password": "TestPass123",
     "name": "Your Name"
   }
   ```

2. **Check your email** for the OTP code

3. **Verify OTP**:
   ```
   POST http://localhost:5001/api/auth/verify-otp
   ```
   Body:
   ```json
   {
     "email": "your.name@khwopa.edu.np",
     "otp": "123456"
   }
   ```

4. **Save the access token** from the response

5. **Access protected routes**:
   ```
   GET http://localhost:5001/api/auth/profile
   Header: Authorization: Bearer YOUR_ACCESS_TOKEN
   ```

### Method 2: Using curl

```bash
# Signup
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@khwopa.edu.np","password":"TestPass123","name":"Test User"}'

# Verify OTP (check email for code)
curl -X POST http://localhost:5001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@khwopa.edu.np","otp":"123456"}'

# Get Profile (use token from verify response)
curl -X GET http://localhost:5001/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Connecting Frontend

Update your frontend to point to:
```javascript
const API_URL = 'http://localhost:5001/api';
const SOCKET_URL = 'http://localhost:5001';
```

### React Socket.io Example:
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:5001', {
  auth: {
    token: localStorage.getItem('accessToken')
  }
});

socket.on('connect', () => {
  console.log('Connected to chat server');
});

socket.on('message:receive', (data) => {
  console.log('New message:', data.message);
});

socket.emit('message:send', {
  receiverId: 2,
  content: 'Hello!'
});
```

## Troubleshooting

### OTP Email Not Received
- Check email credentials in `.env`
- Verify Gmail app password (16 characters, no spaces)
- Check spam folder
- Try with a different Gmail account
- Use Mailtrap for testing: https://mailtrap.io/

### Database Errors
```bash
# Reset database
rm prisma/dev.db
npx prisma migrate dev --name init
node prisma/seed.js
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5002
```

### JWT Token Issues
- Make sure JWT_SECRET is set in `.env`
- Token expires after 7 days by default
- Use refresh token to get new access token

## Email Domain Restriction

⚠️ **Important**: Only emails ending with `@khwopa.edu.np` are allowed!

To test without restrictions, temporarily modify:
```javascript
// src/utils/validators.js
const validateKhwopaEmail = (email) => {
  return true; // Disable check for testing
};
```

**Remember to re-enable for production!**

## Useful Commands

```bash
# View database in GUI
npm run prisma:studio

# Create new migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Format Prisma schema
npx prisma format

# Check dependencies for vulnerabilities
npm audit

# Update dependencies
npm update
```

## Next Steps

1. ✅ Server is running
2. ✅ Database is initialized
3. 📧 Configure email settings
4. 🧪 Test API endpoints
5. 🔗 Connect frontend
6. 💬 Test Socket.io chat
7. 🚀 Deploy to production

## Support

- Check [README.md](README.md) for full documentation
- Review [API_TESTING.md](API_TESTING.md) for API examples
- Check server logs for detailed error messages

## Production Checklist

Before deploying:
- [ ] Change JWT_SECRET to a strong random value
- [ ] Set NODE_ENV=production
- [ ] Configure production email service
- [ ] Set up HTTPS/SSL
- [ ] Update CORS origins
- [ ] Enable logging and monitoring
- [ ] Set up database backups
- [ ] Review rate limiting settings
- [ ] Test all endpoints
- [ ] Load test the system

---

**Happy Coding! 🎉**

For questions, check the console logs or review the code comments.
