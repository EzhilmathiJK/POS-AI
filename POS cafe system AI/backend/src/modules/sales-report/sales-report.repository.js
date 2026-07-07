import prisma from '../../config/prisma.js';
import { Prisma } from '@prisma/client';

export const getSalesItems = async () => {
  const items = await prisma.billItem.findMany({
    select: { item_name: true },
    distinct: ['item_name'],
    orderBy: { item_name: 'asc' },
  });
  return items.map(item => ({ itemName: item.item_name }));
};

export const getSalesReport = async (offset, limit, filters) => {
  const { selectedItem, startDate, endDate } = filters;

  const conditions = [];
  if (selectedItem && selectedItem !== 'all') {
    conditions.push(Prisma.sql`"item_name" = ${selectedItem}`);
  }
  if (startDate) {
    conditions.push(Prisma.sql`"created_at" >= ${startDate}`);
  }
  if (endDate) {
    conditions.push(Prisma.sql`"created_at" <= ${endDate}`);
  }

  const whereClause = conditions.length > 0 
    ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` 
    : Prisma.empty;

  const salesQuery = Prisma.sql`
    SELECT 
      "item_name" as "itemName",
      CAST(SUM("quantity") AS INTEGER) as "soldQuantity",
      SUM("total_price") as "totalPrice"
    FROM "bill_items"
    ${whereClause}
    GROUP BY "item_name"
    ORDER BY "itemName" ASC
    LIMIT ${limit} OFFSET ${offset}
  `;

  const countQuery = Prisma.sql`
    SELECT COUNT(*) as total FROM (
      SELECT "item_name"
      FROM "bill_items"
      ${whereClause}
      GROUP BY "item_name"
    ) as subquery
  `;

  const [sales, countResult] = await Promise.all([
    prisma.$queryRaw(salesQuery),
    prisma.$queryRaw(countQuery)
  ]);

  const totalRecords = countResult.length > 0 ? Number(countResult[0].total) : 0;

  return {
    sales,
    totalRecords
  };
};
