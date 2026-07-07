import prisma from '../../config/prisma.js';
import * as billingRepo from './billing.repository.js';
import { calculateStock } from '../../utils/inventory.helpers.js';
import { generateBillNumber } from '../../utils/billing.helper.js';



export const createBill = async (billData) => {
  const { cart, totalAmount, tenderAmount, balanceAmount } = billData;
  const lastBill = await billingRepo.getLatestBill();
  const billNumber = generateBillNumber(lastBill);

  // Execute in a transaction to ensure data integrity
  const result = await prisma.$transaction(async (tx) => {
    // 1. Create the Bill
    const newBill = await tx.bill.create({
      data: {
        bill_number: billNumber,
        total_amount: totalAmount,
        tender_amount: tenderAmount,
        balance_amount: balanceAmount,
      }
    });

    // 2. Create BillItems
    const billItemsData = cart.map((item) => ({
      bill_id: newBill.id,
      inventory_id: item.id,
      item_number: item.item_number, // or item.code depending on frontend, mapped carefully
      item_name: item.item_name,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
    }));

    await tx.billItem.createMany({
      data: billItemsData,
    });

    // 3. Update Inventory Stock
    for (const item of cart) {
      const inventory = await tx.inventory.findUnique({
        where: { id: item.id },
      });

      if (!inventory) {
        throw new Error(`Inventory item ${item.item_name} not found.`);
      }

      const newSold = inventory.sold + item.quantity;
      const newInStock = inventory.in_stock - item.quantity;
      const newStatus = await calculateStock(newInStock);

      await tx.inventory.update({
        where: { id: inventory.id },
        data: {
          sold: newSold,
          in_stock: newInStock,
          status: newStatus,
        }
      });
    }

    return newBill;
  });

  return result;
};
