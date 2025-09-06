
import React from 'react';
import { TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

interface AadhaarInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    letterSpacing: '0.5em',
    fontFamily: 'monospace',
  },
}));

const AadhaarInput: React.FC<AadhaarInputProps> = ({
  value,
  onChange,
  error,
  disabled,
  required = false,
}) => {
  const { t } = useTranslation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const aadhaarNumber = e.target.value.replace(/\D/g, '');
    if (aadhaarNumber.length <= 12) {
      // Format with spaces after every 4 digits
      const formattedValue = aadhaarNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
      onChange(formattedValue);
    }
  };

  const validateAadhaar = (value: string): boolean => {
    const aadhaarRegex = /^\d{4}\s\d{4}\s\d{4}$/;
    return aadhaarRegex.test(value);
  };

  const getHelperText = (): string => {
    if (error) return error;
    if (value && !validateAadhaar(value)) return t('aadhaar_input.invalid_format');
    return '';
  };

  return (
    <div className="space-y-2">
      <Typography variant="subtitle2" color="textSecondary">
        {t('aadhaar_input.label')} {required && <span className="text-red-500">*</span>}
      </Typography>
      <StyledTextField
        fullWidth
        value={value}
        onChange={handleChange}
        placeholder="XXXX XXXX XXXX"
        error={!!error || (!!value && !validateAadhaar(value))}
        helperText={getHelperText()}
        disabled={disabled}
        inputProps={{
          maxLength: 14,
          inputMode: 'numeric',
          pattern: '[0-9]*',
        }}
        className="font-mono"
      />
      <Typography variant="caption" color="textSecondary">
        {t('aadhaar_input.helper_text')}
      </Typography>
    </div>
  );
};

export default AadhaarInput;
