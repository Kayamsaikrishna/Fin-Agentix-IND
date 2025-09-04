import React from 'react';
import {
  Alert as MuiAlert,
  AlertProps as MuiAlertProps,
  AlertTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface AlertProps extends Omit<MuiAlertProps, 'title'> {
  title?: string;
  message: string;
  action?: React.ReactNode;
}

const StyledAlert = styled(MuiAlert)(({ theme }) => ({
  borderRadius: '8px',
  '& .MuiAlert-message': {
    width: '100%',
  },
}));

const Alert: React.FC<AlertProps> = ({
  title,
  message,
  action,
  variant = 'outlined',
  ...props
}) => {
  return (
    <StyledAlert
      variant={variant}
      {...props}
      action={action}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      <div className="flex items-center justify-between w-full">
        <span>{message}</span>
      </div>
    </StyledAlert>
  );
};

export default Alert;
