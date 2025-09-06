
import { Document } from '../models/Document';
import { LoanApplication } from '../models/LoanApplication';
import { User } from '../models/User';
import { AppError } from '../middleware/errorHandler';

// Mock file upload service
const mockUpload = async (file: any) => {
  const url = `https://mock-storage.com/documents/${Date.now()}-${file.originalname}`;
  console.log(`Mock uploading ${file.originalname} to ${url}`);
  return { url, key: `${Date.now()}-${file.originalname}` };
};

class DocumentService {
  async uploadDocument(applicationId: number, userId: number, file: any) {
    const application = await LoanApplication.findOne({ where: { id: applicationId, userId } });
    if (!application) {
      throw new AppError('Loan application not found or access denied', 404);
    }

    // In a real app, you'd use a service like S3, Google Cloud Storage, etc.
    const { url, key } = await mockUpload(file);

    const document = await Document.create({
      applicationId,
      type: file.mimetype, // Or a more specific type from the request
      url,
      storageKey: key, // For future management (e.g., deletion)
      status: 'Uploaded',
    });

    return document;
  }

  async listDocumentsForApplication(applicationId: number, userId: number) {
    const application = await LoanApplication.findOne({
        where: { id: applicationId, userId },
        include: [Document as any]
    });
    if (!application) {
      throw new AppError('Loan application not found or access denied', 404);
    }
    return (application as any).documents;
  }

  async analyzeDocuments(documents: any) {
    console.log('Analyzing documents...');
    // In a real-world scenario, this would involve using a document analysis service (e.g., OCR, data extraction).
    // For this example, we'll just return a mock analysis.
    const analysis = {
      summary: 'Documents seem to be in order.',
      extractedData: {
        pan: 'ABCDE1234F',
        aadhaar: '1234 5678 9012'
      },
      error: null,
      details: ''
    };
    console.log('Document analysis complete.');
    return analysis;
  }
}

export const documentService = new DocumentService();
