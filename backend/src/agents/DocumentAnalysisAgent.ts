
import { documentService } from '../services/documentService';

class DocumentAnalysisAgent {
  async run(applicationData: any) {
    console.log(`Running document analysis for application ${applicationData.applicationId}`);

    try {
      const documents = await documentService.listDocumentsForApplication(applicationData.applicationId, applicationData.userId);
      const analysisResults = await documentService.analyzeDocuments(documents);

      if (analysisResults.error) {
        console.error('Document analysis failed', analysisResults.details);
        return { ...applicationData, error: 'Document analysis failed', details: analysisResults.details };
      }

      console.log('Document analysis successful');
      return { ...applicationData, documentAnalysis: analysisResults };
    } catch (error: any) {
      console.error('Error in DocumentAnalysisAgent:', error.message);
      return { ...applicationData, error: 'Error in document analysis agent' };
    }
  }
}

export const documentAnalysisAgent = new DocumentAnalysisAgent();
