import prisma from '../../config/prisma.js';
import { calculateStock } from '../../utils/inventory.helpers.js';
import { generateRequestNumber, getSubmitStatus } from '../../utils/request.helper.js';

// Auto-update logic: Process any "On The Way" requests that have reached their delivery date
const processReceivedRequests = async (tx) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const requests = await tx.itemRequestHeader.findMany({
    where: {
      status: 'On The Way',
      inventory_updated: false,
      delivery_date: {
        lte: today,
      },
    },
    include: {
      details: true,
    },
  });

  for (const request of requests) {
    // 1. Update Inventory for each item in the request
    for (const item of request.details) {
      const inventoryItem = await tx.inventory.findUnique({
        where: { id: item.inventory_id }
      });
      if (!inventoryItem) continue;

      const newPurchased = inventoryItem.purchased + item.quantity;
      const newInStock = inventoryItem.in_stock + item.quantity;
      
      await tx.inventory.update({
        where: { id: inventoryItem.id },
        data: {
          purchased: newPurchased,
          in_stock: newInStock,
          status: await calculateStock(newInStock),
        }
      });
    }

    // 2. Mark request as Received and inventory_updated
    await tx.itemRequestHeader.update({
      where: { id: request.id },
      data: {
        status: 'Received',
        inventory_updated: true,
      }
    });
  }
};



export const createItemRequest = async (data, requestedBy) => {
  return await prisma.$transaction(async (tx) => {
    const { subject, deliveryDate, items } = data;
    
    const lastRequest = await tx.itemRequestHeader.findFirst({
      orderBy: { id: 'desc' }
    });
    const requestNo = generateRequestNumber(lastRequest);

    const itemRequest = await tx.itemRequestHeader.create({
      data: {
        request_number: requestNo,
        subject,
        requested_by: requestedBy,
        delivery_date: new Date(deliveryDate),
        status: 'Pending',
        details: {
          create: items.map(item => ({
            inventory_id: item.inventoryId,
            quantity: item.quantity,
            expected_date: new Date(item.expectedDate)
          }))
        }
      }
    });

    return { id: itemRequest.id, message: 'Item request created successfully.' };
  });
};

export const submitItemRequest = async (id) => {
  return await prisma.$transaction(async (tx) => {
    const itemRequest = await tx.itemRequestHeader.findUnique({
      where: { id: parseInt(id) },
      include: { details: true }
    });

    if (!itemRequest) throw new Error('Item request not found.');
    if (itemRequest.status !== 'Pending') throw new Error('Only pending requests can be submitted.');

    const status = getSubmitStatus(itemRequest.delivery_date);

    if (status === 'Received') {
      // Update inventory directly
      for (const item of itemRequest.details) {
        const inventoryItem = await tx.inventory.findUnique({ where: { id: item.inventory_id } });
        if (inventoryItem) {
          const newInStock = inventoryItem.in_stock + item.quantity;
          await tx.inventory.update({
            where: { id: inventoryItem.id },
            data: {
              purchased: inventoryItem.purchased + item.quantity,
              in_stock: newInStock,
              status: await calculateStock(newInStock),
            }
          });
        }
      }

      await tx.itemRequestHeader.update({
        where: { id: parseInt(id) },
        data: { status, inventory_updated: true }
      });
    } else {
      await tx.itemRequestHeader.update({
        where: { id: parseInt(id) },
        data: { status }
      });
    }

    return { message: 'Item request submitted successfully.' };
  });
};

export const updateItemRequest = async (id, data) => {
  return await prisma.$transaction(async (tx) => {
    const { subject, deliveryDate, items } = data;
    
    const itemRequest = await tx.itemRequestHeader.findUnique({ where: { id: parseInt(id) } });
    if (!itemRequest) throw new Error('Item request not found.');
    if (itemRequest.status !== 'Pending') throw new Error('Only pending requests can be updated.');

    await tx.itemRequestHeader.update({
      where: { id: parseInt(id) },
      data: {
        subject,
        delivery_date: new Date(deliveryDate),
      }
    });

    // Replace details
    await tx.itemRequestDetail.deleteMany({
      where: { item_request_id: parseInt(id) }
    });

    await tx.itemRequestDetail.createMany({
      data: items.map(item => ({
        item_request_id: parseInt(id),
        inventory_id: item.inventoryId,
        quantity: item.quantity,
        expected_date: new Date(item.expectedDate)
      }))
    });

    return { message: 'Item request updated successfully.' };
  });
};

export const cancelItemRequest = async (id) => {
  return await prisma.$transaction(async (tx) => {
    const itemRequest = await tx.itemRequestHeader.findUnique({ where: { id: parseInt(id) } });
    if (!itemRequest) throw new Error('Item request not found.');
    if (itemRequest.status !== 'Pending') throw new Error('Only pending requests can be cancelled.');

    await tx.itemRequestHeader.update({
      where: { id: parseInt(id) },
      data: { status: 'Cancelled' }
    });

    return { message: 'Item request cancelled successfully.' };
  });
};

export const getAllItemRequests = async (pagination, filters) => {
  return await prisma.$transaction(async (tx) => {
    await processReceivedRequests(tx);

    const page = Number(pagination.page) || 1;
    const limit = Number(pagination.limit) || 10;
    const offset = (page - 1) * limit;
    
    const { requestNo, subject, requestedBy, dateFrom, dateTo } = filters;
    const where = {};

    if (requestNo && requestNo !== 'all') where.request_number = requestNo;
    if (requestedBy && requestedBy !== 'all') where.requested_by = requestedBy;
    if (subject && subject.trim() !== '') where.subject = { contains: subject.trim(), mode: 'insensitive' };
    
    if (dateFrom && dateTo) {
      where.created_at = {
        gte: new Date(dateFrom),
        lte: new Date(dateTo + 'T23:59:59')
      };
    }

    const [totalRecords, itemRequests] = await Promise.all([
      tx.itemRequestHeader.count({ where }),
      tx.itemRequestHeader.findMany({
        where,
        include: {
          details: {
            include: {
              inventory: {
                select: { id: true, item_name: true }
              }
            }
          }
        },
        orderBy: { id: 'asc' },
        skip: offset,
        take: limit,
      })
    ]);

    return {
      itemRequests,
      totalRecords,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalRecords / limit),
    };
  });
};

export const getItemRequestFilters = async () => {
  const requests = await prisma.itemRequestHeader.findMany({
    select: { request_number: true, requested_by: true },
    orderBy: { request_number: 'asc' }
  });

  const requestNumbers = [...new Set(requests.map(req => req.request_number))];
  const requestedBy = [...new Set(requests.map(req => req.requested_by))];

  return { requestNumbers, requestedBy };
};

export const getItemRequestById = async (id) => {
  return await prisma.$transaction(async (tx) => {
    await processReceivedRequests(tx);

    const request = await tx.itemRequestHeader.findUnique({
      where: { id: parseInt(id) },
      include: {
        details: {
          include: {
            inventory: {
              select: { id: true, item_name: true }
            }
          }
        }
      }
    });

    if (!request) throw new Error('Item request not found.');
    return request;
  });
};
