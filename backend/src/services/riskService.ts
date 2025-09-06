
import { LoanApplication } from '../models/LoanApplication';
import { User } from '../models/User';
import { AppError } from '../middleware/errorHandler';

// Mock external credit score service
const getCreditScore = async (userId: number): Promise<number> => {
    // This would be an API call to a credit bureau like Experian, Equifax, etc.
    console.log(`Fetching credit score for user ${userId}`);
    // Return a random score between 300 and 850
    return Math.floor(Math.random() * (850 - 300 + 1)) + 300;
}

class RiskService {

  async assessApplicationRisk(applicationId: number) {
    const application = await LoanApplication.findByPk(applicationId, { include: [User as any]});
    if (!application) {
      throw new AppError('Loan application not found', 404);
    }

    const user = application.user;
    const creditScore = await getCreditScore(user.id);

    let riskLevel = 'Low';
    let riskScore = 0;

    // Basic risk scoring logic
    if (creditScore < 580) {
        riskLevel = 'High';
        riskScore += 50; // High weight for poor credit
    } else if (creditScore < 670) {
        riskLevel = 'Medium';
        riskScore += 20;
    }

    // Higher amount = higher risk
    if (application.amount > 50000) {
        riskScore += 20;
    } else if (application.amount > 10000) {
        riskScore += 10;
    }

    // Shorter term can sometimes be less risky, but let's penalize very short terms (could indicate desperation)
    if (application.term < 12) {
        riskScore += 5;
    }

    // Adjust risk level based on final score
    if (riskScore > 60) riskLevel = 'High';
    else if (riskScore > 30) riskLevel = 'Medium';

    const assessment = {
        applicationId,
        creditScore,
        calculatedRiskScore: riskScore,
        riskLevel,
        summary: `Based on a credit score of ${creditScore} and loan amount of ${application.amount}, the assessed risk is ${riskLevel}.`
    }

    // In a real app, you might save this assessment to a database table
    console.log('Risk Assessment Completed:', assessment);

    return assessment;
  }
}

export const riskService = new RiskService();
