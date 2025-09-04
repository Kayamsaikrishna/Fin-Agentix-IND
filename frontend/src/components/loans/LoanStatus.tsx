// src/components/loans/LoanStatus.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Divider,
  Grid,
  Box,
  Button,
} from '@mui/material';
import {
  FileCheck,
  FileSearch,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
} from 'lucide-react';

interface LoanStatusStep {
  label: string;
  status: 'completed' | 'current' | 'pending' | 'rejected';
  icon: React.ReactNode;
  date?: string;
  description: string;
  additionalInfo?: string;
}

interface LoanStatusProps {
  loanId: string;
  currentStatus: 'approved' | 'pending' | 'rejected' | 'disbursed';
}

const getStatusIcon = (status: LoanStatusStep['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="text-green-500" size={24} />;
    case 'current':
      return <Clock className="text-blue-500" size={24} />;
    case 'rejected':
      return <XCircle className="text-red-500" size={24} />;
    default:
      return <AlertCircle className="text-gray-300" size={24} />;
  }
};

const LoanStatus: React.FC<LoanStatusProps> = ({ loanId, currentStatus }) => {
  const steps: LoanStatusStep[] = [
    {
      label: 'Application Submitted',
      status: 'completed',
      icon: <FileCheck size={24} />,
      date: '2023-09-01',
      description: 'Your loan application has been received',
      additionalInfo: 'All required documents uploaded successfully',
    },
    {
      label: 'Document Verification',
      status: currentStatus === 'rejected' ? 'rejected' : 'completed',
      icon: <FileSearch size={24} />,
      date: '2023-09-02',
      description: currentStatus === 'rejected'
        ? 'Document verification failed'
        : 'Documents have been verified',
      additionalInfo: currentStatus === 'rejected'
        ? 'Invalid business registration documents'
        : 'KYC and business documents verified',
    },
    {
      label: 'Loan Approval',
      status: 
        currentStatus === 'rejected' ? 'rejected' :
        currentStatus === 'pending' ? 'current' :
        currentStatus === 'approved' || currentStatus === 'disbursed' ? 'completed' : 'pending',
      icon: <CheckCircle size={24} />,
      date: currentStatus === 'approved' || currentStatus === 'disbursed' ? '2023-09-03' : undefined,
      description: 
        currentStatus === 'rejected' ? 'Loan application rejected' :
        currentStatus === 'pending' ? 'Under review by loan officer' :
        'Loan has been approved',
      additionalInfo: currentStatus === 'approved' || currentStatus === 'disbursed'
        ? 'Approved amount: ₹5,00,000'
        : undefined,
    },
    {
      label: 'Disbursement',
      status:
        currentStatus === 'rejected' ? 'rejected' :
        currentStatus === 'disbursed' ? 'completed' : 'pending',
      icon: <CreditCard size={24} />,
      date: currentStatus === 'disbursed' ? '2023-09-04' : undefined,
      description:
        currentStatus === 'disbursed'
          ? 'Loan amount disbursed to your account'
          : 'Waiting for disbursement',
      additionalInfo: currentStatus === 'disbursed'
        ? 'Transaction ID: TXN123456789'
        : undefined,
    },
  ];

  return (
    <Card>
      <CardHeader
        title="Loan Application Status"
        subheader={`Application ID: ${loanId}`}
      />
      <Divider />
      <CardContent>
        <Stepper orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} active={step.status !== 'pending'}>
              <StepLabel
                icon={getStatusIcon(step.status)}
                error={step.status === 'rejected'}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <Typography variant="subtitle1" className="font-semibold">
                      {step.label}
                    </Typography>
                    {step.date && (
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        className="mt-1"
                      >
                        {step.date}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography className="text-gray-700">
                      {step.description}
                    </Typography>
                    {step.additionalInfo && (
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        className="mt-1 block"
                      >
                        {step.additionalInfo}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {currentStatus === 'rejected' && (
          <Box className="mt-6 p-4 bg-red-50 rounded-md">
            <Typography variant="subtitle1" className="text-red-700 font-semibold">
              Application Rejected
            </Typography>
            <Typography className="text-red-600 mt-1">
              Unfortunately, your loan application has been rejected. You can apply again after 30 days.
            </Typography>
            <Button
              variant="outlined"
              color="error"
              className="mt-3"
              startIcon={<FileSearch size={16} />}
            >
              View Detailed Report
            </Button>
          </Box>
        )}

        {currentStatus === 'approved' && (
          <Box className="mt-6 p-4 bg-green-50 rounded-md">
            <Typography variant="subtitle1" className="text-green-700 font-semibold">
              Loan Approved
            </Typography>
            <Typography className="text-green-600 mt-1">
              Your loan has been approved! Please review and accept the loan agreement to proceed with disbursement.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="mt-3"
              startIcon={<FileCheck size={16} />}
            >
              Review & Accept Agreement
            </Button>
          </Box>
        )}

        {currentStatus === 'disbursed' && (
          <Box className="mt-6 p-4 bg-blue-50 rounded-md">
            <Typography variant="subtitle1" className="text-blue-700 font-semibold">
              Loan Disbursed
            </Typography>
            <Typography className="text-blue-600 mt-1">
              The loan amount has been successfully disbursed to your registered bank account.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="mt-3"
              startIcon={<CreditCard size={16} />}
            >
              View Loan Details
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default LoanStatus;
