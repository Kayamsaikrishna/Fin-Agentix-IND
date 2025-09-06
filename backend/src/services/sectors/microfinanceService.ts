
import { LoanApplication } from '../../models/LoanApplication';

export const getMicrofinanceLoanDetails = (application: LoanApplication, cibilScore: number, riskLevel: string) => {
    return {
        loanType: 'Microfinance',
        amount: application.amount,
        purpose: application.purpose,
        riskAssessment: {
            cibilScore: cibilScore,
            riskLevel: riskLevel,
        },
    };
};
