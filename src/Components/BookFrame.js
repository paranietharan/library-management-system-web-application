import React from 'react';
import styles from './style/BookFrame.module.css'; // Import the CSS module

function BookFrame({ book }) {
    // Conditionally determine the text color and border color based on book availability
    const availabilityStyle = book.availability ? styles.available : styles.notAvailable;

    return (
        <div className={styles.bookFrame}>
            <img className={styles.bookImage} src={book.bookImage} alt={book.title} />
            <div className={styles.bookInfo}>
                <p>{book.title}</p>
                <p>{book.authorDetails.name}</p>
                <p>{book.authorDetails.publishedDate}</p>
            </div>
            <div className={`${styles.availabilityStatus} ${availabilityStyle}`}>
                <p>{book.availability ? 'Available' : 'Not Available'}</p>
            </div>
        </div>
    );
}

export default BookFrame;
