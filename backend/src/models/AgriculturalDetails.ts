
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { LoanApplication } from './LoanApplication';

class AgriculturalDetails extends Model {
    public id!: number;
    public applicationId!: number;
    public landSizeInAcres!: number;
    public cropType!: string;
    public soilType!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AgriculturalDetails.init({
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
    landSizeInAcres: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    cropType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    soilType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'agricultural_details',
});

AgriculturalDetails.belongsTo(LoanApplication, { foreignKey: 'applicationId' });
LoanApplication.hasOne(AgriculturalDetails, { foreignKey: 'applicationId' });

export { AgriculturalDetails };
