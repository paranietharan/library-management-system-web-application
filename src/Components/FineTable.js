import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const rows = [
  { id: 1, bookName: 'Book A', borrowedDate: '2024-04-01', submittedDate: '2024-04-10', fineAmount: 5.00 },
  { id: 2, bookName: 'Book B', borrowedDate: '2024-03-15', submittedDate: '2024-04-05', fineAmount: 3.50 },
  { id: 3, bookName: 'Book C', borrowedDate: '2024-03-20', submittedDate: '2024-04-12', fineAmount: 7.00 },
  { id: 4, bookName: 'Book D', borrowedDate: '2024-04-05', submittedDate: '2024-04-15', fineAmount: 2.00 },
];

const columns = [
  { field: 'bookName', headerName: 'Book Name', width: 200 },
  { field: 'borrowedDate', headerName: 'Borrowed Date', width: 150 },
  { field: 'submittedDate', headerName: 'Submitted Date', width: 150 },
  { field: 'fineAmount', headerName: 'Fine Amount', type: 'number', width: 150 },
];

export default function FineTable() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </Box>
  );
}