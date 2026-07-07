import CryptoJS from 'crypto-js';

const KEY = CryptoJS.enc.Utf8.parse(process.env.AES_KEY);
const IV = CryptoJS.enc.Utf8.parse(process.env.AES_IV);

export const encrypt = (text) => {
    const encrypted = CryptoJS.AES.encrypt(
        text,
        KEY,
        {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );
    return encrypted.toString();
};

export const decrypt = (cipherText) => {
  const decrypted = CryptoJS.AES.decrypt(cipherText, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};