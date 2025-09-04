import React from 'react';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  error?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  disabled = false,
  required = false,
  placeholder,
}) => {
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    onChange(e.target.value as string);
  };

  return (
    <div className="space-y-2">
      {label && (
        <Typography variant="subtitle2" color="textSecondary">
          {label} {required && <span className="text-red-500">*</span>}
        </Typography>
      )}
      <StyledFormControl fullWidth error={!!error} disabled={disabled}>
        <MuiSelect
          value={value}
          onChange={handleChange as any}
          displayEmpty
          size="small"
        >
          {placeholder && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
        {error && <FormHelperText>{error}</FormHelperText>}
      </StyledFormControl>
    </div>
  );
};

export default Select;
