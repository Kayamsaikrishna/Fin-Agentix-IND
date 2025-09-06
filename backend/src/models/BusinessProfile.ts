
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';

class BusinessProfile extends Model {
    public id!: number;
    public userId!: number;
    public businessName!: string;
    public industry!: string;
    public registrationNumber!: string;
    public annualRevenue!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

BusinessProfile.init({
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
    businessName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    industry: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registrationNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    annualRevenue: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'business_profiles',
});

BusinessProfile.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(BusinessProfile, { foreignKey: 'userId' });

export { BusinessProfile };
