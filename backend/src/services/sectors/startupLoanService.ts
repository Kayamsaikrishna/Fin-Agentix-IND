
import { LoanApplication } from '../../models/LoanApplication';

export const getStartupLoanDetails = (application: LoanApplication, businessPlan: any) => {
    return {
        loanType: 'Startup',
        amount: application.amount,
        purpose: application.purpose,
        businessPlan: {
            summary: businessPlan.summary,
            marketAnalysis: businessPlan.marketAnalysis,
        },
    };
};
