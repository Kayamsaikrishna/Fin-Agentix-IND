
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { LoanApplication } from './LoanApplication';

class RiskAssessment extends Model {
    public id!: number;
    public applicationId!: number;
    public riskScore!: number;
    public riskLevel!: string;
    public assessmentDate!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RiskAssessment.init({
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
    riskScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    riskLevel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    assessmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'risk_assessments',
});

RiskAssessment.belongsTo(LoanApplication, { foreignKey: 'applicationId' });
LoanApplication.hasOne(RiskAssessment, { foreignKey: 'applicationId' });

export { RiskAssessment };
