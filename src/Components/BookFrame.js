import React from 'react';
import styles from './style/BookFrame.module.css'; // Import the CSS module

function BookFrame({ book }) {
    // Conditionally determine the text color and border color based on book availability
    // check the book is avilable or not
    const availabilityStyle = book.no_of_copies >= 1 ? styles.available : styles.notAvailable;

    return (
        <div className={styles.bookFrame}>
            <img className={styles.bookImage} src={`data:image/jpeg;base64,${book.bookImg}`} alt={book.title} />
            <div className={styles.bookInfo}>
                <p>{book.title}</p>
                <p>{book.author}</p>
            </div>
            <div className={`${styles.availabilityStatus} ${availabilityStyle}`}>
                <p>{book.availability ? 'Available' : 'Not Available'}</p>
            </div>
        </div>
    );
}

export default BookFrame;
