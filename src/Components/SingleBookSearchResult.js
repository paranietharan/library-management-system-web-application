import React from 'react';
import styles from './style/SingleSearchResult.module.css';

const SingleBookSearchResult = ({ profileImage, name, bookName, Description, isbn, count, onClick }) => {
  return (
    <div className={styles.singleSearchResult} onClick={onClick}>
      <div className={styles.profilePicture}>
        <img src={profileImage} alt="Profile" />
      </div>
      <div className={styles.details}>
        <p><strong>Book Name:</strong> {name}</p>
        <p><strong>Author Name:</strong> {bookName}</p>
        <p><strong>Description:</strong> {Description}</p>
        <p><strong>ISBN</strong> {isbn}</p>
        <p><strong>Count</strong> {count}</p>
      </div>
    </div>
  );
};

export default SingleBookSearchResult;
// 2 use in edit book component