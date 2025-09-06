
import { LoanApplication } from '../models/LoanApplication';
import { User } from '../models/User';

export const createLoanApplication = async (loanData: any): Promise<any> => {
  const loanApplication = await LoanApplication.create(loanData);
  return loanApplication;
};

export const getLoanApplicationById = async (id: number): Promise<any> => {
  const loanApplication = await LoanApplication.findByPk(id, {
    include: [User],
  });
  return loanApplication;
};

export const getLoanApplicationsByUserId = async (userId: number): Promise<any> => {
  const loanApplications = await LoanApplication.findAll({ where: { userId } });
  return loanApplications;
};

export const updateLoanApplicationStatus = async (id: number, status: string): Promise<any> => {
  const loanApplication = await LoanApplication.findByPk(id);
  if (loanApplication) {
    loanApplication.status = status;
    await loanApplication.save();
  }
  return loanApplication;
};
