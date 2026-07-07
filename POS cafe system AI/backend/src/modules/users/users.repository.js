import prisma from '../../config/prisma.js';

export const getAllUsers = async (offset, limit, filters = {}) => {
  const { search, role, status } = filters;
  
  const where = { is_deleted: false };

  if (search) {
    where.OR = [
      { full_name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } }
    ];
  }

  if (role && role !== 'All Roles') {
    where.role = role;
  }

  if (status && status !== 'All Status') {
    where.is_active = status === 'Active';
  }

  const [users, totalRecords] = await Promise.all([
    prisma.user.findMany({
      where,
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
      },
      skip: offset,
      take: limit,
    }),
    prisma.user.count({ where })
  ]);

  return { users, totalRecords };
};

export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id: Number(id) },
    data,
    select: {
      id: true,
      full_name: true,
      username: true,
      email: true,
      role: true,
      is_active: true,
      created_at: true,
    }
  });
};
