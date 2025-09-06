
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';

class KYCVerification extends Model {
  public id!: number;
  public userId!: number;
  public aadhaarNumber!: string;
  public panNumber!: string;
  public status!: string;
  public verificationDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

KYCVerification.init({
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
  aadhaarNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  panNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending',
  },
  verificationDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'kyc_verifications',
});

KYCVerification.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(KYCVerification, { foreignKey: 'userId' });

export { KYCVerification };
