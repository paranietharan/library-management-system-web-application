import React, { useState } from 'react';
import axios from 'axios';
import styles from './style/EditProfileComponentStyle.module.css';
import Button from '@mui/material/Button';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';

function EditProfileComponent({ profilePicture, firstName, lastName, email, phoneNumber, userId }) {
  const [editMode, setEditMode] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);

  const handleProfilePictureChange = (e) => {
    setNewProfilePicture(e.target.files[0]);
  };

  const handleFirstNameChange = (e) => {
    setNewFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setNewLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('firstName', newFirstName);
      formData.append('lastName', newLastName);
      formData.append('Email', newEmail);
      formData.append('phoneNumber', newPhoneNumber);

      if (newProfilePicture) {
        formData.append('profileImg', newProfilePicture);
      }

      const response = await axios.put(`http://localhost:8080/user/updateUserProfile/${userId}`, formData);

      if (response.status === 200) {
        console.log('User profile updated successfully');
        // You may want to update the user details in the parent component here
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }

    setEditMode(false);
  };

  return (
    <div className={styles.editProfileContainer}>
      <h2><EditIcon />Edit Profile</h2>
      {!editMode ? (
        <>
          <div className={styles.OldProfileImage}>
            <img src={`data:image/png;base64,${profilePicture}`} alt="Old Profile" className={styles.profilePicture} />
          </div>

          <div className={styles.editProfileItems}>
            <p><AccountCircleIcon />{firstName} {lastName}</p>
          </div>

          <div className={styles.editProfileItems}>
            <label><MailOutlineIcon />Email: </label>
            <span>{email}</span>
          </div>

          <div className={styles.editProfileItems}>
            <label><PhoneAndroidIcon />Phone Number: </label>
            <span>{phoneNumber}</span>
          </div>
          <Button onClick={() => setEditMode(true)} variant="contained" color="primary" className={styles.button}>Edit</Button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>First Name:</label>
            <input type="text" value={newFirstName} onChange={handleFirstNameChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Last Name:</label>
            <input type="text" value={newLastName} onChange={handleLastNameChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input type="email" value={newEmail} onChange={handleEmailChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Phone Number:</label>
            <input type="text" value={newPhoneNumber} onChange={handlePhoneNumberChange} className={styles.input} />
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