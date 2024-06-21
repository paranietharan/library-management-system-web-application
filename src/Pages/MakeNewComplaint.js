import React, { useState } from 'react';
import styles from './style/MakeNewComplaintStyle.module.css';
import UserNavBar from '../Components/UserNavBar';

function MakeNewComplaint() {
  const [complaintType, setComplaintType] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [complaintLocation, setComplaintLocation] = useState('');
  const [complaintDate, setComplaintDate] = useState('');
  const [complaintTime, setComplaintTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here
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
          <div className={styles.complaintLocation}>
            <label htmlFor="complaintLocation">Complaint Location:</label>
            <input type="text" id="complaintLocation" value={complaintLocation} onChange={(event) => setComplaintLocation(event.target.value)} />
          </div>
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
