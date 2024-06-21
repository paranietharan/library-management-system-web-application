import styles from './style/SecurityPageStyle.module.css';
import UserProfileLeftSideNavBar from '../Components/UserProfileLeftSideNavBar';
import ChangePassword from '../Components/ChangePassword';

function SecurityPage() {
    return (
        <div className={styles.SecurityPageContainer}>
            <UserProfileLeftSideNavBar />

            <div className={styles.SecurityPageContent}>
                <ChangePassword />
            </div>
        </div>
    );
}

export default SecurityPage;