export const generateBillNumber = (lastBill) => {
  if (!lastBill) {
    return 'BILL-000001';
  }
  const lastNumber = parseInt(lastBill.bill_number.split('-')[1], 10);
  return `BILL-${String(lastNumber + 1).padStart(6, '0')}`;
};
