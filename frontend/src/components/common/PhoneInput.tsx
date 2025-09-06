import React from 'react';
import { TextField, Typography, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
    if (value && !validatePhone(value)) return t('phone_input.invalid_format');
    return '';
  };

  return (
    <div className="space-y-2">
      <Typography variant="subtitle2" color="textSecondary">
        {t('phone_input.label')} {required && <span className="text-red-500">*</span>}
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
        placeholder={t('phone_input.placeholder')}
      />
      <Typography variant="caption" color="textSecondary">
        {t('phone_input.helper_text')}
      </Typography>
    </div>
  );
};

export default PhoneInput;
