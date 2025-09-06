
import { LoanApplication } from '../../models/LoanApplication';
import { CibilScore } from '../riskService';

export const getPersonalLoanDetails = (application: LoanApplication, cibilScore: CibilScore) => {
    return {
        loanType: 'Personal',
        amount: application.amount,
        purpose: application.purpose,
        riskAssessment: {
            cibilScore: cibilScore.score,
            riskLevel: cibilScore.riskLevel,
        },
    };
};
