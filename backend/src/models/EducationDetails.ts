
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { LoanApplication } from './LoanApplication';

class EducationDetails extends Model {
    public id!: number;
    public applicationId!: number;
    public highestQualification!: string;
    public university!: string;
    public graduationYear!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

EducationDetails.init({
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
    highestQualification: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    university: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    graduationYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'education_details',
});

EducationDetails.belongsTo(LoanApplication, { foreignKey: 'applicationId' });
LoanApplication.hasOne(EducationDetails, { foreignKey: 'applicationId' });

export { EducationDetails };
