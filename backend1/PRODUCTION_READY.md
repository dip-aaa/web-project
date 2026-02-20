# 🚀 Quick Start - Production Ready

## ✅ What's Done

Your email is now configured for production:

```env
EMAIL_FROM=noreply@khanaldipa.com.np
RESEND_API_KEY=re_8Q29gqkM_EF81eJ4qVkTCF63MW95w83Vz
```

✅ Domain verified: `khanaldipa.com.np`
✅ DKIM verified
✅ SPF verified
✅ Ready to send professional emails

## 🧪 Test Your Email (Optional)

Send a test email to verify everything works:

```bash
cd /home/dipu/Documents/codes/web-project/backend1
node test-email.js your-email@example.com
```

Example:
```bash
node test-email.js student@khwopa.edu.np
```

Check your inbox and the [Resend Dashboard](https://resend.com/emails) to confirm delivery.

## 🌐 Deploy to Render (Production)

### Quick Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production ready with verified domain"
   git push origin main
   ```

2. **Create Render Web Service**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Set build command: `npm install && npx prisma generate`
   - Set start command: `npm start`

3. **Add Environment Variables in Render**
   
   Copy these to your Render service environment variables:
   
   ```env
   -NODE_ENV=production
   PORT=5001
   -DATABASE_URL=postgresql://kosh_db_user:eZIm2K766FmN2COTu763ZbElmdk8woSu@dpg-d6b950bh46gs7393mbpg-a.oregon-postgres.render.com/kosh_db?sslmode=require
   -JWT_SECRET=khwopa-college-jwt-secret-key-2026-change-in-production
   -JWT_EXPIRES_IN=7d
   -JWT_REFRESH_SECRET=khwopa-college-refresh-secret-key-2026
   -JWT_REFRESH_EXPIRES_IN=30d
   RESEND_API_KEY=re_8Q29gqkM_EF81eJ4qVkTCF63MW95w83Vz
   -EMAIL_FROM=noreply@khanaldipa.com.np
   -OTP_EXPIRES_IN=10
   -OTP_LENGTH=6
   -FRONTEND_URL=https://your-frontend-url.vercel.app
   -ALLOWED_EMAIL_DOMAIN=@khwopa.edu.np
   -IMAGEKIT_PUBLIC_KEY=deepa126
   -IMAGEKIT_PRIVATE_KEY=private_mjIbjmDDy99r1Aq/fb/yoLgHg5s=
   -IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/deepa126
   ```

4. **Deploy!**
   - Click "Create Web Service"
   - Wait for deployment (2-5 minutes)
   - Copy your backend URL: `https://your-app.onrender.com`

5. **Update Frontend**
   
   Update your frontend API URL:
   ```typescript
   // frontend/src/lib/api.ts
   const API_URL = 'https://your-backend-url.onrender.com/api';
   ```

## 🎉 Done!

Your backend will now send professional emails from:
**noreply@khanaldipa.com.np** ✨

Users signing up will receive OTP emails from your verified domain!

---

## 📚 More Info

- **Full Deployment Guide**: [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)
- **Email Setup Guide**: [RESEND_SETUP.md](./RESEND_SETUP.md)
- **Resend Dashboard**: https://resend.com/emails
- **Render Dashboard**: https://dashboard.render.com

## 💡 Tips

1. **Monitor emails**: Check Resend dashboard for delivery stats
2. **Check logs**: Use Render logs to debug issues
3. **Rate limits**: Free tier = 100 emails/day (upgrade if needed)
4. **Security**: Change JWT secrets before production!

Need help? Check the full guides above! 🚀
