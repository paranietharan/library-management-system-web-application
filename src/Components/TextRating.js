import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

export default function TextRating({ onRatingChange }) {
    const [value, setValue] = useState(3.5); // State to manage the rating value

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onRatingChange(newValue); // Call the callback function with the new rating value
    };

    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Rating
                name="text-feedback"
                value={value}
                onChange={handleChange} // Handle change in rating value
                precision={0.5}
                // emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                emptyIcon={<StarIcon style={{ opacity: 0.55, fontSize: 60 }} />} // Adjust fontSize for empty stars
                icon={<StarIcon style={{ color: '#FFD700', fontSize: 60 }} />} // Adjust fontSize for filled stars and change color to golden
            />
        </Box>
    );
}
