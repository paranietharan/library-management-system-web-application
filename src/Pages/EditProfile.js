import styles from './style/EditProfile.module.css';
import UserProfileLeftSideNavBar from '../Components/UserProfileLeftSideNavBar';
import EditProfileComponent from '../Components/EditProfileComponent';
import http from '../service/http-common';
import React, { useState, useEffect } from 'react';

function EditProfile() {

    const[userDetails, setUserDetails] = useState({});
    const userID = 'sampleUserID'; // Replace with actual logic to get userID

    // Fetch user profile details from backend
    useEffect(() => {
        getUserProfileDetails(userID);
    }, []);

    const getUserProfileDetails= async (userId) => {
        try{
            // Get user profile details from the server
            const response = await http.get(`/user/getUserProfileDetails/${userId}`);
            setUserDetails(response.data);
        } catch (error) {
            console.error("Error fetching user profile details:", error);
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

                />
            </div>
        </>
    );
}

export default EditProfile;
