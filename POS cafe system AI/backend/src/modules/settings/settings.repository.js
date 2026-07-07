import prisma from '../../config/prisma.js';

export const getAllRolePermissions = async () => {
  return await prisma.rolePermission.findMany();
};

export const updateRolePermission = async (role, data) => {
  return await prisma.rolePermission.upsert({
    where: { role },
    update: data,
    create: { role, ...data },
  });
};

export const getAllCategories = async () => {
  return await prisma.category.findMany({
    where: { is_deleted: false },
    orderBy: { id: 'asc' },
  });
};

export const createCategory = async (data) => {
  return await prisma.category.create({ data });
};

export const deleteCategory = async (id) => {
  return await prisma.category.update({
    where: { id: parseInt(id) },
    data: { is_deleted: true },
  });
};

export const getGeneralSettings = async () => {
  let settings = await prisma.generalSettings.findFirst();
  if (!settings) {
    settings = await prisma.generalSettings.create({
      data: {
        cafe_name: 'POS Cafe',
        cafe_logo: '/default-image.png',
        time_format: '12h',
        gst_percentage: 7.00,
        low_stock_threshold: 10
      }
    });
  }
  return settings;
};

export const updateGeneralSettings = async (data) => {
  const settings = await prisma.generalSettings.findFirst();
  return await prisma.generalSettings.update({
    where: { id: settings.id },
    data
  });
};

export const updateInventorySettings = async (data) => {
  const settings = await prisma.generalSettings.findFirst();
  return await prisma.generalSettings.update({
    where: { id: settings.id },
    data
  });
};
