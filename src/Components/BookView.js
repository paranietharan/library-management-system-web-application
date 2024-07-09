import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Box, CircularProgress } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styles from './style/BookView.module.css';

function BookView({ issue }) {
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/resource/get/id/${issue.resourceId}`);
                setResource(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching resource:', error);
                setLoading(false);
            }
        };

        fetchResource();
    }, [issue.resourceId]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div className={styles.bookView}>
            <Box display="flex" alignItems="center">
                <BookIcon />
                <Typography variant="h6" component="h2" marginLeft={1}>
                    {resource.title}
                </Typography>
            </Box>

            <Box display="flex" alignItems="center" marginTop={2}>
                <CalendarTodayIcon />
                <Typography variant="body1" component="p" marginLeft={1}>
                    Borrowed: {issue.date.split('T')[0]}
                </Typography>
            </Box>

            <Typography variant="body2" component="p" marginTop={2}>
                Author: {resource.author}
            </Typography>

            <Typography variant="body2" component="p" marginTop={2}>
                Category: {resource.category}
            </Typography>

            <Typography variant="body2" component="p" marginTop={2}>
                About: {resource.about}
            </Typography>
        </div>
    );
}

export default BookView;