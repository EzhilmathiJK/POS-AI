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
