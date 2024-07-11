import React, { useState } from 'react';

import style from './style/MembershipManagement.module.css';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import AddMemberComponent from '../Components/AddMemberComponent';
import DeleteMemberComponent from '../Components/DeleteMemberComponent';
import EditMemberComponent from '../Components/EditMemberComponent';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Footer from '../Components/LibraryFooter';

function MembershipManagement() {
    const [displayComponent, setDisplayComponent] = useState('addMember');

    const handleButtonClick = (componentName) => {
        setDisplayComponent(componentName);
    };

    return (
        <div className={style.MembershipManagement}>
            <LibrarianTopNavBar />

            <div className={style.contents}>
                <div className={style.buttongroup}>
                    {/* 4 add members */}
                    <button className={style.addbutton} onClick={() => { setDisplayComponent('addMember') }}>
                        <PersonAddIcon />
                        <p>Add Membership</p>
                    </button>

                    {/*4 Edit member details */}
                    <button className={style.editButton} onClick={() => { setDisplayComponent('editMember') }}>
                        <BorderColorIcon />
                        <p>Edit members</p>
                    </button>

                    {/* 4 delete members */}
                    <button className={style.removebutton} onClick={() => { setDisplayComponent('delMember') }}>
                        <PersonRemoveIcon />
                        <p>Remove Membership</p>
                    </button>

                </div>

                <div className={style.component}>
                    {displayComponent === 'addMember' && <AddMemberComponent />}
                    {displayComponent === 'editMember' && <EditMemberComponent />}
                    {displayComponent === 'delMember' && <DeleteMemberComponent />}
                </div>
            </div>

            
        </div>
    );
}

export default MembershipManagement;