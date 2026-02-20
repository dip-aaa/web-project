const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (email, otp, name) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
        .otp-code { font-size: 32px; font-weight: bold; color: #4CAF50; text-align: center; padding: 20px; background-color: #e8f5e9; border-radius: 5px; margin: 20px 0; letter-spacing: 5px; }
        .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
        .warning { color: #ff5722; font-weight: bold; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Email Verification</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${name}</strong>,</p>
          <p>Thank you for registering with Khwopa College Portal. To complete your registration, please use the following OTP code:</p>
          
          <div class="otp-code">${otp}</div>
          
          <p>This OTP will expire in <strong>${process.env.OTP_EXPIRES_IN || 10} minutes</strong>.</p>
          
          <p class="warning">⚠️ Do not share this code with anyone. Our team will never ask for your OTP.</p>
          
          <p>If you did not request this verification, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>© 2026 Khwopa College Portal. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // In development mode, always log OTP to console
  if (process.env.NODE_ENV === 'development') {
    console.log('\n' + '='.repeat(60));
    console.log('📧 DEVELOPMENT MODE - OTP EMAIL');
    console.log('='.repeat(60));
    console.log(`To: ${email}`);
    console.log(`Name: ${name}`);
    console.log(`OTP Code: ${otp}`);
    console.log(`Expires: ${process.env.OTP_EXPIRES_IN || 10} minutes`);
    console.log('='.repeat(60) + '\n');
  }

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: email,
      subject: 'Email Verification - OTP Code',
      html: htmlContent
    });
    
    console.log(`✅ OTP email sent successfully to ${email}`);
    if (process.env.NODE_ENV === 'development') {
      console.log('Resend Response:', result);
    }
    
    return { success: true, messageId: result.id };
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    console.error('Error details:', {
      message: error.message,
      statusCode: error.statusCode,
      name: error.name
    });
    
    // In development, still return success so user can use console OTP
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️  Email failed but OTP is available in console above');
      return { 
        success: true, 
        developmentMode: true,
        note: 'Email failed but proceeding in development mode. Check console for OTP.'
      };
    }
    
    return { success: false, error: error.message };
  }
};

const sendWelcomeEmail = async (email, name) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
        .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome!</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${name}</strong>,</p>
          <p>Your email has been successfully verified! Welcome to Khwopa College Portal.</p>
          <p>You can now access all features including:</p>
          <ul>
            <li>Browse and purchase items from the marketplace</li>
            <li>Sell your own items</li>
            <li>Connect with mentors</li>
            <li>Chat with other students</li>
          </ul>
          <p>Get started by completing your profile!</p>
        </div>
        <div class="footer">
          <p>© 2026 Khwopa College Portal. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: email,
      subject: 'Welcome to Khwopa College Portal!',
      html: htmlContent
    });
    console.log(`✉️  Welcome email sent successfully to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOTPEmail,
  sendWelcomeEmail
};
