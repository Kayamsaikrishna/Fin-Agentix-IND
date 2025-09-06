
import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Breadcrumbs
      separator={<ChevronRight size={16} />}
      aria-label="breadcrumb"
      className="mb-4"
    >
      <Link
        component={RouterLink}
        to="/"
        color="inherit"
        className="hover:text-primary-600"
      >
        {t('breadcrumb.home')}
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return isLast ? (
          <Typography key={item.label} color="text.primary">
            {t(item.label)}
          </Typography>
        ) : (
          <Link
            key={item.label}
            component={RouterLink}
            to={item.path || '#'}
            color="inherit"
            className="hover:text-primary-600"
          >
            {t(item.label)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
