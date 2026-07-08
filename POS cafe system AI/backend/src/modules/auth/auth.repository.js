import prisma from '../../config/prisma.js';
import { DEFAULT_ROLE_PERMISSIONS } from './auth.constants.js';

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const createUser = async (userData) => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: userData,
    });

    const existingPermissions = await tx.rolePermission.findUnique({
      where: { role: user.role },
    });

    if (!existingPermissions && DEFAULT_ROLE_PERMISSIONS[user.role]) {
      await tx.rolePermission.create({
        data: {
          role: user.role,
          ...DEFAULT_ROLE_PERMISSIONS[user.role],
        },
      });
    }

    return user;
  });
};

export const findPermissionsByRole = async (role) => {
  return await prisma.rolePermission.findUnique({
    where: { role },
  });
};
