
// src/config/compliance.ts

export const complianceRules = {
  MAX_LOAN_AMOUNT: 500000,
  MIN_CREDIT_SCORE: 650,
  // More rules can be added here, for example, based on location, income, etc.
  BLOCKED_REGIONS: ['Region X', 'Region Y'],
};

export const validateCompliance = (applicationData: any) => {
  const { loanAmount, creditScore, personalInfo } = applicationData;
  const errors: string[] = [];

  if (loanAmount > complianceRules.MAX_LOAN_AMOUNT) {
    errors.push(`Loan amount exceeds the maximum limit of ${complianceRules.MAX_LOAN_AMOUNT}`);
  }

  if (creditScore < complianceRules.MIN_CREDIT_SCORE) {
    errors.push(`Credit score is below the minimum requirement of ${complianceRules.MIN_CREDIT_SCORE}`);
  }

  if (complianceRules.BLOCKED_REGIONS.includes(personalInfo?.region)) {
    errors.push(`Applications from ${personalInfo.region} are not accepted at this time.`);
  }

  return { isCompliant: errors.length === 0, errors };
};
