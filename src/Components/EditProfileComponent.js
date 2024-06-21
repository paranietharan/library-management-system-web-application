import React, { useState } from 'react';
import styles from './style/EditProfileComponentStyle.module.css';
import Button from '@mui/material/Button';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';

function EditProfileComponent({ oldProfilePicture, oldName, oldEmail, oldPhoneNumber, oldIndexNo }) {
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const [email, setEmail] = useState(oldEmail);
  const [phoneNumber, setPhoneNumber] = useState(oldPhoneNumber);

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log('Profile Picture:', profilePicture);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    setEditMode(false); // Turn off edit mode after submission
  };

  return (
    <div className={styles.editProfileContainer}>
      <h2><EditIcon />Edit Profile</h2>
      {!editMode ? (
        <>
          <div className={styles.OldProfileImage}>
            <img src={oldProfilePicture} alt="Old Profile" className={styles.profilePicture} />
          </div>

          <div className={styles.editProfileItems}>
            <p><AccountCircleIcon />{oldName}</p>
          </div>

          <div className={styles.editProfileItems}>
            <label><SchoolIcon />Index No:</label>
            <span>{oldIndexNo}</span>
          </div>

          <div className={styles.editProfileItems}>
            <label><MailOutlineIcon />Email: </label>
            <span>{oldEmail}</span>
          </div>

          <div className={styles.editProfileItems}>
            <label><PhoneAndroidIcon />Phone Number: </label>
            <span>{oldPhoneNumber}</span>
          </div>
          <Button onClick={() => setEditMode(true)} variant="contained" color="primary" className={styles.button}>Edit</Button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Phone Number:</label>
            <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Profile Picture:</label>
            <input type="file" accept="image/*" onChange={handleProfilePictureChange} className={styles.input} />
          </div>
          <Button type="submit" variant="contained" color="primary" className={styles.button}>Save Changes</Button>
          <Button onClick={() => setEditMode(false)} variant="outlined" color="secondary" className={styles.button}>Cancel</Button>
        </form>
      )}
    </div>
  );
}

export default EditProfileComponent;