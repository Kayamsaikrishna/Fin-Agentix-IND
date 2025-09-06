
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { LoanApplication } from './LoanApplication';

class VehicleDetails extends Model {
    public id!: number;
    public applicationId!: number;
    public vehicleType!: string;
    public make!: string;
    public model!: string;
    public year!: number;
    public registrationNumber!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

VehicleDetails.init({
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
    vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    make: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    registrationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    tableName: 'vehicle_details',
});

VehicleDetails.belongsTo(LoanApplication, { foreignKey: 'applicationId' });
LoanApplication.hasOne(VehicleDetails, { foreignKey: 'applicationId' });

export { VehicleDetails };
