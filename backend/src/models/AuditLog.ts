
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';

class AuditLog extends Model {
    public id!: number;
    public userId!: number;
    public action!: string;
    public details!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditLog.init({
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
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'audit_logs',
});

AuditLog.belongsTo(User, { foreignKey: 'userId' });

export { AuditLog };
