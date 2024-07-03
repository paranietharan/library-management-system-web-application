import React, { useEffect, useState } from 'react';
import PageMessage from "../Components/PageMessage";
import styles from './style/UserMessagesStyle.module.css'; // Import the CSS module
import UserNavBar from '../Components/UserNavBar'; // Import the UserNavBar component
import Footer from '../Components/LibraryFooter';

function UserMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/notice/all')
      .then(response => response.json())
      .then(data => setMessages(data))
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