import React, { useState } from 'react';
import styles from './style/MakeNewComplaintStyle.module.css';
import UserNavBar from '../Components/UserNavBar';
import axios from 'axios';

function MakeNewComplaint() {
  const [complaintType, setComplaintType] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [complaintDate, setComplaintDate] = useState('');
  const [complaintTime, setComplaintTime] = useState('');

  const user_id = "sampleUserID";

  const handleSubmit = (event) => {
    event.preventDefault();
    sendComplaint();

    setComplaintType('');
    setComplaintDescription('');
    setComplaintDate('');
    setComplaintTime('');

    alert('Complaint submitted successfully');
    // forwards to the user home page
    //window.location.href = '/complaint';
  };

  // axios function to send data to backend
  const sendComplaint = () => {
    axios.post('http://localhost:8080/complaint/new', {
      //userID: localStorage.getItem('userID'),
      userID: user_id,
      complaintType: complaintType,
      complaintDescription: complaintDescription,
      complaintDate: complaintDate.toString(),
      complaintTime: complaintTime.toString()
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <UserNavBar />
      <div className={styles.MakeNewComplaintContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.complaintType}>
            <label htmlFor="complaintType">Complaint Type:</label>
            <select id="complaintType" value={complaintType} onChange={(event) => setComplaintType(event.target.value)}>
              <option value="">Select a complaint type</option>
              <option value="noise">Noise</option>
              <option value="cleanliness">Cleanliness</option>
              <option value="staff">Staff</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={styles.complaintDescription}>
            <label htmlFor="complaintDescription">Complaint Description:</label>
            <textarea id="complaintDescription" value={complaintDescription} onChange={(event) => setComplaintDescription(event.target.value)}></textarea>
          </div>

          {/* No need to add location detils */}          
          {/* <div className={styles.complaintLocation}>
            <label htmlFor="complaintLocation">Complaint Location:</label>
            <input type="text" id="complaintLocation" value={complaintLocation} onChange={(event) => setComplaintLocation(event.target.value)} />
          </div> */}

          <div className={styles.complaintDate}>
            <label htmlFor="complaintDate">Complaint Date:</label>
            <input type="date" id="complaintDate" value={complaintDate} onChange={(event) => setComplaintDate(event.target.value)} />
          </div>
          <div className={styles.complaintTime}>
            <label htmlFor="complaintTime">Complaint Time:</label>
            <input type="time" id="complaintTime" value={complaintTime} onChange={(event) => setComplaintTime(event.target.value)} />
          </div>
          <button type="submit">Submit Complaint</button>
        </form>
      </div>
    </>
  );
}

export default MakeNewComplaint;
