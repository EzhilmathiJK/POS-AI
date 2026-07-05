import prisma from '../../config/prisma.js';

export const getInventoryItems = async (filters, skip, take, orderBy) => {
  return await prisma.inventory.findMany({
    where: {
      ...filters,
      is_deleted: false,
    },
    skip,
    take,
    orderBy,
  });
};

export const getInventoryCount = async (filters) => {
  return await prisma.inventory.count({
    where: {
      ...filters,
      is_deleted: false,
    },
  });
};

export const getInventoryItemById = async (id) => {
  return await prisma.inventory.findFirst({
    where: {
      id: parseInt(id),
      is_deleted: false,
    },
  });
};

export const createInventoryItem = async (data) => {
  return await prisma.inventory.create({
    data,
  });
};

export const updateInventoryItem = async (id, data) => {
  return await prisma.inventory.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteInventoryItem = async (id) => {
  return await prisma.inventory.update({
    where: { id: parseInt(id) },
    data: { is_deleted: true },
  });
};
