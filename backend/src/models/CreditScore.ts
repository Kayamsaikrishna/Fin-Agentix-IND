
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';

class CreditScore extends Model {
    public id!: number;
    public userId!: number;
    public score!: number;
    public source!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CreditScore.init({
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
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    source: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'credit_scores',
});

CreditScore.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(CreditScore, { foreignKey: 'userId' });

export { CreditScore };
