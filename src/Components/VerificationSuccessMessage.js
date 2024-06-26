import React from 'react';
import styles from './style/VerificationSuccessMessage.module.css';
import 'font-awesome/css/font-awesome.min.css';

function VerificationSuccessMessage() {
    return (
        <div className={styles['success-msg-box']}>
            <div className={styles['success-icon']}>
                <i className="fa fa-check-circle" aria-hidden="true"></i>
            </div>
            <p className={styles['success-msg-title']}>Congratulations!</p>
            <p className={styles['success-message-text']}>Your account is ready to use. You will be redirected to the login page in a few seconds.</p>
        </div>
    );
}

export default VerificationSuccessMessage;