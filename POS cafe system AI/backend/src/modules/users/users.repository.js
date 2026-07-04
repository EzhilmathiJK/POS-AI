import prisma from '../../config/prisma.js';

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      full_name: true,
      username: true,
      email: true,
      role: true,
      is_active: true,
      created_at: true,
    },
    orderBy: {
      created_at: 'desc',
    }
  });
};
