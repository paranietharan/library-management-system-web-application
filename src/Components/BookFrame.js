import React from 'react';
import styles from './style/BookFrame.module.css';
import { CardMedia } from '@mui/material';

function BookFrame({ book }) {
    // Conditionally determine the text color and border color based on book availability
    // check the book is avilable or not
    const availabilityStyle = book.no_of_copies >= 1 ? styles.available : styles.notAvailable;

    return (
        <div className={styles.bookFrame}>
            {/* <img
                className={styles.bookImage}
                src={`data:image/jpeg;base64,${book.bookImg}`}
                alt={book.title}
            /> */}
            <CardMedia
                component="img"
                height="140"
                image={`data:image/jpeg;base64,${book.bookImg}`}
                alt="Article Image"
                style={{ width: '25vw', maxHeight: '250px', height: 'auto' }}
            />
            <div className={styles.bookInfo}>
                <p>{book.title}</p>
                <p>{book.author}</p>
            </div>
            <div className={`${styles.availabilityStatus} ${availabilityStyle}`}>
                <p>{book.no_of_copies > 0 ? 'Available' : 'Not Available'}</p>
            </div>
        </div>
    );
}

export default BookFrame;
