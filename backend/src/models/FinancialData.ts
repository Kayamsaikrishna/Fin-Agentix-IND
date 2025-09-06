
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';

class FinancialData extends Model {
    public id!: number;
    public userId!: number;
    public income!: number;
    public expenses!: number;
    public assets!: number;
    public liabilities!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

FinancialData.init({
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
    income: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    expenses: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    assets: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    liabilities: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'financial_data',
});

FinancialData.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(FinancialData, { foreignKey: 'userId' });

export { FinancialData };
