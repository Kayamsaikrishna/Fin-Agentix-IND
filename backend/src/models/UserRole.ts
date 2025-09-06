
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/connection';

class UserRole extends Model {
  public userId!: number;
  public roleId!: number;
}

UserRole.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key: 'id',
      },
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'user_roles',
  }
);

export { UserRole };
