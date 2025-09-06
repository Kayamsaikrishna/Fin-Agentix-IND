
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';

class CreditCardApplication extends Model {
    public id!: number;
    public userId!: number;
    public cardType!: string;
    public creditLimit!: number;
    public status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CreditCardApplication.init({
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
    cardType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creditLimit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDING',
    },
}, {
    sequelize,
    tableName: 'credit_card_applications',
});

CreditCardApplication.belongsTo(User, { foreignKey: 'userId' });

export { CreditCardApplication };
