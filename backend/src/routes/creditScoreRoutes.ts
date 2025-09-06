
import { Router } from 'express';
import { creditScoreController } from '../controllers/creditScoreController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Route to get combined credit scores from all bureaus
// This is a sensitive endpoint and should be protected.
router.get('/combined', authMiddleware, creditScoreController.getCombinedCreditScores);

export default router;
