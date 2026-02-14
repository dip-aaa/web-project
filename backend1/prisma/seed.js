const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create default college
  const college = await prisma.college.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Khwopa College of Engineering',
      location: 'Bhaktapur, Nepal'
    }
  });

  console.log('✓ Created college:', college.name);

  // Create sample categories
  const categories = [
    { id: 1, name: 'Books' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Stationery' },
    { id: 4, name: 'Lab Equipment' },
    { id: 5, name: 'Sports' }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category
    });
  }

  console.log('✓ Created', categories.length, 'categories');

  console.log('\n✅ Database seeding completed!');
  console.log('\nYou can now:');
  console.log('1. Start the server: npm run dev');
  console.log('2. Register with an @khwopa.edu.np email');
  console.log('3. Verify with OTP sent to your email');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
