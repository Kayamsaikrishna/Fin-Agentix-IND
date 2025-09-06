
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';

class Partner extends Model {
  public id!: number;
  public name!: string;
  public contactPerson!: string;
  public contactEmail!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Partner.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contactPerson: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  tableName: 'partners',
});

export { Partner };
