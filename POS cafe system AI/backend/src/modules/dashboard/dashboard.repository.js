import prisma from '../../config/prisma.js';

export const getDashboardStats = async () => {
  const [
    totalSalesResult,
    totalOrders,
    totalUsers,
    totalProducts
  ] = await Promise.all([
    prisma.bill.aggregate({
      _sum: { total_amount: true }
    }),
    prisma.bill.count(),
    prisma.user.count({ where: { is_deleted: false } }),
    prisma.inventory.count({ where: { is_deleted: false } })
  ]);

  const totalSales = totalSalesResult._sum.total_amount ? Number(totalSalesResult._sum.total_amount) : 0;
  const averageOrderValue = totalOrders > 0 ? (totalSales / totalOrders) : 0;

  return {
    totalSales,
    totalOrders,
    totalUsers,
    totalProducts,
    averageOrderValue
  };
};

export const getSalesOverview = async (period) => {
  const data = [];
  const now = new Date();
  
  if (period === 'weekly') {
    // Last 7 weeks
    for (let i = 6; i >= 0; i--) {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1) - (i * 7));
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      
      const sales = await prisma.bill.aggregate({
        where: {
          created_at: {
            gte: startOfWeek,
            lte: endOfWeek
          }
        },
        _sum: { total_amount: true }
      });
      
      data.push({
        name: `${startOfWeek.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`,
        sales: sales._sum.total_amount ? Number(sales._sum.total_amount) : 0
      });
    }
  } else {
    // Default to daily (last 7 days)
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);
      
      const sales = await prisma.bill.aggregate({
        where: {
          created_at: {
            gte: date,
            lt: nextDate
          }
        },
        _sum: { total_amount: true }
      });
      
      data.push({
        name: `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`,
        sales: sales._sum.total_amount ? Number(sales._sum.total_amount) : 0
      });
    }
  }
  
  return data;
};

export const getTopSellingItems = async (period) => {
  const now = new Date();
  let startDate = new Date();
  let endDate = new Date();

  if (period === 'last_week') {
    const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1;
    startDate.setDate(now.getDate() - dayOfWeek - 7);
    startDate.setHours(0, 0, 0, 0);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);
  } else if (period === 'this_month') {
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);
  } else {
    // Default to this week
    const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1;
    startDate.setDate(now.getDate() - dayOfWeek);
    startDate.setHours(0, 0, 0, 0);
  }

  // Find top 5 selling items by quantity
  const topItems = await prisma.billItem.groupBy({
    by: ['item_name'],
    where: {
      bill: {
        created_at: {
          gte: startDate,
          lte: endDate
        }
      }
    },
    _sum: {
      quantity: true,
      total_price: true
    },
    orderBy: {
      _sum: {
        quantity: 'desc'
      }
    },
    take: 5
  });

  // Try to match with inventory to get the image, otherwise use default icon
  const enrichedItems = await Promise.all(topItems.map(async (item, index) => {
    const invItem = await prisma.inventory.findFirst({
      where: { item_name: item.item_name, is_deleted: false }
    });
    
    return {
      id: index + 1,
      name: item.item_name,
      image: invItem?.image_url || 'https://via.placeholder.com/32',
      qtySold: item._sum.quantity || 0,
      revenue: item._sum.total_price ? Number(item._sum.total_price) : 0
    };
  }));

  return enrichedItems;
};

export const getRecentTransactions = async () => {
  const bills = await prisma.bill.findMany({
    orderBy: { created_at: 'desc' },
    take: 5
  });

  return bills.map(bill => ({
    id: bill.bill_number, // Returns format like BILL-000001
    date: new Date(bill.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date(bill.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    amount: Number(bill.total_amount),
    status: 'Completed' // You can adjust if bills have status
  }));
};

export const getLowStockAlerts = async () => {
  const items = await prisma.inventory.findMany({
    where: {
      is_deleted: false,
      status: {
        in: ['Low Stock', 'Out of Stock']
      }
    },
    orderBy: {
      in_stock: 'asc'
    },
    take: 4
  });

  return items.map(item => ({
    id: item.id,
    name: item.item_name,
    unit: item.unit || 'Unit',
    stock: item.in_stock,
    image: item.image_url || 'https://via.placeholder.com/32'
  }));
};
