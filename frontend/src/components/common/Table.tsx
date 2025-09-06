import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Pagination from './Pagination';
import { useTranslation } from 'react-i18next';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: any) => string | React.ReactNode;
}

interface TableProps {
  columns: Column[];
  rows: any[];
  loading?: boolean;
  error?: string;
  page?: number;
  totalItems?: number;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  onRowClick?: (row: any) => void;
  emptyMessage?: string;
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: '70vh',
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const Table: React.FC<TableProps> = ({
  columns,
  rows,
  loading = false,
  error,
  page = 0,
  totalItems = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  onRowClick,
  emptyMessage = 'table.emptyMessage',
}) => {
  const { t } = useTranslation();
  if (error) {
    return (
      <div className="p-8 text-center">
        <Typography color="error">{t(error)}</Typography>
      </div>
    );
  }

  return (
    <Paper elevation={0} variant="outlined">
      <StyledTableContainer>
        <MuiTable stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant="subtitle2">{t(column.label)}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" className="h-64">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" className="h-64">
                  <Typography color="textSecondary">{t(emptyMessage)}</Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow
                  hover
                  key={index}
                  onClick={() => onRowClick?.(row)}
                  style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.format
                        ? column.format(row[column.id])
                        : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </MuiTable>
      </StyledTableContainer>
      {!loading && rows.length > 0 && onPageChange && onRowsPerPageChange && (
        <Pagination
          page={page}
          totalItems={totalItems}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}
    </Paper>
  );
};

export default Table;
