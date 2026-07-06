import * as inventoryService from './inventory.service.js';

export const getInventoryList = async (req, res, next) => {
  try {
    const result = await inventoryService.getInventoryList(req.query);
    res.status(200).json({
      success: true,
      data: result.items,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

export const createInventoryItem = async (req, res, next) => {
  try {
    const { item_name, category, unit, price, in_stock } = req.body;
    
    // Validate required fields
    if (!item_name || !category || !unit || price === undefined || in_stock === undefined) {
      return res.status(400).json({ success: false, message: 'Missing mandatory fields: item_name, category, unit, price, in_stock are required' });
    }

    const newItem = await inventoryService.createInventoryItem(req.body, req.file);
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: newItem
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, message: 'Item name already exists. Duplicate items cannot be added.' });
    }
    next(error);
  }
};

export const updateInventoryItem = async (req, res, next) => {
  try {
    const updatedItem = await inventoryService.updateInventoryItem(req.params.id, req.body, req.file);
    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: updatedItem
    });
  } catch (error) {
    if (error.message === 'Item not found') {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, message: 'Item name already exists. Duplicate items cannot be added.' });
    }
    next(error);
  }
};

export const deleteInventoryItem = async (req, res, next) => {
  try {
    await inventoryService.deleteInventoryItem(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getInventoryFilters = async (req, res, next) => {
  try {
    const result = await inventoryService.getInventoryFilters();
    res.status(200).json({ success: true, message: 'Inventory filters fetched successfully.', data: result });
  } catch (error) {
    next(error);
  }
};
