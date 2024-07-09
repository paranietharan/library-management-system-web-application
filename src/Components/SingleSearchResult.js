import React from 'react';
import styles from './style/SingleSearchResult.module.css';

const SingleSearchResult = ({ image, title, author, isbn, id }) => {
  return (
    <div className={styles.singleSearchResult}>
      <div className={styles.profilePicture}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.details}>
        <p><strong>Title:</strong> {title}</p>
        <p><strong>Author:</strong> {author}</p>
        <p><strong>ISBN:</strong> {isbn}</p>
      </div>
    </div>
  );
};

export default SingleSearchResult;