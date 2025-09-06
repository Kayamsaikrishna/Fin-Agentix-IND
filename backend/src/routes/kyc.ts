
import { Router } from 'express';
import { kycController } from '../controllers/kycController';

const router = Router();

router.post('/initiate', kycController.submitKyc);
router.get('/status', kycController.getStatus);

export default router;
