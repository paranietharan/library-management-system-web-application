import styles from './style/BookReservation.module.css';
import UserNavBar from '../Components/UserNavBar';
import BookSearchComponent from '../Components/BookSearchComponent';
import BookReservationDetail from '../Components/BookReservationDetail';
import { useState, useEffect } from 'react';
import http from '../service/http-common';
import getUserID from '../service/GetUserID';

function BookReservation() {
    //const userId = 'sampleUserId';
    const [selectedBook, setSelectedBook] = useState(null);
    const [reservationStatus, setReservationStatus] = useState(null);
    const [reservationBookDetails, setReservationBookDetails] = useState(null);
    const [error, setError] = useState(null);
    const[userId, setUserId] = useState('');

    const handleSelectBook = (book) => {
        setSelectedBook(book);
    };

    useEffect(() => {
        const userId = getUserID();
        setUserId(userId);
        checkUserReservationStatus(userId);
    }, [userId]);

    useEffect(() => {
        if (reservationStatus) {
            fetchReservationBookDetails(reservationStatus.bookId);
        }
    }, [reservationStatus]);

    const checkUserReservationStatus = async (userId) => {
        try {
            const response = await http.get(`reservations/active/user/${userId}`);
            setReservationStatus(response.data);
        } catch (error) {
            console.error("Error getting user reservation status:", error);
            setError("Failed to fetch reservation status.");
        }
    };

    const fetchReservationBookDetails = async (resourceId) => {
        try {
            const response = await http.get(`/resource/get/id/${resourceId}`);
            setReservationBookDetails(response.data);
        } catch (error) {
            console.error("Error getting resource details:", error);
            //setError("Failed to fetch resource details.");
        }
    };

    const handleReserveBook = async () => {
        if (selectedBook) {
            try {
                await http.post(`/reservations/reserve`, null, {
                    params: { resourceId: selectedBook.resourceId, userId }
                });
                alert('Reservation successful!');
                checkUserReservationStatus(userId);
            } catch (error) {
                console.error("Error reserving book:", error);
                setError("Failed to reserve the book.");
            }
        }
    };

    const handleCancelReservation = async () => {
        if (reservationStatus.reservationId) {
            try {
                await http.post(`/reservations/cancel?reservationId=${reservationStatus.reservationId}`);
                setReservationStatus(null);
                setReservationBookDetails(null);
                alert('Reservation cancelled successfully!');
            } catch (error) {
                console.error("Error cancelling reservation:", error);
                setError("Failed to cancel the reservation.");
            }
        } else {
            console.error("No reservation ID available");
            setError("Unable to cancel reservation: No reservation ID found.");
        }
    };

    return (
        <div className={styles.BookReservationPage}>
            <div className={styles.navbar}>
                <UserNavBar />
            </div>

            <div className={styles.body}>
                {/* {error && <div className={styles.error}>{error}</div>} */}

                {reservationStatus ? (
                    <div className={styles.ReservationStatus}>
                        {reservationBookDetails ? (
                            <BookReservationDetail book={reservationBookDetails} onCancelReservation={handleCancelReservation} />
                        ) : (
                            <p>Loading book details...</p>
                        )}
                    </div>
                ) : (
                    <div className={styles.BookReservationContainer}>
                        <div className={styles.BookSearch}>
                            <BookSearchComponent onSelectBook={handleSelectBook} />
                        </div>
                        {selectedBook && (
                            <div className={styles.BookDetailsContainer}>
                                <div className={styles.BookDetails}>
                                    <h2>Selected Book</h2>
                                    <p>Title: {selectedBook.title}</p>
                                    <p>Author: {selectedBook.author}</p>
                                    <p>ISBN: {selectedBook.isbn}</p>
                                    <p>Category: {selectedBook.category}</p>
                                </div>
                                <button className={styles.ReserveButton} onClick={handleReserveBook}>Reserve Book</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookReservation;