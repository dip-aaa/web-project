const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

async function authorize() {
  try {
    const auth = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });

    // Save the credentials for future use
    const credentials = {
      type: 'authorized_user',
      client_id: auth.credentials.client_id,
      client_secret: auth.credentials.client_secret,
      refresh_token: auth.credentials.refresh_token,
    };
    
    await fs.writeFile(TOKEN_PATH, JSON.stringify(credentials));
    console.log('✅ Authorization successful!');
    console.log('📄 Token saved to token.json');
    console.log('\n🔑 Your refresh token:', credentials.refresh_token);
    console.log('\n✉️  You can now use Gmail API to send emails!');
    console.log('🚀 Start your server with: npm run dev');
    
    return auth;
  } catch (error) {
    console.error('❌ Error during authorization:', error);
    throw error;
  }
}

// Run authorization
authorize()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
