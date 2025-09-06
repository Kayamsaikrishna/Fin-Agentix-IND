
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';
import { LoanApplication } from './LoanApplication';

class Document extends Model {
  public id!: number;
  public userId!: number;
  public loanApplicationId!: number | null;
  public documentType!: string;
  public filePath!: string;
  public uploadDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Document.init({
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
  loanApplicationId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: LoanApplication,
      key: 'id',
    },
  },
  documentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploadDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  tableName: 'documents',
});

Document.belongsTo(User, { foreignKey: 'userId' });
Document.belongsTo(LoanApplication, { foreignKey: 'loanApplicationId' });
User.hasMany(Document, { foreignKey: 'userId' });
LoanApplication.hasMany(Document, { foreignKey: 'loanApplicationId' });

export { Document };
