import CryptoJS from 'crypto-js';

const KEY = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_KEY);

export const encrypt = (text) => {
   const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(
    text,
    KEY,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.toString();
};