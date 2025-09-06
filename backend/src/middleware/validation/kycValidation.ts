
import { body } from 'express-validator';

export const kycValidation = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('dateOfBirth').isISO8601().toDate().withMessage('Invalid date of birth'),
    body('address').notEmpty().withMessage('Address is required'),
    body('idType').notEmpty().withMessage('ID type is required'),
    body('idNumber').notEmpty().withMessage('ID number is required'),
];
