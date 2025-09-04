// src/components/loans/LoanDetails.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Divider,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Download,
  Eye,
  IndianRupee,
  Calendar,
  Building2,
  CreditCard,
} from 'lucide-react';

interface LoanDetails {
  loanId: string;
  status: 'approved' | 'pending' | 'disbursed' | 'rejected';
  amount: number;
  tenure: number;
  interestRate: number;
  emi: number;
  purpose: string;
  disbursementDate?: string;
  nextPaymentDate?: string;
  totalPaid: number;
  remainingAmount: number;
  businessName: string;
  documents: Array<{
    name: string;
    type: string;
    uploadDate: string;
  }>;
  repaymentSchedule: Array<{
    installmentNo: number;
    dueDate: string;
    amount: number;
    principal: number;
    interest: number;
    status: 'paid' | 'pending' | 'overdue';
  }>;
}

const sampleLoanDetails: LoanDetails = {
  loanId: 'LOAN2023091234',
  status: 'disbursed',
  amount: 500000,
  tenure: 12,
  interestRate: 14,
  emi: 45834,
  purpose: 'Working Capital',
  disbursementDate: '2023-09-01',
  nextPaymentDate: '2023-10-01',
  totalPaid: 45834,
  remainingAmount: 454166,
  businessName: 'ABC Enterprises',
  documents: [
    {
      name: 'Business PAN Card',
      type: 'PAN',
      uploadDate: '2023-08-15',
    },
    {
      name: 'GST Registration',
      type: 'GST',
      uploadDate: '2023-08-15',
    },
    {
      name: 'Bank Statements',
      type: 'BANK',
      uploadDate: '2023-08-15',
    },
  ],
  repaymentSchedule: [
    {
      installmentNo: 1,
      dueDate: '2023-10-01',
      amount: 45834,
      principal: 39167,
      interest: 6667,
      status: 'paid',
    },
    {
      installmentNo: 2,
      dueDate: '2023-11-01',
      amount: 45834,
      principal: 39688,
      interest: 6146,
      status: 'pending',
    },
    // Additional installments would follow...
  ],
};

const getStatusColor = (status: string) => {
  const colors = {
    approved: 'success',
    pending: 'warning',
    disbursed: 'info',
    rejected: 'error',
    paid: 'success',
    overdue: 'error',
  } as const;
  return colors[status as keyof typeof colors] || 'default';
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

const LoanDetails: React.FC = () => {
  const loan = sampleLoanDetails; // This would come from an API in a real application

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title={
            <div className="flex justify-between items-center">
              <Typography variant="h6">Loan Details</Typography>
              <Chip
                label={loan.status.toUpperCase()}
                color={getStatusColor(loan.status)}
              />
            </div>
          }
          subheader={`Loan ID: ${loan.loanId}`}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <div className="flex flex-col">
                <Typography color="textSecondary" gutterBottom>
                  Loan Amount
                </Typography>
                <Typography variant="h6" className="flex items-center">
                  <IndianRupee size={20} className="mr-1" />
                  {formatCurrency(loan.amount)}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={3}>
              <div className="flex flex-col">
                <Typography color="textSecondary" gutterBottom>
                  Monthly EMI
                </Typography>
                <Typography variant="h6" className="flex items-center">
                  <CreditCard size={20} className="mr-1" />
                  {formatCurrency(loan.emi)}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={3}>
              <div className="flex flex-col">
                <Typography color="textSecondary" gutterBottom>
                  Tenure
                </Typography>
                <Typography variant="h6" className="flex items-center">
                  <Calendar size={20} className="mr-1" />
                  {loan.tenure} months
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={3}>
              <div className="flex flex-col">
                <Typography color="textSecondary" gutterBottom>
                  Interest Rate
                </Typography>
                <Typography variant="h6">
                  {loan.interestRate}% per annum
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className="flex flex-col">
                <Typography color="textSecondary" gutterBottom>
                  Business Name
                </Typography>
                <Typography variant="h6" className="flex items-center">
                  <Building2 size={20} className="mr-1" />
                  {loan.businessName}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={3}>
              <div className="flex flex-col">
                <Typography color="textSecondary" gutterBottom>
                  Disbursement Date
                </Typography>
                <Typography variant="h6">
                  {loan.disbursementDate || 'N/A'}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={3}>
              <div className="flex flex-col">
                <Typography color="textSecondary" gutterBottom>
                  Next Payment Date
                </Typography>
                <Typography variant="h6">
                  {loan.nextPaymentDate || 'N/A'}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Documents" />
        <Divider />
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Document Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Upload Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loan.documents.map((doc) => (
                  <TableRow key={doc.name}>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.uploadDate}</TableCell>
                    <TableCell align="right">
                      <Button
                        startIcon={<Eye size={16} />}
                        size="small"
                        className="mr-2"
                      >
                        View
                      </Button>
                      <Button
                        startIcon={<Download size={16} />}
                        size="small"
                      >
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Repayment Schedule" />
        <Divider />
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Installment No.</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell align="right">Principal</TableCell>
                  <TableCell align="right">Interest</TableCell>
                  <TableCell align="right">Total Amount</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loan.repaymentSchedule.map((installment) => (
                  <TableRow key={installment.installmentNo}>
                    <TableCell>{installment.installmentNo}</TableCell>
                    <TableCell>{installment.dueDate}</TableCell>
                    <TableCell align="right">
                      {formatCurrency(installment.principal)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(installment.interest)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(installment.amount)}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={installment.status.toUpperCase()}
                        color={getStatusColor(installment.status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanDetails;
