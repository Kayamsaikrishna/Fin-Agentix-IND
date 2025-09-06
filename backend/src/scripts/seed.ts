
import db from '../models';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  try {
    await db.sequelize.sync({ force: true });

    // Create roles
    const adminRole = await db.Role.create({ name: 'admin' });
    const agentRole = await db.Role.create({ name: 'agent' });
    const userRole = await db.Role.create({ name: 'user' });

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await db.User.create({
      email: 'admin@example.com',
      password: hashedPassword,
      fullName: 'Admin User',
    });

    // Assign admin role to admin user
    await db.UserRole.create({
      userId: adminUser.id,
      roleId: adminRole.id,
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await db.sequelize.close();
  }
};

seedDatabase();
