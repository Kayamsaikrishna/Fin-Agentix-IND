
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';
import { Loan } from './Loan';

class LoanApplication extends Model {
  public id!: number;
  public userId!: number;
  public loanType!: string;
  public amount!: number;
  public status!: string;
  public purpose!: string;
  public user!: User;
  public loan!: Loan;
  public remarks!: string;
  public term!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LoanApplication.init({
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
  loanType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'PENDING',
  },
  purpose: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  term: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'loan_applications',
});

LoanApplication.belongsTo(User, { foreignKey: 'userId', as: 'user' });
LoanApplication.hasOne(Loan, { foreignKey: 'applicationId', as: 'loan' });

export { LoanApplication };
