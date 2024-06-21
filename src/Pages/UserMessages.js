import React from 'react';
import PageMessage from "../Components/PageMessage";
import styles from './style/UserMessagesStyle.module.css'; // Import the CSS module
import UserNavBar from '../Components/UserNavBar'; // Import the UserNavBar component

function UserMessages() {
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
          <PageMessage heading="heading-1" message="Custom message 1" style={messageStyle} />
          <PageMessage heading="heading-2" message="Custom message 2" style={messageStyle} />
          <PageMessage heading="heading-3" message="Custom message 3" style={messageStyle} />
          <PageMessage heading="heading-4" message="Custom message 4" style={messageStyle} />
          <PageMessage heading="heading-5" message="Custom message 5" style={messageStyle} />
          <PageMessage heading="heading-6" message="Custom message 6" style={messageStyle} />
        </div>
      </div>
    </div>
  );
}

export default UserMessages;
