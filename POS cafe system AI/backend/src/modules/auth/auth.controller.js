import * as authService from './auth.service.js';
import { validationResult } from 'express-validator';
import { verifyToken, generateAccessToken } from '../../utils/jwt.util.js';

// Helper to handle validation errors in controllers
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  return null;
};

export const register = async (req, res, next) => {
  try {
    if (handleValidationErrors(req, res)) return;

    const user = await authService.registerUser(req.body);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    if (handleValidationErrors(req, res)) return;

    const { username, password } = req.body;
    const authData = await authService.loginUser(username, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: authData,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: 'Refresh token is required', errors: [] });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ success: false, message: 'Invalid or expired refresh token', errors: [] });
    }

    // Check if user still exists
    const { user } = await authService.getUserWithPermissions(payload.userId);

    const jwtPayload = {
      userId: user.id,
      role: user.role,
      fullname: user.full_name,
    };

    const newAccessToken = generateAccessToken(jwtPayload);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    // For a stateless JWT, logout is handled by the client dropping the token.
    // If blacklisting is needed, it would be implemented here.
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    // req.user is populated by the `authenticate` middleware
    res.status(200).json({
      success: true,
      message: 'User details fetched successfully',
      data: {
        user: req.user,
        permissions: req.permissions,
      },
    });
  } catch (error) {
    next(error);
  }
};
