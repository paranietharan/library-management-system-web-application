import React, { useState, useEffect } from 'react';
import styles from './style/AdminNotificationControl.module.css';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import { TextField, Button, List } from '@mui/material';
import NotificationItem from '../Components/NotificationItem';
import Footer from '../Components/LibraryFooter';
import http from '../service/http-common';

function AdminNotificationControl() {
    const [notifications, setNotifications] = useState([]);
    const [newNotificationHeading, setNewNotificationHeading] = useState('');
    const [newNotificationBody, setNewNotificationBody] = useState('');

    useEffect(() => {
        // Fetch initial notifications from backend
        http.get('/notice/all')
            .then((response) => setNotifications(response.data))
            .catch((error) => console.error('Error fetching notifications:', error));
    }, []);

    const handleAddNotification = () => {
        if (newNotificationBody.trim() !== '' && newNotificationHeading.trim() !== '') {
            const newNotificationItem = {
                title: newNotificationHeading.trim(),
                message: newNotificationBody.trim(),
            };

            http.post('/notice/add', newNotificationItem)
                .then((response) => {
                    setNotifications([...notifications, response.data]);
                    setNewNotificationHeading(''); // Clear heading input
                    setNewNotificationBody(''); // Clear body input
                })
                .catch((error) => console.error('Error adding notification:', error));
        }
    };

    const handleDeleteNotification = (id) => {
        http.delete(`/notice/delete/${id}`)
            .then(() => {
                const updatedNotifications = notifications.filter((notif) => notif.id !== id);
                setNotifications(updatedNotifications);
            })
            .catch((error) => console.error('Error deleting notification:', error));
    };

    return (
        <div className={styles.AdminNotificationControl}>
            <div className={styles.container}>
                <LibrarianTopNavBar />

                <div className={styles.contents}>
                    <h1>Admin Notice Control</h1>

                    {/* Notification Input Form */}
                    <div className={styles.notificationForm}>
                        <div className={styles.headingInput}>
                            <TextField
                                fullWidth
                                label="Notice Heading"
                                variant="outlined"
                                value={newNotificationHeading}
                                onChange={(e) => setNewNotificationHeading(e.target.value)}
                            />
                        </div>

                        <div className={styles.bodyInput}>
                            <TextField
                                fullWidth
                                label="Type your notice here"
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
                            Send Notice
                        </Button>
                    </div>

                    {/* Notification History List */}
                    <div className={styles.notificationList}>
                        <h2>Notice History</h2>

                        <div className={styles.list}>
                            <List>
                                {notifications.map((notification) => (
                                    <div className={styles.NotificationItem} key={notification.id}>
                                        <NotificationItem
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