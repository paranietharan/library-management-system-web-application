// use 2 list ongoing un solved complaints
import styles from './style/complaintDetails.module.css';
import HistoryIcon from '@mui/icons-material/History';
import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';
import InfoIcon from '@mui/icons-material/Info';

function ComplaintDetails({ complaintSection, complaintDescription }) {
    const description = complaintDescription.split(' ').slice(0, 25).join(' ');

    return (
        <div className={styles.ComplaintDetailsContainer}>

            <div className={styles.type}>
                <div className={styles.processStage}>
                    <HistoryIcon className={styles.processIcon} />
                    <div className={styles.processText}>ongoing</div>
                </div>

                <div className={styles.complaintSection}>
                    <TypeSpecimenIcon className={styles.sectionIcon} />
                    <div className={styles.sectionText}>{complaintSection}</div>
                </div>
            </div>


            <div className={styles.complaintDescription}>
                <div className={styles.heading}>
                    <InfoIcon className={styles.headingIcon} />
                    <div className={styles.headingText}>Description</div>
                </div>
                <div className={styles.descriptionText}>{description}</div>
            </div>
            
        </div>
    );
}

export default ComplaintDetails;