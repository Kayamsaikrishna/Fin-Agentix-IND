
import { LoanApplication } from '../../models/LoanApplication';
import { RtoDetails } from '../property/types';

export const getAutoLoanDetails = (application: LoanApplication, rtoDetails: RtoDetails) => {
    return {
        loanType: 'Auto',
        amount: application.amount,
        purpose: application.purpose,
        vehicleDetails: {
            registration: rtoDetails.registrationNumber,
            owner: rtoDetails.ownerName,
            type: rtoDetails.vehicleType,
        },
    };
};
