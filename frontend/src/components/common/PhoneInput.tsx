import React from 'react';
import { TextField, Typography, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    letterSpacing: '0.1em',
    fontFamily: 'monospace',
  },
}));

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  error,
  disabled,
  required = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value.replace(/\D/g, '');
    if (phoneNumber.length <= 10) {
      onChange(phoneNumber);
    }
  };

  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(value);
  };

  const getHelperText = (): string => {
    if (error) return error;
    if (value && !validatePhone(value)) return 'Invalid mobile number';
    return '';
  };

  return (
    <div className="space-y-2">
      <Typography variant="subtitle2" color="textSecondary">
        Mobile Number {required && <span className="text-red-500">*</span>}
      </Typography>
      <StyledTextField
        fullWidth
        value={value}
        onChange={handleChange}
        error={!!error || (!!value && !validatePhone(value))}
        helperText={getHelperText()}
        disabled={disabled}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">+91</InputAdornment>
          ),
        }}
        inputProps={{
          maxLength: 10,
          pattern: '[0-9]*',
          inputMode: 'numeric',
        }}
        placeholder="Enter 10-digit mobile number"
      />
      <Typography variant="caption" color="textSecondary">
        Enter your 10-digit Indian mobile number
      </Typography>
    </div>
  );
};

export default PhoneInput;
