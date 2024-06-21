import React from 'react';
import UserProfileLeftSideNavBar from '../Components/UserProfileLeftSideNavBar';
import styles from './style/LendingHistory.module.css';
import BookView from '../Components/BookView'; // Import the BookView component

function LendingHistory() {
    // Dummy lending history data (array of books with borrowed dates)
    const lendingHistory = [
        {
            book: {
                bookImage: 'https://images.pexels.com/photos/4245048/pexels-photo-4245048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                description: 'Description of Book 1',
            },
            borrowedDate: '2023-01-15',
        },
        {
            book: {
                bookImage: 'https://images.pexels.com/photos/4217009/pexels-photo-4217009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=s',
                description: 'Description of Book 2',
            },
            borrowedDate: '2023-02-20',
        },
        // Add more lending history items as needed
    ];

    return (
        <>
            <UserProfileLeftSideNavBar />
            <div className={styles.container}>
                <div className={styles.contents}>
                    <h1 className={styles.heading}>Lending history</h1>

                    <div className={styles.bookList}>
                        {lendingHistory.map((item, index) => (
                            <div className={styles.listItem}>
                                <BookView key={index} book={item.book} borrowedDate={item.borrowedDate} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default LendingHistory;