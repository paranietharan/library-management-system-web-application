import React from 'react';
import styles from './style/IssueHistoryComponent.module.css';
import http from '../service/http-common';
import { useEffect, useState } from 'react';

function IssueHistoryComponent({ issue }) {
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookName = async () => {
            try {
                const response = await http.get(`/resource/get/id/${issue.resourceId}`); // Adjust endpoint according to your backend
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book name:', error);
            }
        };

        fetchBookName();
    }, [issue.resourceId]);

    const returnedStyle = {
        color: issue.returned ? 'green' : 'red',
        fontWeight: 'bold'
    };

    const borderstyle = {
        border: issue.returned ? '2px solid green' : '2px solid red',
        padding: '10px',
        margin: '10px'
    }

    return (
        <div className={styles.issueHistoryItem} style={borderstyle}>
            <p>Issue ID: {issue.issueId}</p>
            <p>Issue Date: {new Date(issue.date).toLocaleDateString()}</p>
            <p style={returnedStyle}>Returned: {issue.returned ? 'Yes' : 'No'}</p>
            {book &&
                <div className={styles.bookDetails}>
                    <p>Book ID: {book.resourceId}</p>
                    <p>Book Name: {book.title}</p>
                    <p>Author: {book.author}</p>
                </div>
            }
        </div>
    );
}

export default IssueHistoryComponent;