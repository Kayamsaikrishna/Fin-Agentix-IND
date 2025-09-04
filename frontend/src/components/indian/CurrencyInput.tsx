import React from 'react';
import { TextField, Typography, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  maxValue?: number;
  minValue?: number;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    textAlign: 'right',
  },
}));

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  label,
  error,
  disabled = false,
  required = false,
  maxValue,
  minValue,
}) => {
  const formatCurrency = (value: string): string => {
    // Remove any non-digit characters except decimal point
    const cleaned = value.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts[1]?.length > 2) {
      parts[1] = parts[1].slice(0, 2);
    }
    const formatted = parts.slice(0, 2).join('.');

    // Add commas for thousands
    const [whole, decimal] = formatted.split('.');
    const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return decimal ? `${withCommas}.${decimal}` : withCommas;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    const numValue = parseFloat(rawValue);

    if (rawValue === '' || isNaN(numValue)) {
      onChange('');
      return;
    }

    if (maxValue !== undefined && numValue > maxValue) {
      return;
    }

    if (minValue !== undefined && numValue < minValue) {
      return;
    }

    onChange(rawValue);
  };

  const getHelperText = (): string => {
    if (error) return error;
    if (maxValue !== undefined && parseFloat(value) > maxValue) {
      return `Maximum value allowed is ₹${formatCurrency(maxValue.toString())}`;
    }
    if (minValue !== undefined && parseFloat(value) > minValue) {
      return `Minimum value allowed is ₹${formatCurrency(minValue.toString())}`;
    }
    return '';
  };

  return (
    <div className="space-y-2">
      {label && (
        <Typography variant="subtitle2" color="textSecondary">
          {label} {required && <span className="text-red-500">*</span>}
        </Typography>
      )}
      <StyledTextField
        fullWidth
        value={value ? formatCurrency(value) : ''}
        onChange={handleChange}
        error={!!error}
        helperText={getHelperText()}
        disabled={disabled}
        InputProps={{
          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
        }}
        size="small"
      />
    </div>
  );
};

export default CurrencyInput;
}
