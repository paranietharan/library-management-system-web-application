import styles from './style/ComplaintStyle.module.css';
import UserNavBar from '../Components/UserNavBar';
import ComplaintDetails from '../Components/ComplaintDetails';
import MakeComplaint from '../Components/MakeComplaint';
import { useEffect, useState } from 'react';
import http from '../service/http-common';
import getUserID from '../service/GetUserID';

function Complaint() {
    const [complaints, setComplaints] = useState([]);
    const [userId, setUserId] = useState('');
    //const userId = "sampleUserID";

    // get complaints raised by the user
    useEffect(() => {
        const userId = getUserID();
        setUserId(userId);
        http.get(`/complaint/get?userID=${userId}`)
            .then((response) => {
                setComplaints(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userId]);

    return (
        <>
            <UserNavBar />
            <div className={styles.complaintContainer}>
                <div className={styles.complaints}>
                    {complaints.length === 0 && <h1>No Complaints</h1>}
                    {complaints.map((complaint) => (
                        <ComplaintDetails
                            key={complaint.complaintId}
                            complaintID={complaint.complaintId}
                            complaintType={complaint.complaintType}
                            complaintDescription={complaint.complaintDescription}
                            complaintDate={complaint.complaintDate}
                            complainTime={complaint.complaintTime}
                            complaintStatus={complaint.resolved}
                        />
                    ))}
                </div>
                <div className={styles.complaintFooter}>
                    <MakeComplaint />
                </div>
            </div>
        </>
    );
}

export default Complaint;