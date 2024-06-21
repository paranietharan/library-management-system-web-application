import UserProfileLeftSideNavBar from '../Components/UserProfileLeftSideNavBar';
import styles from './style/FineHistory.module.css';
import FineTable from '../Components/FineTable';

function FineHistory() {
    return (
        <>
            <UserProfileLeftSideNavBar />
            <div className={styles.container}>
                <div className={styles.contents}>
                    <h1>Fine History</h1>

                    <div className={styles.fineTable}>
                        <FineTable />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FineHistory;