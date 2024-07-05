import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Snackbar } from '@mui/material';

export default function AlertMessage({ show, message, onClose }) {
  return (
    <Snackbar
      open={show}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity="warning" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}