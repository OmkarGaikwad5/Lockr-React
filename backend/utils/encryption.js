const CryptoJS = require("crypto-js");
const SECRET_KEY = process.env.AES_SECRET; // Add this to your `.env`

exports.encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

exports.decrypt = (cipher) => {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
