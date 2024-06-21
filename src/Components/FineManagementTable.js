import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const initialRows = [
  {
    id: 1,
    studentName: 'Alice',
    indexNo: 'S12345',
    borrowedBook: 'To Kill a Mockingbird',
    fineAmount: 10,
    paidAmount: 0,
    remainingFine: 10,
    finePaid: false,
  },
  {
    id: 2,
    studentName: 'Bob',
    indexNo: 'S23456',
    borrowedBook: '1984',
    fineAmount: 5,
    paidAmount: 5,
    remainingFine: 0,
    finePaid: true,
  },
  {
    id: 3,
    studentName: 'Charlie',
    indexNo: 'S34567',
    borrowedBook: 'The Great Gatsby',
    fineAmount: 15,
    paidAmount: 0,
    remainingFine: 15,
    finePaid: false,
  },
];

export default function FineManagementTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [paymentInput, setPaymentInput] = React.useState({});

  const handlePartialPaymentChange = (id) => (event) => {
    const value = event.target.value;
    setPaymentInput((prev) => ({ ...prev, [id]: value }));
  };

  const handlePartialPaymentSubmit = (id) => () => {
    const paymentAmount = parseFloat(paymentInput[id]) || 0;

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              paidAmount: row.paidAmount + paymentAmount,
              remainingFine: row.fineAmount - (row.paidAmount + paymentAmount),
              finePaid: row.fineAmount - (row.paidAmount + paymentAmount) <= 0,
            }
          : row,
      ),
    );

    setPaymentInput((prev) => ({ ...prev, [id]: '' }));
  };

  const handleKeyPress = (id) => (event) => {
    if (event.key === 'Enter') {
      handlePartialPaymentSubmit(id)();
    }
  };

  const columns = React.useMemo(
    () => [
      { field: 'studentName', headerName: 'Student Name', width: 200 },
      { field: 'indexNo', headerName: 'Index No', width: 150 },
      { field: 'borrowedBook', headerName: 'Borrowed Book', width: 200 },
      { field: 'fineAmount', headerName: 'Fine Amount', width: 120, type: 'number' },
      { field: 'paidAmount', headerName: 'Paid Amount', width: 120, type: 'number' },
      { field: 'remainingFine', headerName: 'Remaining Fine', width: 150, type: 'number' },
      {
        field: 'finePaid',
        headerName: 'Fine Paid',
        width: 150,
        type: 'boolean',
        renderCell: (params) =>
          params.value ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />,
      },
      {
        field: 'actions',
        headerName: 'Paid Amount',
        width: 300,
        renderCell: (params) => (
          <>
            <TextField
              size="small"
              variant="outlined"
              label="Amount"
              value={paymentInput[params.id] || ''}
              onChange={handlePartialPaymentChange(params.id)}
              onKeyPress={handleKeyPress(params.id)}
              style={{ margin: '8px', width: '100px' }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handlePartialPaymentSubmit(params.id)}
            >
              Pay
            </Button>
          </>
        ),
      },
    ],
    [paymentInput, handlePartialPaymentChange, handlePartialPaymentSubmit],
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
}
