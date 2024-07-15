import React, { useState, useEffect } from 'react';
import styles from './style/EditProfileComponentStyle.module.css';
import Button from '@mui/material/Button';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import httpMultipart from '../service/http-multipart';

function EditProfileComponent({ profilePicture, firstName, lastName, email, phoneNumber, userId, onProfileUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [formValues, setFormValues] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
    phoneNumber: phoneNumber || ''
  });

  useEffect(() => {
    setFormValues({
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      phoneNumber: phoneNumber || ''
    });
  }, [firstName, lastName, email, phoneNumber]);

  const handleProfilePictureChange = (e) => {
    setNewProfilePicture(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('firstName', formValues.firstName);
      formData.append('lastName', formValues.lastName);
      formData.append('email', formValues.email);
      formData.append('phoneNumber', formValues.phoneNumber);

      if (newProfilePicture) {
        formData.append('profileImg', newProfilePicture);
      }

      const response = await httpMultipart.put(`/user/updateUserProfile/${userId}`, formData);

      if (response.status === 200) {
        console.log('User profile updated successfully');
        // Call the onProfileUpdate function to refresh user details in the parent component
        onProfileUpdate();
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
            <input
              type="text"
              name="firstName"
              value={formValues.firstName}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleInputChange}
              className={styles.input}
            />
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