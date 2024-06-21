import React, { useState } from 'react';
import SwitchButton from './SwitchButton';
import styles from './style/NotificationSettings.module.css';

const NotificationSettingsDetails = () => {
  const [emailNotification, setEmailNotification] = useState(false);
  const [pushNotification, setPushNotification] = useState(false);
  const [smsNotification, setSmsNotification] = useState(false);
  const [appNotification, setAppNotification] = useState(false);
  const [browserNotification, setBrowserNotification] = useState(false);

  const handleEmailNotificationChange = (value) => {
    setEmailNotification(value);
  };

  const handlePushNotificationChange = (value) => {
    setPushNotification(value);
  };

  const handleSmsNotificationChange = (value) => {
    setSmsNotification(value);
  };

  const handleAppNotificationChange = (value) => {
    setAppNotification(value);
  };

  const handleBrowserNotificationChange = (value) => {
    setBrowserNotification(value);
  };

  return (
    <div className={styles.notificationSettings}>
      <h2>Notification Settings</h2>
      <div className={styles.notificationItem}>
        <label>Email Notifications:</label>
        <SwitchButton checked={emailNotification} onChange={handleEmailNotificationChange} />
      </div>
      <div className={styles.notificationItem}>
        <label>Push Notifications:</label>
        <SwitchButton checked={pushNotification} onChange={handlePushNotificationChange} />
      </div>
      <div className={styles.notificationItem}>
        <label>SMS Notifications:</label>
        <SwitchButton checked={smsNotification} onChange={handleSmsNotificationChange} />
      </div>
      <div className={styles.notificationItem}>
        <label>App Notifications:</label>
        <SwitchButton checked={appNotification} onChange={handleAppNotificationChange} />
      </div>
      <div className={styles.notificationItem}>
        <label>Browser Notifications:</label>
        <SwitchButton checked={browserNotification} onChange={handleBrowserNotificationChange} />
      </div>
    </div>
  );
};

export default NotificationSettingsDetails;