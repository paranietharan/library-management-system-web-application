import React, { useState } from 'react';
import styles from './style/AdminNotificationControl.module.css';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import { TextField, Button, List } from '@mui/material';
import NotificationItem from '../Components/NotificationItem';
import Footer from '../Components/LibraryFooter';

function AdminNotificationControl() {
    const [notifications, setNotifications] = useState([]);
    const [newNotificationHeading, setNewNotificationHeading] = useState('');
    const [newNotificationBody, setNewNotificationBody] = useState('');

    const handleAddNotification = () => {
        if (newNotificationBody.trim() !== '' && newNotificationHeading.trim() !== '') {
            const newNotificationItem = {
                id: notifications.length + 1,
                heading: newNotificationHeading.trim(), // Use the heading from input
                message: newNotificationBody.trim(), // Use the message from input
            };
            setNotifications([...notifications, newNotificationItem]);
            setNewNotificationHeading(''); // Clear heading input
            setNewNotificationBody(''); // Clear body input
        }
    };

    const handleDeleteNotification = (id) => {
        const updatedNotifications = notifications.filter((notif) => notif.id !== id);
        setNotifications(updatedNotifications);
    };

    return (
        <div className={styles.AdminNotificationControl}>
            <div className={styles.container}>
                <LibrarianTopNavBar />

                <div className={styles.contents}>
                    <h1>Admin Notification Control</h1>

                    {/* Notification Input Form */}
                    <div className={styles.notificationForm}>
                        <div className={styles.headingInput}>
                            <TextField
                                fullWidth
                                label="Notification Heading"
                                variant="outlined"
                                value={newNotificationHeading}
                                onChange={(e) => setNewNotificationHeading(e.target.value)}
                            />
                        </div>

                        <div className={styles.bodyInput}>
                            <TextField
                                fullWidth
                                label="Type your notification here"
                                variant="outlined"
                                value={newNotificationBody}
                                onChange={(e) => setNewNotificationBody(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddNotification}
                            className={styles.notificationButton}
                        >
                            Send Notification
                        </Button>
                    </div>

                    {/* Notification History List */}
                    <div className={styles.notificationList}>
                        <h2>Notification History</h2>

                        <div className={styles.list}>
                            <List>
                                {notifications.map((notification) => (
                                    <div className={styles.NotificationItem}>
                                        <NotificationItem
                                            key={notification.id}
                                            notification={notification}
                                            onDelete={handleDeleteNotification}
                                        />
                                    </div>
                                ))}
                            </List>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default AdminNotificationControl;