import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/system';

const OtpInput = ({ length = 6, onOtpChange }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);

    // Function to handle input change
    const handleChange = (index, value) => {
        // Update OTP array with new value at the specified index
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to the next input field if available
        if (value !== '' && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Notify parent component about the OTP change
        if (onOtpChange) {
            onOtpChange(newOtp.join('')); // Send the concatenated OTP value to the parent
        }
    };

    // Focus on the first input field when component mounts
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {new Array(length).fill(null).map((_, index) => (
                <InputElement
                    key={index}
                    maxLength="1"
                    value={otp[index] || ''}
                    onChange={(e) => handleChange(index, e.target.value)}
                    ref={(el) => (inputRefs.current[index] = el)}
                />
            ))}
        </Box>
    );
};

OtpInput.propTypes = {
    length: PropTypes.number.isRequired,
    onOtpChange: PropTypes.func.isRequired,
};

const InputElement = styled('input')({
    width: '10px',
    height: '10px',
    textAlign: 'center',
    fontSize: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
});

export default OtpInput;