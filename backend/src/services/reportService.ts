
import { LoanApplication } from '../models/LoanApplication';
import { User } from '../models/User';
import { Op } from 'sequelize';

// Mock Report Generation (e.g., to PDF or CSV)
const generateCsv = (data: any[], columns: string[]) => {
  const header = columns.join(',') + '\n';
  const rows = data.map(row => {
    return columns.map(col => {
      let val = row[col];
      if (val === null || val === undefined) val = ''
      if (typeof val === 'string') val = `"${val.replace(/"/g, '""')}"` // Escape quotes
      return val;
    }).join(',');
  }).join('\n');
  return header + rows;
}

class ReportService {
  async generateLoanActivityReport(startDate: Date, endDate: Date) {
    const applications = await LoanApplication.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [User as any],
      order: [['createdAt', 'ASC']],
    });

    const reportData = applications.map(app => ({
      applicationId: app.id,
      customerName: app.user.fullName,
      customerEmail: app.user.email,
      amount: app.amount,
      status: app.status,
      submittedDate: app.createdAt.toISOString().split('T')[0],
    }));

    const columns = ['applicationId', 'customerName', 'customerEmail', 'amount', 'status', 'submittedDate'];
    const csvContent = generateCsv(reportData, columns);

    return { 
        filename: `loan_activity_${startDate.toISOString().split('T')[0]}_to_${endDate.toISOString().split('T')[0]}.csv`,
        mimeType: 'text/csv',
        content: csvContent 
    };
  }

}

export const reportService = new ReportService();
