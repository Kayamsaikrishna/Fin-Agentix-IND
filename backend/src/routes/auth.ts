
import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validate } from '../middleware/validation';
import { registrationRules, loginRules } from '../utils/validationRules';

const router = Router();

router.post('/register', registrationRules, validate, register);
router.post('/login', loginRules, validate, login);

export default router;
