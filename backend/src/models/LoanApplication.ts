
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';

class LoanApplication extends Model {
  public id!: number;
  public userId!: number;
  public loanType!: string;
  public amount!: number;
  public status!: string;
  public applicationDate!: Date;
  public decisionDate!: Date | null;
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
    defaultValue: 'Pending',
  },
  applicationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  decisionDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'loan_applications',
});

LoanApplication.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(LoanApplication, { foreignKey: 'userId' });

export { LoanApplication };
