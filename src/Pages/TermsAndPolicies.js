import React from 'react';
import UserProfileLeftSideNavBar from '../Components/UserProfileLeftSideNavBar';
import styles from './style/TermsAndPolicies.module.css';

function TermsAndPolicies() {
    return (
        <>
            <UserProfileLeftSideNavBar />
            <div className={styles.TermsAndPoliciesContainer}>
                <div className={styles.contents}>
                    <div className={styles.terms}>
                        <h1>Terms and Policies</h1>
                        <h2>Welcome to our Library Management System!</h2>
                        <p>By using our services, you agree to abide by the following terms and policies:</p>
                        <h3>1. Access and Use</h3>
                        <p>Access to the library management system is provided solely for the purpose of managing library resources, borrowing books, and accessing related services.</p>
                        <h3>2. User Accounts</h3>
                        <p>Users are required to create an account to access certain features of the system. User accounts must not be shared with others.</p>
                        <h3>3. Data Privacy</h3>
                        <p>We take user privacy seriously. All personal information collected by the library management system is securely stored and used only for the purpose of providing library services.</p>
                        <h3>4. Intellectual Property</h3>
                        <p>All content and materials provided by the library management system, including but not limited to books, articles, and images, are protected by copyright law. Users must not reproduce or distribute these materials without permission.</p>
                        <h3>5. Code of Conduct</h3>
                        <p>Users are expected to conduct themselves in a respectful and responsible manner when using the library management system. Any misuse or abuse of the system will result in account suspension or termination.</p>
                        <h3>6. Liability</h3>
                        <p>We are not responsible for any loss or damage resulting from the use of the library management system. Users access the system at their own risk.</p>
                        <p>By continuing to use our services, you acknowledge that you have read and agree to these terms and policies.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TermsAndPolicies;