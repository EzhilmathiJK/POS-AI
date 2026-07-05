import * as billingService from './billing.service.js';

export const createBill = async (req, res, next) => {
  try {
    const { cart, totalAmount, tenderAmount, balanceAmount } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart cannot be empty.' });
    }

    if (totalAmount === undefined || tenderAmount === undefined || balanceAmount === undefined) {
      return res.status(400).json({ success: false, message: 'Missing billing amounts.' });
    }

    if (tenderAmount < totalAmount) {
      return res.status(400).json({ success: false, message: 'Tender amount cannot be less than total amount.' });
    }

    const bill = await billingService.createBill({
      cart,
      totalAmount,
      tenderAmount,
      balanceAmount
    });

    res.status(201).json({
      success: true,
      message: 'Bill created successfully',
      data: {
        bill_number: bill.bill_number,
        total_amount: bill.total_amount
      }
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ success: false, message: error.message });
    }
    next(error);
  }
};
