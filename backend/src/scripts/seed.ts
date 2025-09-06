
import { sequelize, models } from '../models';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Create roles
    const adminRole = await models.Role.create({ name: 'admin' });
    const agentRole = await models.Role.create({ name: 'agent' });
    const userRole = await models.Role.create({ name: 'user' });

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await models.User.create({
      email: 'admin@example.com',
      password: hashedPassword,
      fullName: 'Admin User',
    });

    // Assign admin role to admin user
    await models.UserRole.create({
      userId: adminUser.id,
      roleId: adminRole.id,
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
