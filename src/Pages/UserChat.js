import React, { useState, useEffect } from 'react';
import UserNavBar from '../Components/UserNavBar';
import styles from './style/userChat.module.css';
import Chat from '../Components/Chat';
import Footer from '../Components/LibraryFooter';
import getUserID from '../service/GetUserID';
import http from '../service/http-common';

function UserChat() {
    const [username, setUsername] = useState('');

    const getUserProfileDetails = async (userId) => {
      try {
        // Get user profile details from the server
        const response = await http.get(`/user/getUserProfileDetails/${userId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching user profile details:", error);
        return null;
      }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userId = getUserID();
            const userDetails = await getUserProfileDetails(userId);
            if (userDetails) {
                setUsername(userDetails.firstName);
            }
        };
        
        fetchUserProfile();
    }, []);

    return (
        <div className={styles.userChatContainer}>
            <UserNavBar />
            <div className={styles.chatComponentContainer}>
                <Chat username={username} isAdmin={false} />
            </div>
            <Footer />
        </div>
    )
}

export default UserChat;