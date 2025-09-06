
import { Router } from 'express';
import {
  applyForLoan,
  getLoanApplication,
  getUserLoanApplications,
  updateLoanStatus,
} from '../controllers/loanController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';

const router = Router();

router.post('/', authMiddleware, applyForLoan);
router.get('/:id', authMiddleware, getLoanApplication);
router.get('/user/:userId', authMiddleware, getUserLoanApplications);
router.put('/:id/status', authMiddleware, roleMiddleware(['admin', 'agent']), updateLoanStatus);

export default router;
