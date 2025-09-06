
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';

class KYCVerification extends Model {
    public id!: number;
    public userId!: number;
    public documentType!: string;
    public documentNumber!: string;
    public isVerified!: boolean;
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
    documentType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    documentNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize,
    tableName: 'kyc_verifications',
});

KYCVerification.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(KYCVerification, { foreignKey: 'userId' });

export { KYCVerification };
