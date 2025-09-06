
import { Router } from 'express';
import {
  submitKYC,
  getKYCStatus,
  updateKYCStatus,
} from '../controllers/kycController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { validate }. from '../middleware/validation';
import { kycVerificationRules } from '../utils/validationRules';

const router = Router();

router.post('/', authMiddleware, kycVerificationRules, validate, submitKYC);
router.get('/:userId', authMiddleware, getKYCStatus);
router.put('/:userId/status', authMiddleware, roleMiddleware(['admin', 'agent']), updateKYCStatus);

export default router;
