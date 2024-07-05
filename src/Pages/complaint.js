import styles from './style/ComplaintStyle.module.css';
import UserNavBar from '../Components/UserNavBar';
import ComplaintDetails from '../Components/ComplaintDetails';
import axios from 'axios';
import MakeComplaint from '../Components/MakeComplaint';
import { useEffect, useState } from 'react';

function Complaint() {

    const [complaints, setComplaints] = useState([]);

    const userId = "sampleUserID";
    // get complaints raised by the user
    useEffect(() => {
        //axios.get('http://localhost:8080/complaint/user/' + localStorage.getItem('userID'))
        axios.get(`http://localhost:8080/complaint/get?userID=${userId}`)
            .then((response) => {
                //console.log(response.data);
                setComplaints(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



    return (
        <>
            <UserNavBar />
            <div className={styles.complaintContainer}>
                <div className={styles.complaints}>
                    {
                        complaints.length === 0 && <h1>No Complaints</h1>
                    }
                    {
                        complaints.map((complaint) => {
                            return (
                                <ComplaintDetails
                                    key={complaint.complaintId}
                                    complaintID={complaint.complaintId}
                                    complaintType={complaint.complaintType}
                                    complaintDescription={complaint.complaintDescription}
                                    complaintDate={complaint.complaintDate}
                                    complainTime={complaint.complaintTime}
                                    complaintStatus={complaint.resolved}
                                />
                            );
                        })
                    }
                </div>


                <div className={styles.complaintFooter}>
                    <MakeComplaint />
                </div>
            </div>
        </>
    );
}

export default Complaint;