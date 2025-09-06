
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';
import { LoanApplication } from './LoanApplication';

class Document extends Model {
  public id!: number;
  public userId!: number;
  public applicationId!: number;
  public documentType!: string;
  public url!: string;
  public storageKey!: string;
  public status!: string;
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
  applicationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: LoanApplication,
      key: 'id',
    },
  },
  documentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storageKey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'documents',
});

Document.belongsTo(User, { foreignKey: 'userId' });
Document.belongsTo(LoanApplication, { foreignKey: 'applicationId' });
User.hasMany(Document, { foreignKey: 'userId' });
LoanApplication.hasMany(Document, { as: 'documents', foreignKey: 'applicationId' });

export { Document };
