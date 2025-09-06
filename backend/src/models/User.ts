
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';

class User extends Model {
    public id!: number;
    public email?: string;
    public password?: string;
    public fullName?: string;
    public phoneNumber?: string;
    public dateOfBirth?: Date;
    public isKycVerified?: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    isKycVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    sequelize,
    tableName: 'users',
});

export { User };
