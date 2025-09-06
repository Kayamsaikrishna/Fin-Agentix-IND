
import { LoanApplication } from '../../models/LoanApplication';
import { RtoDetails } from '../property/types';

export const getTwoWheelerLoanDetails = (application: LoanApplication, rtoDetails: RtoDetails) => {
    return {
        loanType: 'Two-Wheeler',
        amount: application.amount,
        purpose: application.purpose,
        vehicleDetails: {
            registration: rtoDetails.registrationNumber,
            owner: rtoDetails.ownerName,
            type: rtoDetails.vehicleType,
        },
    };
};
