
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from '@mui/material';
import { X } from 'lucide-react';
import Button from './Button';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  showCloseButton?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  loading?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  showCloseButton = true,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryAction,
  onSecondaryAction,
  loading = false,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <DialogTitle className="flex items-center justify-between">
        <Typography variant="h6">{t(title)}</Typography>
        {showCloseButton && (
          <IconButton onClick={onClose} size="small">
            <X size={20} />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {(actions || primaryButtonText || secondaryButtonText) && (
        <DialogActions className="p-6">
          {actions || (
            <>
              {secondaryButtonText && (
                <Button
                  variant="outlined"
                  onClick={onSecondaryAction || onClose}
                  disabled={loading}
                >
                  {t(secondaryButtonText)}
                </Button>
              )}
              {primaryButtonText && (
                <Button
                  variant="contained"
                  onClick={onPrimaryAction}
                  loading={loading}
                >
                  {t(primaryButtonText)}
                </Button>
              )}
            </>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
