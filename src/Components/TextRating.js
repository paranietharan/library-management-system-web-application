import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function TextRating({ ratingValue, onRatingChange }) {
    const [value, setValue] = React.useState(ratingValue);
    const [hover, setHover] = React.useState(-1);

    React.useEffect(() => {
        setValue(Math.round(ratingValue)); // Update state when the prop changes
    }, [ratingValue]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onRatingChange(newValue);
    };

    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            {console.log('Rating:', value)}
            <Rating
                name="simple-controlled"
                value={value}
                onChange={handleChange}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                sx={{
                    '& .MuiRating-iconFilled': {
                        fontSize: '60px', // Adjust the size for filled stars
                    },
                    '& .MuiRating-iconHover': {
                        fontSize: '60px', // Adjust the size for hover effect
                    },
                    '& .MuiRating-iconEmpty': {
                        fontSize: '60px', // Adjust the size for empty stars
                    },
                }}
            />
        </Box>
    );
}
