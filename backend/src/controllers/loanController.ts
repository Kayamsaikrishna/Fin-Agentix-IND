
import { Request, Response } from 'express';
import {
  createLoanApplication,
  getLoanApplicationById,
  getLoanApplicationsByUserId,
  updateLoanApplicationStatus,
} from '../services/loanService';

export const applyForLoan = async (req: Request, res: Response) => {
  try {
    const loanApplication = await createLoanApplication(req.body);
    res.status(201).json({ message: 'Loan application submitted successfully', loanApplication });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting loan application', error });
  }
};

export const getLoanApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const loanApplication = await getLoanApplicationById(Number(id));
    if (loanApplication) {
      res.json(loanApplication);
    } else {
      res.status(404).json({ message: 'Loan application not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving loan application', error });
  }
};

export const getUserLoanApplications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const loanApplications = await getLoanApplicationsByUserId(Number(userId));
    res.json(loanApplications);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving loan applications', error });
  }
};

export const updateLoanStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const loanApplication = await updateLoanApplicationStatus(Number(id), status);
    if (loanApplication) {
      res.json({ message: 'Loan status updated successfully', loanApplication });
    } else {
      res.status(404).json({ message: 'Loan application not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating loan status', error });
  }
};
