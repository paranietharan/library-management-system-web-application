import React, { useState } from 'react';
import UserNavBar from '../Components/UserNavBar';
import styles from './style/userChat.module.css';
import Chat from '../Components/Chat';
import Footer from '../Components/LibraryFooter';

function UserChat() {
    return (
        <div className={styles.userChatContainer}>
            <UserNavBar />
            <div className={styles.chatComponentContainer}>
                <Chat username={'Paranie'} isAdmin={false} />
            </div>
            <Footer />
        </div>
    )
}

export default UserChat;