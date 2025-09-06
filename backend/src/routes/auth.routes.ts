
import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { registerValidation, loginValidation } from '../middleware/validation/authValidation';

const authRoutes = Router();

authRoutes.post('/register', registerValidation, register);
authRoutes.post('/login', loginValidation, login);

export { authRoutes };
