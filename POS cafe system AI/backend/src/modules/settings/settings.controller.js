import * as settingsService from './settings.service.js';

export const getRolePermissions = async (req, res, next) => {
  try {
    const permissions = await settingsService.fetchAllRolePermissions();
    res.status(200).json({
      success: true,
      message: 'Role permissions fetched successfully',
      data: { permissions },
    });
  } catch (error) {
    next(error);
  }
};

export const updateRolePermission = async (req, res, next) => {
  try {
    const { role } = req.params;
    const data = req.body;
    
    // Only extract the boolean fields for updating
    const updateData = {};
    const allowedFields = ['dashboard', 'billing', 'inventory', 'item_request', 'sales_report', 'users', 'settings'];
    
    allowedFields.forEach(field => {
      if (data[field] !== undefined) {
        updateData[field] = Boolean(data[field]);
      }
    });

    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    const updatedPermission = await settingsService.editRolePermission(formattedRole, updateData);
    
    res.status(200).json({
      success: true,
      message: 'Role permissions updated successfully',
      data: { permission: updatedPermission },
    });
  } catch (error) {
    next(error);
  }
};
