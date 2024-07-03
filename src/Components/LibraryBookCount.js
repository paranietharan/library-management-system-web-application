import React from 'react';
import styles from './style/LibraryBookCount.module.css';

function LibraryBookCount({TotalBooks, IssuedBooks}){
    return (
        <div className={styles.bookCountContainer}>
            <div className={styles.TotalBooks}>
                <h3>Total Books</h3>
                <p>{TotalBooks + IssuedBooks}</p>
            </div>

            <div className={styles.AvailableBooks}>
                <h3>Available Books</h3>
                <p>{TotalBooks}</p>
            </div>
            
            <div className={styles.IssuedBooks}>
                <h3>Issued Books</h3>
                <p>{IssuedBooks}</p>
            </div>
        </div>
    )
}

export default LibraryBookCount;