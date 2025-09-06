
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { LoanApplication } from './LoanApplication';

class GoldLoanDetails extends Model {
    public id!: number;
    public applicationId!: number;
    public goldWeightInGrams!: number;
    public goldPurityInCarats!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

GoldLoanDetails.init({
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
    goldWeightInGrams: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    goldPurityInCarats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'gold_loan_details',
});

GoldLoanDetails.belongsTo(LoanApplication, { foreignKey: 'applicationId' });
LoanApplication.hasOne(GoldLoanDetails, { foreignKey: 'applicationId' });

export { GoldLoanDetails };
