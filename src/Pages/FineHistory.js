import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfileLeftSideNavBar from '../Components/UserProfileLeftSideNavBar';
import styles from './style/FineHistory.module.css';
import FineTable from '../Components/FineTable';
import httpCommon from '../service/http-common';
import getUserID from '../service/GetUserID';

function FineHistory() {
    const [fineHistory, setFineHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userID = getUserID();
        const fetchFineHistory = async () => {
            try {
                const response = await httpCommon.get(`/fine/history/${userID}`);
                setFineHistory(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch fine history. Please try again later.');
                setLoading(false);
            }
        };

        fetchFineHistory();
    }, []);

    return (
        <>
            <UserProfileLeftSideNavBar />
            <div className={styles.container}>
                <div className={styles.contents}>
                    <h1>Fine History</h1>

                    <div className={styles.fineTable}>
                        {loading ? (
                            <p>Loading fine history...</p>
                        ) : error ? (
                            <p className={styles.error}>{error}</p>
                        ) : (
                            <FineTable fineHistory={fineHistory} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FineHistory;