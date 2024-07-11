import React, { useState, useEffect } from 'react';
import styles from './style/FineManagementStyle.module.css';
import UserNavBar from '../Components/UserNavBar';
import httpCommon from '../service/http-common';
import getUserID from '../service/GetUserID';

function FineManagement() {
    const [fineDetails, setFineDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookDetails, setBookDetails] = useState(null);
    const [userId, setUserId] = useState('sampleUserID');

    //const userId = 'sampleUserID'; // Replace this with the actual user ID

    useEffect(() => {
        const userId = getUserID();
        setUserId(userId);
        const fetchFineDetails = async () => {
            try {
                const response = await httpCommon.get(`/fine/unpaid/${userId}`);
                setFineDetails(response.data);
                setLoading(false);
                if (response.data) {
                    getBookDetails(response.data.resourceId);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('No unpaid fines found.');
                } else {
                    setError('Failed to load fine details.');
                }
                setLoading(false);
            }
        };

        fetchFineDetails();
    }, [userId]);

    // method to get book details by resourceId
    const getBookDetails = async (resourceId) => {
        try {
            const response = await httpCommon.get(`/resource/get/id/${resourceId}`);
            setBookDetails(response.data);
        } catch (error) {
            return null;
        }
    };

    return (
        <>
            <UserNavBar />
            <div className={styles.fineManagementContainer}>
                {fineDetails ? (
                    <>
                        <div className={styles.fineManagementHeader}>
                            <h1>Fine Payment Receipt</h1>
                        </div>

                        <div className={styles.fineAmountDetails}>
                            <table className={styles.fineAmountDetailsTable}>
                                <thead>
                                    <tr>
                                        <th>Book Name</th>
                                        <td>{
                                            bookDetails ? bookDetails.title : 'Book Title'
                                        }</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Book Category</th>
                                        <td>{
                                            bookDetails ? bookDetails.category : 'Not Avilable'
                                        }</td>
                                    </tr>
                                    <tr>
                                        <th>Author</th>
                                        <td>{
                                            bookDetails ? bookDetails.author : 'Author'
                                        }</td>
                                    </tr>
                                    <tr>
                                        <th>Fine ID</th>
                                        <td>{fineDetails.fineId}</td>
                                    </tr>
                                    <tr>
                                        <th>Fine Amount</th>
                                        <td>{fineDetails.amount}</td>
                                    </tr>
                                    <tr>
                                        <th>Due Date</th>
                                        <td>{new Date(fineDetails.resourceIssueDate).toLocaleDateString()}</td>
                                    </tr>
                                </tbody>
                                
                            </table>
                        </div>
                    </>
                ) : (
                    <div className={styles.noFineMessage}>
                        <h1>No Unpaid Fines</h1>
                        <p>You have no unpaid fines at this moment.</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default FineManagement;