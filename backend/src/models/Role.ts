
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';

class Role extends Model {
    public id!: number;
    public roleName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    tableName: 'roles',
});

export { Role };
