
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';

class KYC extends Model {
  public id!: number;
  public userId!: number;
  public panNumber!: string;
  public aadhaarNumber!: string;
  public isVerified!: boolean;
  public status!: string;
  public providerResponse!: any;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

KYC.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  panNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  aadhaarNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  providerResponse: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'kyc',
});

export { KYC };
