import { useState } from 'react';
import http from '../service/http-common';
import Styles from './style/MemberSearchComponent.module.css';
import SingleMemberSearchResult from './SingleMemberSearchResult';

function MemberSearchComponent({ onSelectMember }) {
    const [userID, setUserID] = useState('');
    const [member, setMember] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const handleSearch = async () => {
        try {
            const response = await http.get(`/user/getUserProfile/${userID}`);
            if (response.data) {
                setMember(response.data);
                setNotFound(false);
            } else {
                setMember(null);
                setNotFound(true);
            }
        } catch (error) {
            console.error("There was an error fetching the member data!", error);
            setMember(null);
            setNotFound(true);
        }
    };

    return (
        <div className={Styles.container}>
            <div className={Styles.searchBar}>
                <input 
                    type="text" 
                    placeholder="Search for members" 
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className={Styles.searchResults}>
                {member && <SingleMemberSearchResult member={member} onSelectMember={onSelectMember} />}
                {notFound && <p>User not available</p>}
            </div>
        </div>
    );
}

export default MemberSearchComponent;