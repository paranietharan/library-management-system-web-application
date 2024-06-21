import React from 'react';
import styles from './style/SingleSearchResult.module.css';

const SingleSearchResult = ({ profileImage, name, bookName, fineAmount }) => {
  return (
    <div className={styles.singleSearchResult}>
      <div className={styles.profilePicture}>
        <img src={profileImage} alt="Profile" />
      </div>
      <div className={styles.details}>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Book Name:</strong> {bookName}</p>
        <p><strong>Fine Amount:</strong> {fineAmount}</p>
      </div>
    </div>
  );
};

export default SingleSearchResult;