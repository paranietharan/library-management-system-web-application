import React from 'react';
import style from './style/SingleUserSearchResult.module.css';

function SingleUserSearchResult({ user, onSelectUser }) {
    return (
        <>
            <div className={style.result} onClick={() => onSelectUser(user)}>
                {user.profileImg && (
                    <img src={`data:image/png;base64,${user.profileImg}`} alt="Profile" className={style.profileImg} />
                )}

                {user.firstName && user.lastName && (
                    <h3>{user.firstName + " " + user.lastName}</h3>
                )}
            </div>
        </>
    );
}

export default SingleUserSearchResult;