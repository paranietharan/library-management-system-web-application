import styles from './style/AdminProfileManagementStyle.module.css';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';

function AdminProfileManagement() {
    return (
        <>
            <div className={styles.container}>
                <LibrarianTopNavBar />

                <div className={styles.contents}></div>
            </div>
        </>
    );
}

export default AdminProfileManagement;