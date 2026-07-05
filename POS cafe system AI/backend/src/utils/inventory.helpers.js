import prisma from '../config/prisma.js';

export const generateItemNumber = async () => {
    // Find the last created inventory item based on ID
    const lastItem = await prisma.inventory.findFirst({
        orderBy: { id: 'desc' },
    });

    if (!lastItem || !lastItem.item_number) {
        return "ITM-000001";
    }

    // Example itemNo: "ITM-000001"
    const lastNumber = parseInt(lastItem.item_number.split("-")[1], 10);

    if (isNaN(lastNumber)) {
        return "ITM-000001";
    }

    const nextNumber = lastNumber + 1;
    
    return `ITM-${String(nextNumber).padStart(6, "0")}`;
};

export const calculateStock = (stock) => {
    if (stock <= 0) {
        return "Out of Stock";
    } else if (stock <= 10) {
        return "Low Stock";
    } else {
        return "In Stock";
    }
};
