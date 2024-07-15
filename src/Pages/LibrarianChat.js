import React from 'react';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import styles from './style/LibrarianChatStyle.module.css';
import Footer from '../Components/LibraryFooter';
import AdminChat from '../Components/AdminChat';

function LibrarianChat() {
    return (
        <div className={styles.AdminChatPage}>
            <LibrarianTopNavBar />
            <div className={styles.AdminChatContainer}>
                <AdminChat />
            </div>
            <Footer />
        </div>
    );
}

export default LibrarianChat;