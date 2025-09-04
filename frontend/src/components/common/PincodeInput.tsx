import React from 'react';
import { TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface PincodeInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onBlur?: () => void;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    letterSpacing: '0.2em',
    fontFamily: 'monospace',
  },
}));

const PincodeInput: React.FC<PincodeInputProps> = ({
  value,
  onChange,
  error,
  disabled,
  required = false,
  onBlur,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pincode = e.target.value.replace(/\D/g, '');
    if (pincode.length <= 6) {
      onChange(pincode);
    }
  };

  const validatePincode = (value: string): boolean => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(value);
  };

  const getHelperText = (): string => {
    if (error) return error;
    if (value && !validatePincode(value)) return 'Invalid pincode';
    return '';
  };

  return (
    <div className="space-y-2">
      <Typography variant="subtitle2" color="textSecondary">
        Pincode {required && <span className="text-red-500">*</span>}
      </Typography>
      <StyledTextField
        fullWidth
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        error={!!error || (!!value && !validatePincode(value))}
        helperText={getHelperText()}
        disabled={disabled}
        inputProps={{
          maxLength: 6,
          pattern: '[0-9]*',
          inputMode: 'numeric',
        }}
        placeholder="Enter 6-digit pincode"
      />
      <Typography variant="caption" color="textSecondary">
        Enter your 6-digit Indian postal code
      </Typography>
    </div>
  );
};

export default PincodeInput;
