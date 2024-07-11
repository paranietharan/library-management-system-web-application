import React, { useState, useEffect } from 'react';
import UserNavBar from '../Components/UserNavBar';
import IssueHistoryComponent from '../Components/IssueHistoryComponent';
import styles from './style/MyBooks.module.css';
import http from '../service/http-common';
import getUserID from '../service/GetUserID';

function MyBooks() {
    const [issueHistory, setIssueHistory] = useState([]);
    const [unreturnbook, setunreturnBook] = useState(null);
    const[userId, setUserId] = useState('');

    //const userId = 'sampleUserID';

    useEffect(() => {
        const userId = getUserID();
        setUserId(userId);
        fetchIssueHistory();
        fetchUserBook();
    }, []);

    const fetchIssueHistory = async () => {
        try {
            const response = await http.get(`/issues/history/${userId}`); // Adjust endpoint according to your backend
            setIssueHistory(response.data); // Assuming response.data is an array of issue history
        } catch (error) {
            console.error('Error fetching issue history:', error);
        }
    };

    const fetchUserBook = async () => {
        try {
            const response = await http.get(`/issues/check?memberId=${userId}`); // Adjust endpoint according to your backend
            setunreturnBook(response.data); // Assuming response.data is the book object or null if the user doesn't have a book
        } catch (error) {
            console.error('Error fetching user book:', error);
        }
    };

    return (
        <div className={styles.MyBooksPage}>
            <UserNavBar />
            <div className={styles.MyBooks} >
                <div className={styles.content}>
                    <div className={styles.unreturnbookContainer}>
                        <h1>Un returned Records</h1>
                        {
                            unreturnbook ? (
                                <div className={styles.unReturnBooks}>
                                    <IssueHistoryComponent issue={unreturnbook} />
                                </div>
                            ) : (
                                <p>No book currently borrowed</p>
                            )
                        }
                    </div>

                    <div className={styles.issueHistoryList}>
                        <h1>Issue History</h1>
                        <div className={styles.issueHistoryContainer}>
                            {issueHistory.map((issue) => (
                                <IssueHistoryComponent key={issue.issueId} issue={issue} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyBooks;