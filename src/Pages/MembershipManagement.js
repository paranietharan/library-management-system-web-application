import React, { useState } from 'react';

import style from './style/MembershipManagement.module.css';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';

import AddMemberComponent from '../Components/AddMemberComponent';
import DeleteMemberComponent from '../Components/DeleteMemberComponent';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Footer from '../Components/LibraryFooter';

function MembershipManagement() {
    const [showAddMember, setShowAddMember] = useState(true); // 2 control what component 2 display

    const handleAddMemberClick = () => {
        setShowAddMember(true); // Show AddMemberComponent default. so when the page is loaded, AddMemberComponent is displayed
    };

    const handleDeleteMemberClick = () => {
        setShowAddMember(false); // Show DeleteMemberComponent, it one only visible when the delete button is clicked
    };

    return (
        <div className={style.MembershipManagement}>
            <LibrarianTopNavBar />

            <div className={style.contents}>
                <div className={style.buttongroup}>
                    {/* 4 add members */}
                    <button className={style.addbutton} onClick={handleAddMemberClick}>
                        <PersonAddIcon />
                        <p>Add Membership</p>
                    </button>

                    {/*4 Edit member details */}
                    <button className={style.editButton}>
                        <BorderColorIcon />
                        <p>Edit members</p>
                    </button>

                    {/* 4 delete members */}
                    <button className={style.removebutton} onClick={handleDeleteMemberClick}>
                        <PersonRemoveIcon />
                        <p>Remove Membership</p>
                    </button>

                </div>
                {showAddMember ? <AddMemberComponent /> : <DeleteMemberComponent />}
            </div>

            <Footer />
        </div>
    );
}

export default MembershipManagement;