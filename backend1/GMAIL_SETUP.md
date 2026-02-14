# Gmail API Setup for Email Sending

This project uses **Gmail API with OAuth2** to send OTP emails, which is more secure and reliable than SMTP with app passwords.

## ✅ Quick Setup (3 Steps)

### Step 1: Verify Prerequisites
Make sure these files exist in the `backend1` folder:
- ✅ `credentials.json` - Your Google OAuth2 credentials (already created)
- ✅ `setup-gmail-auth.js` - Authorization script (already created)

### Step 2: Authorize Gmail API Access

Run this command in the `backend1` folder:

```bash
npm run setup:gmail
```

**What will happen:**
1. A browser window will open
2. You'll be asked to sign in with your **Google account** (use `piyushrokaya600@gmail.com`)
3. Google will ask for permission to send emails on your behalf
4. Click **"Allow"** to grant permission
5. The script will save a `token.json` file with your refresh token

### Step 3: Start the Server

```bash
npm run dev
```

That's it! Your backend can now send OTP emails via Gmail API. ✉️

---

## 🔧 Technical Details

### How It Works
1. **OAuth2 Authorization**: One-time browser authentication to get a refresh token
2. **Token Storage**: Refresh token saved in `token.json` (never expires unless revoked)
3. **Automatic Email Sending**: Backend uses refresh token to get access tokens as needed
4. **Gmail API**: Emails sent through Gmail API (more reliable than SMTP)

### Files Created
- `credentials.json` - OAuth2 client ID and secret from Google Cloud Console
- `token.json` - Contains your refresh token (auto-generated after authorization)

### Security Notes
- Both `credentials.json` and `token.json` are in `.gitignore` (never commit them!)
- Token only grants permission to send emails, nothing else
- You can revoke access anytime at: https://myaccount.google.com/permissions

---

## 🐛 Troubleshooting

**Error: "Failed to initialize Gmail API"**
- Solution: Run `npm run setup:gmail` to authorize Gmail access

**Error: "invalid_grant" or "Token has been expired or revoked"**
- Solution: Delete `token.json` and run `npm run setup:gmail` again

**Browser doesn't open during authorization**
- Solution: Copy the URL from terminal and paste it in your browser manually

**"Access blocked: This app's request is invalid"**
- Solution: Make sure you added `http://localhost:3000/oauth2callback` as a redirect URI in Google Cloud Console

---

## 📧 Email Configuration

The sender email is set in `.env`:
```env
EMAIL_FROM=kce080bct018@khwopa.edu.np
```

Make sure this email matches the account you authorized in Step 2, or is an alias/send-as address configured in Gmail settings.

---

## 🔄 Re-authorization

If you need to re-authorize (e.g., token expired or revoked):

```bash
# Delete the old token
rm token.json

# Re-run authorization
npm run setup:gmail
```

---

## ✅ Testing

To test if email sending works:

1. Start the backend: `npm run dev`
2. Try signing up with an `@khwopa.edu.np` email
3. Check your inbox for the OTP email

The backend will log email sending status:
- ✅ Success: `✉️  OTP email sent successfully to user@khwopa.edu.np`
- ❌ Error: Check server logs for details
