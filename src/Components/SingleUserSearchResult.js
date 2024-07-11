import React from 'react';
import style from './style/SingleUserSearchResult.module.css';

function SingleUserSearchResult({ user, onSelectUser }) {
    return (
        <>
            <div className={style.result} onClick={() => onSelectUser(user)}>
                <img src={
                    user.profileImg ?
                        `data:image/png;base64,${user.profileImg}` :
                        "https://www.gravatar.com/avatar/"
                } alt="Profile" />

                <h3>{user.firstName + " " + user.lastName}</h3>
            </div>
        </>
    );
}

export default SingleUserSearchResult;