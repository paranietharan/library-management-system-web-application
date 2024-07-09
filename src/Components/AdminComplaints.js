// src/components/AdminComplaints.js
import React, { useState, useEffect } from 'react';
import complaintService from '../service/complaintService';
import style from './style/AdminComplaints.module.css';

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [solvedcomplaints, setSolvedComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
    fetchResolvedComplaints();
  }, []);

  const fetchResolvedComplaints = async () => {
    try {
      const response = await complaintService.getAllResolvedComplaints();
      setSolvedComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const fetchComplaints = async () => {
    try {
      const response = await complaintService.getAllComplaints();
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleResolve = async (complaintId) => {
    try {
      await complaintService.resolveComplaint(complaintId);
      fetchComplaints();
      fetchResolvedComplaints();
    } catch (error) {
      console.error('Error resolving complaint:', error);
    }
  };

  const handleUnresolve = async (complaintId) => {
    try {
      await complaintService.unresolveComplaint(complaintId);
      fetchComplaints();
      fetchResolvedComplaints();
    } catch (error) {
      console.error('Error unresolving complaint:', error);
    }
  };

  return (
    <div className={style.container}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Complaint ID</th>
            <th>User ID</th>
            <th>Description</th>
            <th>Type</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.complaintId}>
              <td>{complaint.complaintId}</td>
              <td>{complaint.userID}</td>
              <td>{complaint.complaintDescription}</td>
              <td>{complaint.complaintType}</td>
              <td>{complaint.complaintDate}</td>
              <td>{complaint.complaintTime}</td>
              <td>{complaint.resolved ? 'Resolved' : 'Unresolved'}</td>
              <td>
                {complaint.resolved ? (
                  <button onClick={() => handleUnresolve(complaint.complaintId)} className={style.button}>
                    Mark as Unresolved
                  </button>
                ) : (
                  <button onClick={() => handleResolve(complaint.complaintId)} className={style.button}>
                    Mark as Resolved
                  </button>
                )}
              </td>
            </tr>
          ))}

          {/* Display resolved complaints */}
          {solvedcomplaints.map((complaint) => (
            <tr key={complaint.complaintId}>
              <td>{complaint.complaintId}</td>
              <td>{complaint.userID}</td>
              <td>{complaint.complaintDescription}</td>
              <td>{complaint.complaintType}</td>
              <td>{complaint.complaintDate}</td>
              <td>{complaint.complaintTime}</td>
              <td>{complaint.resolved ? 'Resolved' : 'Unresolved'}</td>
              <td>
                {complaint.resolved ? (
                  <button onClick={() => handleUnresolve(complaint.complaintId)} className={style.button}>
                    Mark as Unresolved
                  </button>
                ) : (
                  <button onClick={() => handleResolve(complaint.complaintId)} className={style.button}>
                    Mark as Resolved
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminComplaints;