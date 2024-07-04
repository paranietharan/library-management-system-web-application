import React, { useEffect, useState } from 'react';
import PageMessage from "../Components/PageMessage";
import styles from './style/UserMessagesStyle.module.css';
import UserNavBar from '../Components/UserNavBar';
import Footer from '../Components/LibraryFooter';
import http from '../service/http-common';

function UserMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    http.get('/notice/all')
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  const messageStyle = {
    marginTop: '10px', // Add top gap
    marginBottom: '10px', // Add bottom gap
    textAlign: 'center', // Align in center
    width: '100%', // Full width
  };

  return (
    <div className={styles.UserMessages}>
      <UserNavBar />
      <div className={styles.notificationContainer}>
        <div className={styles.notifications} style={{ marginLeft: 0 }}>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <PageMessage
                key={index}
                heading={message.title}
                message={message.message}
                style={messageStyle}
              />
            ))
          ) : (
            <p>No messages available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserMessages;