import * as settingsRepo from './settings.repository.js';

export const fetchAllRolePermissions = async () => {
  return await settingsRepo.getAllRolePermissions();
};

export const editRolePermission = async (role, data) => {
  // Ensure the role is valid
  const validRoles = ['ADMIN', 'MANAGER', 'STAFF', 'CASHIER'];
  if (!validRoles.includes(role)) {
    const error = new Error('Invalid role');
    error.statusCode = 400;
    throw error;
  }

  return await settingsRepo.updateRolePermission(role, data);
};
