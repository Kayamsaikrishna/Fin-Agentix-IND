
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';
import { Role } from './Role';

class UserRole extends Model {
    public userId!: number;
    public roleId!: number;
}

UserRole.init({
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        primaryKey: true,
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        },
        primaryKey: true,
    },
}, {
    sequelize,
    tableName: 'user_roles',
});

export { UserRole };
