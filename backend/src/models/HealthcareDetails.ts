
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { LoanApplication } from './LoanApplication';

class HealthcareDetails extends Model {
    public id!: number;
    public applicationId!: number;
    public hospitalName!: string;
    public doctorName!: string;
    public medicalCondition!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

HealthcareDetails.init({
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
    hospitalName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    doctorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    medicalCondition: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'healthcare_details',
});

HealthcareDetails.belongsTo(LoanApplication, { foreignKey: 'applicationId' });
LoanApplication.hasOne(HealthcareDetails, { foreignKey: 'applicationId' });

export { HealthcareDetails };
