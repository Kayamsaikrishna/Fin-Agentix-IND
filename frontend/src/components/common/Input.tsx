
// src/components/common/Input.tsx
import React from 'react';
import { TextField, TextFieldProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

interface InputProps extends Omit<TextFieldProps, 'error'> {
  label?: string;
  error?: string;
  required?: boolean;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Input: React.FC<InputProps> = ({
  label,
  error,
  required = false,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-1">
      {label && (
        <Typography variant="subtitle2" color="textSecondary">
          {t(label)} {required && <span className="text-red-500">*</span>}
        </Typography>
      )}
      <StyledTextField
        fullWidth
        error={!!error}
        helperText={error && t(error)}
        size="small"
        {...props}
      />
    </div>
  );
};

export default Input;
