import * as authService from './auth.service.js';
import { validationResult } from 'express-validator';
import { verifyToken, generateAccessToken } from '../../utils/jwt.util.js';
import { decrypt } from '../../utils/encryption.util.js';

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

    const username = decrypt(req.body.username);
    const password = decrypt(req.body.password);

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
    const { user, permissions } = await authService.getUserWithPermissions(payload.userId);

    if (!user.is_active || user.is_deleted) {
      return res.status(403).json({ success: false, message: 'User account is deactivated', errors: [] });
    }

    const jwtPayload = {
      userId: user.id,
      username: user.username,
      fullname: user.full_name,
      role: user.role,
      permissions: {
        dashboard: permissions.dashboard,
        billing: permissions.billing,
        inventory: permissions.inventory,
        item_request: permissions.item_request,
        sales_report: permissions.sales_report,
        users: permissions.users,
        settings: permissions.settings,
      }
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

export const googleCallback = async (req, res, next) => {
  try {
    const authData = await authService.loginWithGoogle(req.user);
    
    const frontendUrl = `http://localhost:5174/login?accessToken=${authData.accessToken}&refreshToken=${authData.refreshToken}`;
    res.redirect(frontendUrl);
  } catch (error) {
    const frontendUrl = `http://localhost:5174/login?error=${encodeURIComponent(error.message)}`;
    res.redirect(frontendUrl);  
  }
}