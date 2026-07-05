import prisma from '../../config/prisma.js';

export const getLatestBill = async () => {
  return await prisma.bill.findFirst({
    orderBy: {
      id: 'desc'
    }
  });
};
