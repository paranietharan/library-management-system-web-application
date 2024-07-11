import React, { useState } from 'react';
import styles from './style/DeleteMemberComponent.module.css';
import UserSearchComponent from './UserSearchComponent';
import UserDeleteAlertDialog from './UserDeleteAlertDialog';
import httpCommon from '../service/http-common';

function DeleteMemberComponent() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDeleteUser = async () => {
        if (!selectedUser) return;

        handleOpenDialog(); // Open the dialog before deleting
    };

    const confirmDeleteUser = async () => {
        try {
            const response = await httpCommon.delete(`/user/deleteUserProfile/${selectedUser.userID}`);

            if (response.status === 200) {
                console.log('User deleted successfully');
                setSelectedUser(null); // Clear selectedUser state after successful deletion
                handleCloseDialog(); // Close the dialog after deletion
                // Optionally, you can add further logic here, like updating the UI
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className={styles.deleteMemberComponent}>
            <h2>Delete Member</h2>
            <div className={styles.userSearch}>
                <UserSearchComponent onSelectUser={handleSelectUser} />
            </div>
            {selectedUser && (
                <div className={styles.userDetails}>
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
                    <div className={styles.deleteButton}>
                        <button className={styles.deleteButton} onClick={handleDeleteUser}>Delete</button>
                    </div>
                </div>
            )}
            
            <UserDeleteAlertDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                handleAgree={confirmDeleteUser} // Function to call on "Agree" click
            />
        </div>
    );
}

export default DeleteMemberComponent;