
import { body } from 'express-validator';

export const loanApplicationValidation = [
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
    body('term').isInt({ gt: 0 }).withMessage('Term must be a positive integer'),
    body('interestRate').isFloat({ gt: 0 }).withMessage('Interest rate must be a positive number'),
];
