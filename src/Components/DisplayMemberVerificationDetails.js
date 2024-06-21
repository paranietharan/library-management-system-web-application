import React from 'react';
import styles from './style/DisplayMemberVerificationDetails.module.css';

function DisplayMemberVerificationDetails({ memberDetails, onConfirm, onGoToMainMenu }) {
    const handleConfirm = () => {
        onConfirm();
    };

    const handleGoToMainMenu = () => {
        onGoToMainMenu();
    };

    return (
        <div className={styles.memberVerificationDetails}>
            <h2>Member Verification Details</h2>
            <div className={styles.details}>
                <p><strong>First Name:</strong> {memberDetails.firstName}</p>
                <p><strong>Last Name:</strong> {memberDetails.lastName}</p>
                <p><strong>Email:</strong> {memberDetails.email}</p>
                <p><strong>Phone Number:</strong> {memberDetails.phoneNumber}</p>
                <p><strong>Class Name:</strong> {memberDetails.className}</p>
                <p><strong>Date of Birth:</strong> {memberDetails.dateOfBirth}</p>
            </div>
            <div className={styles.actions}>
                <button onClick={handleConfirm}>Confirm</button>
                <button onClick={handleGoToMainMenu}>Go to Main Menu</button>
            </div>
        </div>
    );
}

export default DisplayMemberVerificationDetails;