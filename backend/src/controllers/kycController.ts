
import { Request, Response } from 'express';
import {
  createKYCVerification,
  getKYCVerificationByUserId,
  updateKYCVerificationStatus,
} from '../services/kycService';

export const submitKYC = async (req: Request, res: Response) => {
  try {
    const kycVerification = await createKYCVerification(req.body);
    res.status(201).json({ message: 'KYC submitted successfully', kycVerification });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting KYC', error });
  }
};

export const getKYCStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const kycVerification = await getKYCVerificationByUserId(Number(userId));
    if (kycVerification) {
      res.json(kycVerification);
    } else {
      res.status(404).json({ message: 'KYC not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving KYC status', error });
  }
};

export const updateKYCStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    const kycVerification = await updateKYCVerificationStatus(Number(userId), status);
    if (kycVerification) {
      res.json({ message: 'KYC status updated successfully', kycVerification });
    } else {
      res.status(404).json({ message: 'KYC not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating KYC status', error });
  }
};
