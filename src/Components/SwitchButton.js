import React, { useState } from 'react';
import Switch from '@mui/material/Switch';

export default function SwitchButton({ onChange }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <Switch
        checked={isChecked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'Switch demo' }}
      />
    </div>
  );
}
