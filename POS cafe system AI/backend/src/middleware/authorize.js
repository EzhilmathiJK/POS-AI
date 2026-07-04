export const authorize = (pageName) => {
  return (req, res, next) => {
    // Ensure authenticate middleware ran first
    if (!req.user || !req.permissions) {
      return res.status(500).json({ success: false, message: 'Authentication required before authorization', errors: [] });
    }

    // Check if the role permissions allow access to this page
    if (req.permissions[pageName] !== true) {
      return res.status(403).json({ success: false, message: 'Access denied: insufficient permissions', errors: [] });
    }

    next();
  };
};
