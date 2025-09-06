
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { LoanApplication } from './LoanApplication';

class PropertyDetails extends Model {
    public id!: number;
    public applicationId!: number;
    public propertyType!: string;
    public propertyValue!: number;
    public location!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PropertyDetails.init({
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
    propertyType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    propertyValue: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'property_details',
});

PropertyDetails.belongsTo(LoanApplication, { foreignKey: 'applicationId' });
LoanApplication.hasOne(PropertyDetails, { foreignKey: 'applicationId' });

export { PropertyDetails };
