import styles from './style/Notifications.module.css';
import UserProfileLeftSideNavBar from '../Components/UserProfileLeftSideNavBar';
import NotificationSettingsDetails from '../Components/NotificationsSettingsDetails';

function Notifications() {
    return (
        <>
            <div className={styles.notificationsContainer} >
                <UserProfileLeftSideNavBar />

                <div className={styles.contents}>
                    <NotificationSettingsDetails />
                </div>
            </div>
        </>
    )
}

export default Notifications;