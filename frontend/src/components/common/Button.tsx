
import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
  icon?: React.ReactNode;
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: '8px',
  padding: '8px 24px',
  '&.MuiButton-containedPrimary': {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  icon,
  disabled,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <StyledButton
      disabled={loading || disabled}
      startIcon={!loading && icon}
      {...props}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        <span className="flex items-center gap-2">{t(children as string)}</span>
      )}
    </StyledButton>
  );
};

export default Button;
