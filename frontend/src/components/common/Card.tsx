import React from 'react';
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface CardProps extends Omit<MuiCardProps, 'title'> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  noPadding?: boolean;
  headerBorder?: boolean;
  footerBorder?: boolean;
}

const StyledCard = styled(MuiCard)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '12px',
  boxShadow: 'none',
}));

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  footer,
  children,
  noPadding = false,
  headerBorder = false,
  footerBorder = false,
  ...props
}) => {
  return (
    <StyledCard {...props}>
      {(title || subtitle || action) && (
        <>
          <CardHeader
            title={
              title && (
                <Typography variant="h6" component="h2">
                  {title}
                </Typography>
              )
            }
            subheader={subtitle}
            action={action}
            className={headerBorder ? 'border-b' : ''}
          />
        </>
      )}
      <CardContent className={noPadding ? 'p-0 last:pb-0' : ''}>
        {children}
      </CardContent>
      {footer && (
        <>
          {footerBorder && <Divider />}
          <CardActions className="px-6 py-4">{footer}</CardActions>
        </>
      )}
    </StyledCard>
  );
};

export default Card;
