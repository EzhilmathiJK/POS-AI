import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '5m' });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};
