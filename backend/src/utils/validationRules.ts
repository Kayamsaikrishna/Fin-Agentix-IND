
import { body, param, query } from 'express-validator';

export const registrationRules = [
  body('email').isEmail().withMessage('Please enter a valid email address.'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
  body('firstName').notEmpty().withMessage('First name is required.'),
  body('lastName').notEmpty().withMessage('Last name is required.'),
];

export const loginRules = [
  body('email').isEmail().withMessage('Please enter a valid email address.'),
  body('password').notEmpty().withMessage('Password is required.'),
];

export const loanApplicationRules = [
    body('loanType').notEmpty().withMessage('Loan type is required.'),
    body('amount').isFloat({ gt: 0 }).withMessage('Loan amount must be a positive number.'),
    body('tenure').isInt({ gt: 0 }).withMessage('Loan tenure must be a positive integer.'),
    body('purpose').notEmpty().withMessage('Loan purpose is required.'),
];

export const kycVerificationRules = [
    body('pan').notEmpty().withMessage('PAN is required.'),
    body('aadhaar').notEmpty().withMessage('Aadhaar is required.'),
];
