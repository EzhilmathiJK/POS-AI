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
