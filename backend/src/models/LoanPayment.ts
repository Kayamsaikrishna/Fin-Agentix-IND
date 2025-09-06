
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { Loan } from './Loan';

class LoanPayment extends Model {
  public id!: number;
  public loanId!: number;
  public amount!: number;
  public paymentDate!: Date;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LoanPayment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  loanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Loan,
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Completed',
  },
}, {
  sequelize,
  tableName: 'loan_payments',
});

export { LoanPayment };
