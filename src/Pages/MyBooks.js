import React, { useState, useEffect } from 'react';
import UserNavBar from '../Components/UserNavBar';
import IssueHistoryComponent from '../Components/IssueHistoryComponent';
import styles from './style/MyBooks.module.css';
import http from '../service/http-common';

function MyBooks() {
    const [issueHistory, setIssueHistory] = useState([]);
    const userId = 'sampleUserID'; // Replace 'SampleUserId' with actual user ID or use authentication context to get user ID

    useEffect(() => {
        fetchIssueHistory(); // Fetch issue history on component mount
        console.log('Issue History:', issueHistory);
    }, []);

    const fetchIssueHistory = async () => {
        try {
            const response = await http.get(`/issues/history/${userId}`); // Adjust endpoint according to your backend
            setIssueHistory(response.data); // Assuming response.data is an array of issue history
        } catch (error) {
            console.error('Error fetching issue history:', error);
        }
    };

    return (
        <>
            <UserNavBar />
            <div className={styles.MyBooks}>
                <div className={styles.content}>
                    <h1>My Books - Issue History</h1>
                    <div className={styles.issueHistoryContainer}>
                        {issueHistory.map((issue) => (
                            <IssueHistoryComponent key={issue.issueId} issue={issue} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyBooks;