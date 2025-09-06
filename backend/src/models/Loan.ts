
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { LoanApplication } from './LoanApplication';

class Loan extends Model {
  public id!: number;
  public applicationId!: number;
  public disbursedAmount!: number;
  public interestRate!: number;
  public tenure!: number;
  public status!: string;
  public remainingBalance!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Loan.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  applicationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: LoanApplication,
      key: 'id',
    },
  },
  disbursedAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  interestRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tenure: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Active',
  },
  remainingBalance: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'loans',
});

export { Loan };
