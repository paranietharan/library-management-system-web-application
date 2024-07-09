import React from 'react';
import AlertMessage from '../Components/AlertMessage';
import { useState } from 'react';
import Button from '@mui/material/Button';

function Test() {
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="App">
      <Button variant="outlined" onClick={handleClick}>
        Show Alert
      </Button>
      <AlertMessage
        show={showAlert}
        message="This is a warning message!"
        onClose={handleClose}
      />
    </div>
  );
}

export default Test;