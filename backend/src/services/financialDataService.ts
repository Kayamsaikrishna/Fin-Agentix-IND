
class FinancialDataService {
  async getFinancialData(applicantId: string): Promise<any> {
    console.log(`Fetching financial data for applicant ${applicantId}`);
    
    // In a real-world scenario, this would connect to a service like Plaid or a bank's API.
    // For this example, we'll return some mock financial data.
    const financialData = {
      bankStatements: [
        { month: 'Jan', income: 5000, expenses: 4500 },
        { month: 'Feb', income: 5100, expenses: 4600 },
        { month: 'Mar', income: 5200, expenses: 4700 },
      ],
      assets: [{ type: 'Savings', value: 10000 }],
      liabilities: [{ type: 'Credit Card', value: 2000 }],
    };

    console.log(`Financial data for applicant ${applicantId} fetched successfully`);
    return financialData;
  }

  async analyzeFinancials(financialData: any): Promise<any> {
    console.log('Analyzing financial data...');

    const totalIncome = financialData.bankStatements.reduce((acc: number, month: any) => acc + month.income, 0);
    const totalExpenses = financialData.bankStatements.reduce((acc: number, month: any) => acc + month.expenses, 0);
    const savings = totalIncome - totalExpenses;
    const debtToIncomeRatio = totalExpenses / totalIncome;

    const analysis = {
      totalIncome,
      totalExpenses,
      savings,
      debtToIncomeRatio,
      isStable: savings > 0 && debtToIncomeRatio < 0.5, // Example stability rule
    };

    console.log('Financial analysis completed');
    return analysis;
  }
}

export const financialDataService = new FinancialDataService();
