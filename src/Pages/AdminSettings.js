import styles from './style/AdminSettingsStyle.module.css';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';

function AdminSettings() {
    return (
        <>
            <div className={styles.container}>
                <LibrarianTopNavBar />

                <div className={styles.contents}></div>
            </div>
        </>
    );
}

export default AdminSettings;