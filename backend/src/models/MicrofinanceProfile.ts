
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from './User';

class MicrofinanceProfile extends Model {
    public id!: number;
    public userId!: number;
    public groupName!: string;
    public groupMeetingDay!: string;
    public loanCycle!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MicrofinanceProfile.init({
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
    groupName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    groupMeetingDay: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    loanCycle: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize,
    tableName: 'microfinance_profiles',
});

MicrofinanceProfile.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(MicrofinanceProfile, { foreignKey: 'userId' });

export { MicrofinanceProfile };
