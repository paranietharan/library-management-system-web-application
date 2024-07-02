import styles from './style/complaintDetails.module.css';
import HistoryIcon from '@mui/icons-material/History';
import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';
import InfoIcon from '@mui/icons-material/Info';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function ComplaintDetails({ complaintId, complaintType, complaintDescription, complaintDate, complainTime, complaintStatus }) {
    const description = complaintDescription.split(' ').slice(0, 25).join(' ');

    return (
        <div className={styles.ComplaintDetailsContainer}>

            <div className={styles.type}>
                <div className={styles.processStage}>
                    <HistoryIcon className={styles.processIcon} />
                    <div className={styles.processText}>
                        {complaintStatus ? "Resolved" : "Ongoing"}
                    </div>
                </div>

                <div className={styles.complaintSection}>
                    <TypeSpecimenIcon className={styles.sectionIcon} />
                    <div className={styles.sectionText}>{complaintType}</div>
                </div>
            </div>


            <div className={styles.complaintDescription}>
                <div className={styles.heading}>
                    <InfoIcon className={styles.headingIcon} />
                    <div className={styles.headingText}>Description</div>
                </div>
                <div className={styles.descriptionText}>{description}</div>
            </div>

            <div className={styles.dateAndTime}>
                <div className={styles.date}>
                    <CalendarMonthIcon className={styles.dateIcon} />
                    <div className={styles.dateText}>{complaintDate}</div>
                </div>
                <div className={styles.time}>
                    <AccessTimeIcon className={styles.timeIcon} />
                    <div className={styles.timeText}>{complainTime}</div>
                </div>
            </div>

        </div>
    );
}

export default ComplaintDetails;