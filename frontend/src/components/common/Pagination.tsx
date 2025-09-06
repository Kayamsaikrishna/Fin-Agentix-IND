
import React from 'react';
import {
  TablePagination,
  TablePaginationProps,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  page: number;
  totalItems: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalItems,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100],
}) => {
  const { t } = useTranslation();

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    onPageChange(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };

  return (
    <TablePagination
      component="div"
      count={totalItems}
      page={page}
      onPageChange={handlePageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleRowsPerPageChange}
      rowsPerPageOptions={rowsPerPageOptions}
      className="flex justify-end border-t py-2 px-4"
      labelRowsPerPage={t('pagination.rows_per_page')}
      labelDisplayedRows={({ from, to, count }) =>
        `${from}-${to} ${t('pagination.of')} ${count}`
      }
      nextIconButtonProps={{
        children: <ChevronRight size={20} />,
      }}
      backIconButtonProps={{
        children: <ChevronLeft size={20} />,
      }}
    />
  );
};

export default Pagination;
