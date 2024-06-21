import React from 'react';
import styles from './style/FineManagementStyle.module.css'; // Import the CSS module
import UserNavBar from '../Components/UserNavBar'; // Import the UserNavBar component

function FineManagement() {
    return (
        <>
            <UserNavBar />
            <div>
                <div className={styles.fineManagementContainer}>
                    <div className={styles.fineManagementHeader}>
                        <h1>Fine Payment Receipt</h1>
                        <p>27346733-022</p>
                    </div>

                    <div className={styles.dueDateDetails}>
                        <h2>Due Date</h2>
                        <p>2021-11-01</p>
                    </div>

                    <div className={styles.fineAmountDetails}>
                        <table className={styles.fineAmountDetailsTable}>
                            <thead>
                                <tr>
                                    <th>Book Name</th>
                                    <th>Days of late</th>
                                    <th>Fine Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Book 1</td>
                                    <td>5</td>
                                    <td>100</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.warningMessage}>
                        <p>After 7 March 2024 your Library account will be suspended</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FineManagement;