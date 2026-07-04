import { verifyToken } from '../utils/jwt.util.js';
import * as authService from '../modules/auth/auth.service.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authentication required', errors: [] });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token', errors: [] });
    }

    // Load user and permissions from database
    const { user, permissions } = await authService.getUserWithPermissions(decoded.userId);

    if (!user.is_active || user.is_deleted) {
      return res.status(403).json({ success: false, message: 'User account is deactivated or deleted', errors: [] });
    }

    // Attach both user and permissions to the request
    req.user = user;
    req.permissions = permissions;

    next();
  } catch (error) {
    next(error);
  }
};
