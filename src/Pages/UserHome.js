import React, { useEffect, useState } from 'react';
import BookFrame from "../Components/BookFrame";
import styles from './style/userHomeStyle.module.css'; // Import the CSS module
import UserNavbar from '../Components/UserNavBar';
import Footer from '../Components/LibraryFooter';
import { Link } from 'react-router-dom';
import http from '../service/http-common';

function UserHome() {
    const [bookDetails, setBookDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        http.get('/resource/all')
            .then((response) => {
                setBookDetails(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching book details:', err);
                setError('Failed to fetch book details.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.home}>
            <UserNavbar />
            <div className={styles.userHome}>
                <div className={styles.bookFrameItem}>
                    {bookDetails.map((book) => (
                        <Link to={`/book/${book.resourceId}`} key={book.resourceId}>
                            <div className={styles.bookFrame}>
                                <BookFrame book={book} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserHome;