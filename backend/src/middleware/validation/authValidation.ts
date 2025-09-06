
import { body } from 'express-validator';

export const registerValidation = [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const loginValidation = [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').not().isEmpty().withMessage('Password is required'),
];
