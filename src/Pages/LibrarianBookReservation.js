import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import styles from './style/LibrarianBookReservationStyle.module.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

function LibrarianBookReservation() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsResponse = await axios.get('http://localhost:8080/reservations/active');
        const reservationsWithDetails = await Promise.all(
          reservationsResponse.data.map(async (reservation) => {
            const [userResponse, bookResponse] = await Promise.all([
              axios.get(`http://localhost:8080/user/getUserProfile/${reservation.memberId}`),
              axios.get(`http://localhost:8080/resource/get/id/${reservation.bookId}`)
            ]);
            return {
              ...reservation,
              user: userResponse.data,
              book: bookResponse.data
            };
          })
        );
        setReservations(reservationsWithDetails);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        setError('Failed to fetch reservations. Please try again later.');
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className={styles.LibrarianBookReservation}>
      <div className={styles.navbar}>
        <LibrarianTopNavBar />
      </div>
      <h1>Librarian Book Reservation</h1>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reservation ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Member Name</TableCell>
                <TableCell>Book Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.reservationId}>
                  <TableCell>{reservation.reservationId}</TableCell>
                  <TableCell>{reservation.status}</TableCell>
                  <TableCell>{`${reservation.user.firstName} ${reservation.user.lastName}`}</TableCell>
                  <TableCell>{reservation.book.title}</TableCell>
                  <TableCell>{reservation.book.author}</TableCell>
                  <TableCell>{reservation.book.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default LibrarianBookReservation;