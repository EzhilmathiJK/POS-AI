import prisma from './src/config/prisma.js';

const defaultCategories = [
  { name: 'Beverage', iconName: 'Beverage' },
  { name: 'Steamed Bun', iconName: 'SteamedBun' },
  { name: 'Steamed Dimsum', iconName: 'Dimsum' },
  { name: 'Deep Fry Timsun', iconName: 'DeepFry' },
  { name: 'Bake', iconName: 'Bake' },
  { name: 'Noodle/ Dumplings', iconName: 'Noodles' },
  { name: 'Porridge', iconName: 'Porridge' },
];

async function main() {
  for (const cat of defaultCategories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: {
        name: cat.name,
        iconName: cat.iconName,
        is_deleted: false,
      },
    });
  }
  console.log('Categories seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
