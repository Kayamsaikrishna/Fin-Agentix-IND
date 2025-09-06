
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { LoanApplication } from './LoanApplication';

class Decision extends Model {
    public id!: number;
    public applicationId!: number;
    public isApproved!: boolean;
    public approvedAmount!: number;
    public interestRate!: number;
    public termInMonths!: number;
    public decisionDate!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Decision.init({
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
    isApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    approvedAmount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
    },
    interestRate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    termInMonths: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    decisionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'decisions',
});

Decision.belongsTo(LoanApplication, { foreignKey: 'applicationId' });
LoanApplication.hasOne(Decision, { foreignKey: 'applicationId' });

export { Decision };
