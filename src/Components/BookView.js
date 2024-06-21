import React from 'react';
import styles from './style/BookView.module.css';

function BookView({ book , borrowedDate}) {
    const { bookImage, description} = book;
    return (
        <div className={styles.bookView}>
            <div className={styles.bookImg}>
                <img src={bookImage} alt="Book Cover" />
            </div>

            <div className={styles.bookInfo}>
                <h1>Description</h1>
                <p>{description}</p>
            </div>

            <div className={styles.borrowedInfo}>
                <p>Borrowed {borrowedDate}</p>
            </div>
        </div>
    );
}

export default BookView;