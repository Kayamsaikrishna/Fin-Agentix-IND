
import { AppError } from '../../middleware/errorHandler';

/**
 * Represents a document fetched from DigiLocker.
 */
export interface DigiLockerDocument {
  name: string;
  type: 'PAN' | 'Aadhaar' | 'Driving License' | 'Marksheet';
  issuer: string;
  issuedDate: string;
  documentUrl: string; // A URL to a mock document
}

/**
 * Mock service for DigiLocker integration.
 */
class DigilockerService {
  /**
   * Simulates fetching documents from a user's DigiLocker account after they authorize.
   * @param consentId - A unique ID generated when the user gives consent.
   * @returns A Promise that resolves to an array of DigiLockerDocuments.
   */
  async getDocuments(consentId: string): Promise<DigiLockerDocument[]> {
    console.log(`[Mock DigilockerService] Fetching documents for consent ID: ${consentId}`);

    if (!consentId) {
      throw new AppError('User consent is required.', 403);
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1800));

    const documents: DigiLockerDocument[] = [
      {
        name: 'PAN Card',
        type: 'PAN',
        issuer: 'Income Tax Department',
        issuedDate: '2010-05-20',
        documentUrl: 'https://mock-storage.com/documents/pan-card.pdf',
      },
      {
        name: 'Aadhaar Card',
        type: 'Aadhaar',
        issuer: 'UIDAI',
        issuedDate: '2015-01-15',
        documentUrl: 'https://mock-storage.com/documents/aadhaar-card.pdf',
      },
    ];

    console.log(`[Mock DigilockerService] Found ${documents.length} documents.`);
    return documents;
  }
}

export const digilockerService = new DigilockerService();
