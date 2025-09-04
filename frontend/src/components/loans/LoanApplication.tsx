// src/components/loans/LoanApplication.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import { IndianStateSelect } from '../common/IndianStateSelect';
import AadhaarInput from '../common/AadhaarInput';
import PanInput from '../common/PanInput';
import GstInput from '../common/GstInput';
import BankDetailsInput from '../indian/BankDetailsInput';

interface LoanApplicationFormData {
  loanAmount: number;
  loanPurpose: string;
  tenure: number;
  businessName: string;
  businessType: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessPincode: string;
  gstNumber: string;
  panNumber: string;
  aadhaarNumber: string;
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    accountType: string;
  };
}

const loanPurposes = [
  'Working Capital',
  'Business Expansion',
  'Equipment Purchase',
  'Inventory',
  'Debt Consolidation',
  'Other',
];

const businessTypes = [
  'Sole Proprietorship',
  'Partnership',
  'Private Limited',
  'Public Limited',
  'LLP',
  'OPC',
];

const schema = yup.object().shape({
  loanAmount: yup
    .number()
    .required('Loan amount is required')
    .min(50000, 'Minimum loan amount is ₹50,000')
    .max(10000000, 'Maximum loan amount is ₹1 Crore'),
  loanPurpose: yup.string().required('Loan purpose is required'),
  tenure: yup
    .number()
    .required('Loan tenure is required')
    .min(3, 'Minimum tenure is 3 months')
    .max(60, 'Maximum tenure is 60 months'),
  businessName: yup.string().required('Business name is required'),
  businessType: yup.string().required('Business type is required'),
  businessAddress: yup.string().required('Business address is required'),
  businessCity: yup.string().required('City is required'),
  businessState: yup.string().required('State is required'),
  businessPincode: yup
    .string()
    .matches(/^[1-9][0-9]{5}$/, 'Invalid PIN code')
    .required('PIN code is required'),
  gstNumber: yup.string().required('GST number is required'),
  panNumber: yup.string().required('PAN number is required'),
  aadhaarNumber: yup.string().required('Aadhaar number is required'),
  bankDetails: yup.object().shape({
    accountNumber: yup.string().required('Account number is required'),
    ifscCode: yup
      .string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code')
      .required('IFSC code is required'),
    accountType: yup.string().required('Account type is required'),
  }),
});

const LoanApplication: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoanApplicationFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoanApplicationFormData) => {
    try {
      // TODO: Implement API call to submit loan application
      console.log('Loan application data:', data);
    } catch (error) {
      console.error('Error submitting loan application:', error);
    }
  };

  return (
    <Card>
      <CardHeader
        title="Business Loan Application"
        subheader="Please fill in all the required details"
      />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" className="mb-4">
                Loan Details
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Loan Amount (₹)"
                type="number"
                {...register('loanAmount')}
                error={!!errors.loanAmount}
                helperText={errors.loanAmount?.message}
                InputProps={{
                  startAdornment: <span className="mr-1">₹</span>,
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Loan Purpose"
                {...register('loanPurpose')}
                error={!!errors.loanPurpose}
                helperText={errors.loanPurpose?.message}
              >
                {loanPurposes.map((purpose) => (
                  <MenuItem key={purpose} value={purpose}>
                    {purpose}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Tenure (months)"
                type="number"
                {...register('tenure')}
                error={!!errors.tenure}
                helperText={errors.tenure?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className="mb-4 mt-4">
                Business Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Business Name"
                {...register('businessName')}
                error={!!errors.businessName}
                helperText={errors.businessName?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Business Type"
                {...register('businessType')}
                error={!!errors.businessType}
                helperText={errors.businessType?.message}
              >
                {businessTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Business Address"
                multiline
                rows={3}
                {...register('businessAddress')}
                error={!!errors.businessAddress}
                helperText={errors.businessAddress?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="City"
                {...register('businessCity')}
                error={!!errors.businessCity}
                helperText={errors.businessCity?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="businessState"
                control={control}
                render={({ field }) => (
                  <IndianStateSelect
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    error={!!errors.businessState}
                    helperText={errors.businessState?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="PIN Code"
                {...register('businessPincode')}
                error={!!errors.businessPincode}
                helperText={errors.businessPincode?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className="mb-4 mt-4">
                Verification Documents
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="gstNumber"
                control={control}
                render={({ field }) => (
                  <GstInput
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.gstNumber}
                    helperText={errors.gstNumber?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="panNumber"
                control={control}
                render={({ field }) => (
                  <PanInput
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.panNumber}
                    helperText={errors.panNumber?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="aadhaarNumber"
                control={control}
                render={({ field }) => (
                  <AadhaarInput
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.aadhaarNumber}
                    helperText={errors.aadhaarNumber?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className="mb-4 mt-4">
                Bank Details
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="bankDetails"
                control={control}
                render={({ field }) => (
                  <BankDetailsInput
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.bankDetails}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} className="flex justify-end mt-4">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                className="px-8"
              >
                Submit Application
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoanApplication;
