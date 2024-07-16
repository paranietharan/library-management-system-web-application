import React, { useState, useEffect } from 'react';
import UserProfileLeftSideNavBar from '../Components/UserProfileLeftSideNavBar';
import styles from './style/LendingHistory.module.css';
import BookView from '../Components/BookView';
import http from '../service/http-common';
import getUserID from '../service/GetUserID';

function LendingHistory() {
    const [lendingHistory, setLendingHistory] = useState([]);
    const [error, setError] = useState(null);

    // Fetch lending history data from backend
    useEffect(() => {
        const memberId = getUserID(); // Replace with actual logic to get memberId
        fetchLendingHistory(memberId);
    }, []);

    const fetchLendingHistory = async (memberId) => {
        try {
            const response = await http.get(`/issues/history/${memberId}`);
            console.log("Lending history:", response.data);
            // Assuming response.data is an array of lending history items
            setLendingHistory(response.data);
        } catch (error) {
            console.error("Error fetching lending history:", error);
            setError("Failed to fetch lending history.");
        }
    };

    return (
        <>
            <UserProfileLeftSideNavBar />
            <div className={styles.container}>
                <div className={styles.contents}>
                    <h1 className={styles.heading}>Lending history</h1>

                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.bookList}>
                        {lendingHistory && lendingHistory.map((issue) => (
                            <div className={styles.listItem} key={issue.issueId}>
                                <BookView issue={issue} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default LendingHistory;