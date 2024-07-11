import { useState } from 'react';
import http from '../service/http-common';
import style from './style/UserSearchComponent.module.css';
import SingleUserSearchResult from './SingleUserSearchResult';

function UserSearchComponent({ onSelectUser }) {
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const handleSearch = async () => {
        try {
            const response = await http.get(`/user/getUserProfileDetails/${userName}`);
            if (response.data) {
                setUser(response.data);
                setNotFound(false);
            } else {
                setUser(null);
                setNotFound(true);
            }
        } catch (error) {
            console.error("There was an error fetching the user data!", error);
            setUser(null);
            setNotFound(true);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.searchBar}>
                <input
                    type="text"
                    placeholder="Search for users"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={handleSearch} className={style.searchButton}>Search</button>
            </div>

            <div className={style.searchResults}>
                {user &&
                    <SingleUserSearchResult key={user.userId} user={user} onSelectUser={onSelectUser} />
                }
                {notFound && <p>User not available</p>}
            </div>
        </div>
    );
}

export default UserSearchComponent;