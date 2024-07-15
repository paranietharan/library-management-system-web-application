import React, { useState, useEffect } from 'react';
import styles from './style/AdminProfileManagementStyle.module.css';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import httpMultipart from '../service/http-multipart';
import httpCommon from '../service/http-common';
import getUserID from '../service/GetUserID';

function AdminProfileManagement() {
    const [adminDetails, setAdminDetails] = useState({
        userID: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        profileImg: ''
    });

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [csvFile, setCsvFile] = useState(null);
    const [profileImg, setProfileImg] = useState(null);
    const [userID, setUserID] = useState('');

    useEffect(() => {
        const userID = getUserID();
        setUserID(userID);
        const fetchAdminDetails = async () => {
            try {
                const response = await httpCommon.get(`/user/getUserProfileDetails/${userID}`);
                setAdminDetails(response.data);
            } catch (error) {
                console.error('There was an error fetching the admin details!', error);
            }
        };

        fetchAdminDetails();
    }, []);

    const handleProfileChange = (field, value) => {
        setAdminDetails({ ...adminDetails, [field]: value });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', adminDetails.firstName);
        formData.append('lastName', adminDetails.lastName);
        formData.append('email', adminDetails.email);
        formData.append('phoneNumber', adminDetails.phoneNumber);
        if (profileImg) {
            formData.append('profileImg', profileImg);
        }

        try {
            const response = await httpMultipart.put(`user/updateUserProfile/${userID}`, formData);
            if (response.data) {
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile.');
            }
        } catch (error) {
            console.error('There was an error updating the profile!', error);
            alert('Error updating profile, please try again later.');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const passwordChangeRequest = {
            oldPassword: currentPassword,
            newPassword: newPassword,
        };

        try {
            const response = await httpCommon.post(`user/changePassword/${userID}`, passwordChangeRequest);
            if (response.data) {
                alert('Password changed successfully!');

                // clear the fields
                setCurrentPassword('');
                setNewPassword('');
            } else {
                alert('Failed to change password. Please check your current password.');
            }
        } catch (error) {
            console.error('There was an error changing the password!', error);
            alert('Error changing password, please try again later.');
        }
    };

    const handleCsvUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', csvFile);

        try {
            const response = await httpMultipart.post('student/upload-students', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data) {
                alert('CSV file uploaded successfully!');
            } else {
                alert('Failed to upload CSV file.');
            }
        } catch (error) {
            console.error('There was an error uploading the CSV file!', error);
            alert('Error uploading CSV file, please try again later.');
        }
    };

    const handleToggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const handleToggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    return (
        <div className={styles.container}>
            <LibrarianTopNavBar />

            <div className={styles.contents}>
                <h1>Admin Profile Management</h1>
                <form className={styles.profileForm} onSubmit={handleProfileSubmit}>
                    <div className={styles.profilePicSection}>
                        <img src={`data:image/png;base64,${adminDetails.profileImg}` || 'default-profile-pic-url'} alt="Profile" className={styles.profilePic} />
                        <input type="file" onChange={(e) => setProfileImg(e.target.files[0])} className={styles.fileInput} />
                    </div>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        value={adminDetails.firstName}
                        onChange={(e) => handleProfileChange('firstName', e.target.value)}
                        className={styles.profileFormItem}
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        value={adminDetails.lastName}
                        onChange={(e) => handleProfileChange('lastName', e.target.value)}
                        className={styles.profileFormItem}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={adminDetails.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className={styles.profileFormItem}
                    />
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        value={adminDetails.phoneNumber}
                        onChange={(e) => handleProfileChange('phoneNumber', e.target.value)}
                        className={styles.profileFormItem}
                    />
                    <Button type="submit" variant="contained" className={styles.submitBtn}>
                        Update Profile
                    </Button>
                </form>

                <h2>Change Password</h2>
                <form className={styles.profileForm} onSubmit={handlePasswordSubmit}>
                    <TextField
                        label="Current Password"
                        type={showCurrentPassword ? 'text' : 'password'}
                        variant="outlined"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className={styles.profileFormItem}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleToggleCurrentPasswordVisibility} edge="end">
                                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="New Password"
                        type={showNewPassword ? 'text' : 'password'}
                        variant="outlined"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={styles.profileFormItem}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleToggleNewPasswordVisibility} edge="end">
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="submit" variant="contained" className={styles.submitBtn}>
                        Change Password
                    </Button>
                </form>

                <h2>Upload Student CSV for Verification</h2>
                <form className={styles.csvUploadForm} onSubmit={handleCsvUpload}>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => setCsvFile(e.target.files[0])}
                        className={styles.csvInput}
                    />
                    <Button type="submit" variant="contained" className={styles.submitBtn}>
                        Upload CSV
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AdminProfileManagement;