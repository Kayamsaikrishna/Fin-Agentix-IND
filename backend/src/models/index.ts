
import { sequelize } from '../database/connection';
import { User } from './User';
import { Role } from './Role';
import { UserRole } from './UserRole';
import { LoanApplication } from './LoanApplication';
import { Document } from './Document';
import { CreditScore } from './CreditScore';
import { FinancialData } from './FinancialData';
import { BusinessProfile } from './BusinessProfile';
import { PersonalProfile } from './PersonalProfile';
import { RiskAssessment } from './RiskAssessment';
import { Decision } from './Decision';
import { AuditLog } from './AuditLog';
import { KYCVerification } from './KYCVerification';
import { MicrofinanceProfile } from './MicrofinanceProfile';
import { GoldLoanDetails } from './GoldLoanDetails';
import { VehicleDetails } from './VehicleDetails';
import { PropertyDetails } from './PropertyDetails';
import { EducationDetails } from './EducationDetails';
import { AgriculturalDetails } from './AgriculturalDetails';
import { HealthcareDetails } from './HealthcareDetails';

// Associations
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });

LoanApplication.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(LoanApplication, { foreignKey: 'userId' });

Document.belongsTo(User, { foreignKey: 'userId' });
Document.belongsTo(LoanApplication, { foreignKey: 'applicationId' });
User.hasMany(Document, { foreignKey: 'userId' });
LoanApplication.hasMany(Document, { foreignKey: 'applicationId' });

// ... other associations

const db = {
    sequelize,
    User,
    Role,
    UserRole,
    LoanApplication,
    Document,
    CreditScore,
    FinancialData,
    BusinessProfile,
    PersonalProfile,
    RiskAssessment,
    Decision,
    AuditLog,
    KYCVerification,
    MicrofinanceProfile,
    GoldLoanDetails,
    VehicleDetails,
    PropertyDetails,
    EducationDetails,
    AgriculturalDetails,
    HealthcareDetails
};

export default db;
