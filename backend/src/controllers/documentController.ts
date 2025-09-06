
import { Request, Response, NextFunction } from 'express';
import { documentService } from '../services/documentService';
import { AppError } from '../middleware/errorHandler';

class DocumentController {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const { applicationId } = req.params;
      const userId = (req as any).user.id;
      const file = req.file;

      if (!file) {
        throw new AppError('No file uploaded', 400);
      }

      const document = await documentService.uploadDocument(parseInt(applicationId), userId, file);
      res.status(201).json({ message: 'Document uploaded successfully', document });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { applicationId } = req.params;
      const userId = (req as any).user.id;
      const documents = await documentService.listDocumentsForApplication(parseInt(applicationId), userId);
      res.status(200).json(documents);
    } catch (error) {
      next(error);
    }
  }
}

export const documentController = new DocumentController();
