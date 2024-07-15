import styles from './style/EditProfile.module.css';
import UserProfileLeftSideNavBar from '../Components/UserProfileLeftSideNavBar';
import EditProfileComponent from '../Components/EditProfileComponent';
import http from '../service/http-common';
import React, { useState, useEffect } from 'react';
import getUserID from '../service/GetUserID';

function EditProfile() {
    const [userDetails, setUserDetails] = useState({});
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const userID = getUserID();
        setUserID(userID);
        if (userID) {
            getUserProfileDetails(userID);
        }
    }, []);

    const getUserProfileDetails = async (userId) => {
        try {
            // Get user profile details from the server
            const response = await http.get(`/user/getUserProfileDetails/${userId}`);
            setUserDetails(response.data);
        } catch (error) {
            console.error("Error fetching user profile details:", error);
        }
    };

    const handleProfileUpdate = async () => {
        if (userID) {
            await getUserProfileDetails(userID);
        }
    };

    return (
        <>
            <UserProfileLeftSideNavBar />
            <div className={styles.editProfileContainer}>
                <EditProfileComponent
                    profilePicture={userDetails.profileImg}
                    firstName={userDetails.firstName}
                    lastName={userDetails.lastName}
                    email={userDetails.email}
                    phoneNumber={userDetails.phoneNumber}
                    userId={userID}
                    onProfileUpdate={handleProfileUpdate}
                />
            </div>
        </>
    );
}

export default EditProfile;