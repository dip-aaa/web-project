const crypto = require('crypto');

const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, digits.length);
    otp += digits[randomIndex];
  }
  
  return otp;
};

const getOTPExpiryTime = (minutes = 10) => {
  const now = new Date();
  return new Date(now.getTime() + minutes * 60000);
};

module.exports = {
  generateOTP,
  getOTPExpiryTime
};
