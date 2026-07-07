import * as settingsService from './settings.service.js';
import prisma from '../../config/prisma.js';

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

export const getCategories = async (req, res, next) => {
  try {
    const categories = await settingsService.fetchAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, iconName } = req.body;
    if (!name || !iconName) {
      return res.status(400).json({ success: false, message: 'Name and iconName are required' });
    }
    const category = await settingsService.createCategory({ name, iconName });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await settingsService.deleteCategory(req.params.id);
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getGeneralSettings = async (req, res, next) => {
  try {
    const settings = await settingsService.fetchGeneralSettings();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

export const updateGeneralSettings = async (req, res, next) => {
  try {
    const updateData = {};
    if (req.body.cafe_name) updateData.cafe_name = req.body.cafe_name;
    if (req.body.time_format) updateData.time_format = req.body.time_format;
    
    if (req.file) {
      updateData.cafe_logo = `/uploads/settings/${req.file.filename}`;
    }

    const settings = await settingsService.editGeneralSettings(updateData);
    res.status(200).json({ success: true, message: 'General settings updated', data: settings });
  } catch (error) {
    next(error);
  }
};

export const updateInventorySettings = async (req, res, next) => {
  try {
    const { gst_percentage, low_stock_threshold } = req.body;
    
    const updateData = {};
    if (gst_percentage !== undefined) updateData.gst_percentage = gst_percentage;
    if (low_stock_threshold !== undefined) updateData.low_stock_threshold = low_stock_threshold;

    const updated = await settingsService.editGeneralSettings(updateData);
    
    // If low stock threshold changed, recalculate all inventory statuses
    if (low_stock_threshold !== undefined) {
      // 1. Out of stock (<= 0)
      await prisma.inventory.updateMany({
        where: { in_stock: { lte: 0 } },
        data: { status: 'Out of Stock' }
      });
      // 2. Low stock (0 < stock <= threshold)
      await prisma.inventory.updateMany({
        where: { 
          in_stock: { gt: 0, lte: low_stock_threshold }
        },
        data: { status: 'Low Stock' }
      });
      // 3. In stock (stock > threshold)
      await prisma.inventory.updateMany({
        where: { in_stock: { gt: low_stock_threshold } },
        data: { status: 'In Stock' }
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Inventory settings updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};
