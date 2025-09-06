
import { sequelize } from '../database/connection';
import { User } from './User';
import { Role } from './Role';
import { UserRole } from './UserRole';

const models = {
  User,
  Role,
  UserRole,
};

// Initialize associations
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId', otherKey: 'roleId' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId', otherKey: 'userId' });

export { sequelize, models };
