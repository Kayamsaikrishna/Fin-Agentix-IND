
import { LoanApplication } from '../../models/LoanApplication';

export const getRenewableEnergyLoanDetails = (application: LoanApplication, projectDetails: any) => {
    return {
        loanType: 'Renewable Energy',
        amount: application.amount,
        purpose: application.purpose,
        projectDetails: {
            type: projectDetails.type,
            capacity: projectDetails.capacity,
            location: projectDetails.location,
        },
    };
};
