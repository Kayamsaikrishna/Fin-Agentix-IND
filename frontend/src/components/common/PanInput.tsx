import React from 'react';
import { TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface PanInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    fontFamily: 'monospace',
  },
}));

const PanInput: React.FC<PanInputProps> = ({
  value,
  onChange,
  error,
  disabled,
  required = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const panNumber = e.target.value.toUpperCase();
    if (panNumber.length <= 10) {
      onChange(panNumber);
    }
  };

  const validatePan = (value: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(value);
  };

  const getHelperText = (): string => {
    if (error) return error;
    if (value && !validatePan(value)) return 'Invalid PAN number format';
    return '';
  };

  return (
    <div className="space-y-2">
      <Typography variant="subtitle2" color="textSecondary">
        PAN Number {required && <span className="text-red-500">*</span>}
      </Typography>
      <StyledTextField
        fullWidth
        value={value}
        onChange={handleChange}
        placeholder="ABCDE1234F"
        error={!!error || (!!value && !validatePan(value))}
        helperText={getHelperText()}
        disabled={disabled}
        inputProps={{
          maxLength: 10,
          style: { textTransform: 'uppercase' },
        }}
        className="font-mono"
      />
      <Typography variant="caption" color="textSecondary">
        Enter your 10-character PAN number
      </Typography>
    </div>
  );
};

export default PanInput;
