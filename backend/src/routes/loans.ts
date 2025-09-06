
import { Router } from 'express';
import { loanApplicationController } from '../controllers/loanApplicationController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// @route   POST api/v1/loans/apply
// @desc    Apply for a new loan
// @access  Private
router.post('/apply', authMiddleware, loanApplicationController.submitApplication);

// @route   GET api/v1/loans/:id
// @desc    Get loan application status
// @access  Private
router.get('/:id/status', authMiddleware, loanApplicationController.getApplicationStatus);

router.post('/:id/documents', authMiddleware, loanApplicationController.uploadDocument);

export default router;
