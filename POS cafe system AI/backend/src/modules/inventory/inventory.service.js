import * as inventoryRepo from './inventory.repository.js';
import { calculateStock, generateItemNumber } from '../../utils/inventory.helpers.js';

export const getInventoryList = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  // Build filters
  const filters = {};
  if (query.search) {
    filters.OR = [
      { item_name: { contains: query.search, mode: 'insensitive' } },
      { item_number: { contains: query.search, mode: 'insensitive' } }
    ];
  }
  if (query.category && query.category !== 'all') {
    filters.category = query.category;
  }
  if (query.status && query.status !== 'all') {
    filters.status = query.status;
  }
  if (query.dateFrom && query.dateTo) {
    filters.created_at = {
      gte: new Date(query.dateFrom),
      lte: new Date(query.dateTo + 'T23:59:59')
    };
  }

  // Sorting
  const sortBy = query.sortBy || 'created_at';
  const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';
  const orderBy = { [sortBy]: sortOrder };

  const items = await inventoryRepo.getInventoryItems(filters, skip, limit, orderBy);
  const total = await inventoryRepo.getInventoryCount(filters);

  return {
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const createInventoryItem = async (data, file) => {
  const inStock = parseInt(data.in_stock) || 0;
  const status = await calculateStock(inStock);
  const item_number = await generateItemNumber();
  
  const newItemData = {
    item_number: item_number,
    item_name: data.item_name,
    description: data.description,
    category: data.category,
    unit: data.unit,
    price: parseFloat(data.price) || 0,
    in_stock: Math.max(0, inStock),
    purchased: Math.max(0, inStock),
    sold: 0,
    status: status,
    supplier: data.supplier,
  };

  if (file) {
    newItemData.image_url = `/uploads/inventory/${file.filename}`;
  } else {
    newItemData.image_url = '/default-image.png';
  }

  return await inventoryRepo.createInventoryItem(newItemData);
};

export const updateInventoryItem = async (id, data, file) => {
  const currentItem = await inventoryRepo.getInventoryItemById(id);
  if (!currentItem) {
    throw new Error('Item not found');
  }

  // Ignore in_stock, purchased, sold from update data
  const status = await calculateStock(currentItem.in_stock);

  const updateData = {
    item_name: data.item_name !== undefined ? data.item_name : currentItem.item_name,
    description: data.description !== undefined ? data.description : currentItem.description,
    category: data.category !== undefined ? data.category : currentItem.category,
    unit: data.unit !== undefined ? data.unit : currentItem.unit,
    price: data.price !== undefined ? parseFloat(data.price) : currentItem.price,
    supplier: data.supplier !== undefined ? data.supplier : currentItem.supplier,
    status: status,
  };

  if (file) {
    updateData.image_url = `/uploads/inventory/${file.filename}`;
  }

  return await inventoryRepo.updateInventoryItem(id, updateData);
};

export const deleteInventoryItem = async (id) => {
  return await inventoryRepo.deleteInventoryItem(id);
};

export const getInventoryFilters = async () => {
  const items = await prisma.inventory.findMany({
    select: { category: true, item_name: true, status: true },
    where: { is_deleted: false },
    orderBy: { item_name: 'asc' }
  });

  const categories = [...new Set(items.map(i => i.category).filter(Boolean))];
  const itemNames = [...new Set(items.map(i => i.item_name).filter(Boolean))];
  const statuses = [...new Set(items.map(i => i.status).filter(Boolean))];

  return { categories, itemNames, statuses };
};
