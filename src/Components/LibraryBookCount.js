import React from 'react';
import styles from './style/LibraryBookCount.module.css';

function LibraryBookCount(){
    return (
        <div className={styles.bookCountContainer}>
            <div className={styles.TotalBooks}>
                <h3>Total Books</h3>
                <p>100</p>
            </div>

            <div className={styles.AvailableBooks}>
                <h3>Available Books</h3>
                <p>50</p>
            </div>
            
            <div className={styles.IssuedBooks}>
                <h3>Issued Books</h3>
                <p>50</p>
            </div>
        </div>
    )
}

export default LibraryBookCount;