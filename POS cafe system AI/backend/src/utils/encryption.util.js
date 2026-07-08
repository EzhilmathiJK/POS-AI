import CryptoJS from 'crypto-js';

const KEY = CryptoJS.enc.Utf8.parse(process.env.AES_KEY);

export const decrypt = (cipherText) => {
  const [ivHex, cipher] = cipherText.split(":");

  const iv = CryptoJS.enc.Hex.parse(ivHex);

  const decrypted = CryptoJS.AES.decrypt(cipher, KEY, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};