import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
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
        Home
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return isLast ? (
          <Typography key={item.label} color="text.primary">
            {item.label}
          </Typography>
        ) : (
          <Link
            key={item.label}
            component={RouterLink}
            to={item.path || '#'}
            color="inherit"
            className="hover:text-primary-600"
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
