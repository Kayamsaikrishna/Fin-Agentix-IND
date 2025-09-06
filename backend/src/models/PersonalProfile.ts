
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';

class PersonalProfile extends Model {
    public id!: number;
    public userId!: number;
    public firstName!: string;
    public lastName!: string;
    public dateOfBirth!: Date;
    public address!: string;
    public phoneNumber!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PersonalProfile.init({
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
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'personal_profiles',
});

PersonalProfile.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(PersonalProfile, { foreignKey: 'userId' });

export { PersonalProfile };
