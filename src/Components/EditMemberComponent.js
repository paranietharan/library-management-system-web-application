import React, { useState } from 'react';
import styles from './style/EditMemberComponent.module.css';
import UserSearchComponent from './UserSearchComponent';
import Button from '@mui/material/Button';
import httpMultipart from '../service/http-multipart';

function EditMemberComponent() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        Email: '',
        phoneNumber: ''
    });
    const [newProfilePicture, setNewProfilePicture] = useState(null);

    const handleEditorView = () => {
        setEditMode(!editMode);
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setFormValues({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleProfilePictureChange = (e) => {
        setNewProfilePicture(e.target.files[0]);
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

            const response = await httpMultipart.put(`/user/updateUserProfile/${selectedUser.userID}`, formData);

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
        <div className={styles.EditMemberComponent}>
            <div className={styles.title}>
                <h1>Edit Member</h1>
            </div>

            <div className={styles.userSearch}>
                <UserSearchComponent onSelectUser={handleSelectUser} />
            </div>

            {!editMode && selectedUser && (
                <div className={styles.userDetails} onClick={handleEditorView}>
                    <div className={styles.userDetail}>
                        <img
                            src={
                                selectedUser.profileImg ?
                                    `data:image/png;base64,${selectedUser.profileImg}` :
                                    "https://www.gravatar.com/avatar/"
                            }
                            alt="Profile"
                            className={styles.profileImg}
                        />
                        <div className={styles.userInfo}>
                            <h3>{selectedUser.firstName} {selectedUser.lastName}</h3>
                            <p>{selectedUser.email}</p>
                            <p>{selectedUser.phoneNumber}</p>
                        </div>
                    </div>
                </div>
            )}

            {editMode && (
                <form onSubmit={handleSubmit} className={styles.editor}>
                    <div className={styles.formGroup}>
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formValues.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formValues.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="Email"
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formValues.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Profile Picture:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary">Save Changes</Button>
                    <Button onClick={() => setEditMode(false)} variant="outlined" color="secondary">Cancel</Button>
                </form>
            )}
        </div>
    );
}

export default EditMemberComponent;