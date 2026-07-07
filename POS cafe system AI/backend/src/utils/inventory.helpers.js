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

export const calculateStock = async (stock) => {
    if (stock <= 0) {
        return "Out of Stock";
    }
    const settings = await prisma.generalSettings.findFirst();
    const threshold = settings?.low_stock_threshold ?? 10;
    
    if (stock <= threshold) {
        return "Low Stock";
    } else {
        return "In Stock";
    }
};
