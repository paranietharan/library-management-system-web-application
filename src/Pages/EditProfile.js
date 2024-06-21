import styles from './style/EditProfile.module.css';
import UserProfileLeftSideNavBar from '../Components/UserProfileLeftSideNavBar';
import EditProfileComponent from '../Components/EditProfileComponent';

function EditProfile() {
    const oldProfilePicture = 'https://images.pexels.com/photos/7945944/pexels-photo-7945944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    const oldName = 'John Doe';
    const oldEmail = 'example@example.com';
    const oldPhoneNumber = '123-456-7890';
    const oldIndexNo = '214197C';

    return (
        <>
            <UserProfileLeftSideNavBar />

            <div className={styles.editProfileContainer}>
                <EditProfileComponent
                    oldProfilePicture={oldProfilePicture}
                    oldName={oldName}
                    oldEmail={oldEmail}
                    oldPhoneNumber={oldPhoneNumber}
                    oldIndexNo={oldIndexNo}
                />
            </div>
        </>
    );
}

export default EditProfile;
