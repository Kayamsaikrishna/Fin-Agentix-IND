import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Input from '../common/Input';

interface BankDetailsInputProps {
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
  accountHolderName: string;
  onAccountNumberChange: (value: string) => void;
  onConfirmAccountNumberChange: (value: string) => void;
  onIfscCodeChange: (value: string) => void;
  onBankNameChange: (value: string) => void;
  onBranchNameChange: (value: string) => void;
  onAccountHolderNameChange: (value: string) => void;
  errors?: {
    accountNumber?: string;
    confirmAccountNumber?: string;
    ifscCode?: string;
    bankName?: string;
    branchName?: string;
    accountHolderName?: string;
  };
  disabled?: boolean;
}

const BankDetailsInput: React.FC<BankDetailsInputProps> = ({
  accountNumber,
  confirmAccountNumber,
  ifscCode,
  bankName,
  branchName,
  accountHolderName,
  onAccountNumberChange,
  onConfirmAccountNumberChange,
  onIfscCodeChange,
  onBankNameChange,
  onBranchNameChange,
  onAccountHolderNameChange,
  errors = {},
  disabled = false,
}) => {
  const [loading, setLoading] = useState(false);

  const handleIfscBlur = async () => {
    if (ifscCode.length === 11) {
      setLoading(true);
      try {
        // TODO: Implement IFSC code lookup service
        // const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);
        // const data = await response.json();
        // onBankNameChange(data.BANK);
        // onBranchNameChange(data.BRANCH);
      } catch (error) {
        console.error('Error fetching IFSC details:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Input
          label="Account Number"
          value={accountNumber}
          onChange={(e) => onAccountNumberChange(e.target.value)}
          error={errors.accountNumber}
          required
          disabled={disabled}
          type="password"
          placeholder="Enter bank account number"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Confirm Account Number"
          value={confirmAccountNumber}
          onChange={(e) => onConfirmAccountNumberChange(e.target.value)}
          error={errors.confirmAccountNumber}
          required
          disabled={disabled}
          placeholder="Re-enter bank account number"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="IFSC Code"
          value={ifscCode}
          onChange={(e) => onIfscCodeChange(e.target.value.toUpperCase())}
          error={errors.ifscCode}
          required
          disabled={disabled || loading}
          onBlur={handleIfscBlur}
          placeholder="Enter IFSC code"
          inputProps={{
            maxLength: 11,
            style: { textTransform: 'uppercase' },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Bank Name"
          value={bankName}
          onChange={(e) => onBankNameChange(e.target.value)}
          error={errors.bankName}
          required
          disabled={true}
          placeholder="Bank name will auto-fill"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Branch Name"
          value={branchName}
          onChange={(e) => onBranchNameChange(e.target.value)}
          error={errors.branchName}
          required
          disabled={true}
          placeholder="Branch name will auto-fill"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Account Holder Name"
          value={accountHolderName}
          onChange={(e) => onAccountHolderNameChange(e.target.value)}
          error={errors.accountHolderName}
          required
          disabled={disabled}
          placeholder="Enter account holder name"
        />
      </Grid>
    </Grid>
  );
};

export default BankDetailsInput;
