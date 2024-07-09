import React from 'react';
import styles from './style/BookReservationDetail.module.css';
import CreateIcon from '@mui/icons-material/Create'; // for author
import CategoryIcon from '@mui/icons-material/Category'; // for category
import InfoIcon from '@mui/icons-material/Info'; // about
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'; // title
import FingerprintIcon from '@mui/icons-material/Fingerprint'; // isbn
import CancelIcon from '@mui/icons-material/Cancel';

function BookReservationDetail({ book, onCancelReservation }) {
    const handleCancelReservation = () => {
        onCancelReservation();
    };

    return (
        <div className={styles.BookReservationDetail}>
            <h1>Book Reservation Detail</h1>
            {console.log("BookReservationDetail: book=", book)}

            <div className={styles.bookDetail}>
                <p><FingerprintIcon /> ISBN: {book.isbn}</p>
                <p><DriveFileRenameOutlineIcon /> Title: {book.title}</p>
                <p><CreateIcon /> Author: {book.author}</p>
                <p><CategoryIcon /> Category: {book.category}</p>
                <p><InfoIcon /> About: {book.about}</p>
            </div>

            <button className={styles.cancelButton} onClick={handleCancelReservation}>
                <CancelIcon /> Cancel Reservation
            </button>
        </div>
    );
}

export default BookReservationDetail;