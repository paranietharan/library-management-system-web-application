import styles from './style/EditMemberComponent.module.css';
import UserSearchComponent from './UserSearchComponent';
import { useState } from 'react';

function EditMemberComponent() {

    const [selectedUser, setSelectedUser] = useState(null);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className={styles.EditMemberComponent}>
            <div className={styles.title}>
                <h1>Edit Member</h1>
            </div>

            <div className={styles.userSearch}>
                <UserSearchComponent onSelectUser={handleSelectUser} />
            </div>
        </div>
    );
}

export default EditMemberComponent;