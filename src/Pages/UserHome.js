import React, { useEffect, useState } from 'react';
import BookFrame from "../Components/BookFrame";
import styles from './style/userHomeStyle.module.css'; // Import the CSS module
import UserNavbar from '../Components/UserNavBar';
import Footer from '../Components/LibraryFooter';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserHome() {
    const [bookDetails, setBookDetails] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/resource/all').then((response) => {
            setBookDetails(response.data);
        }
        );
    }, []);

    return (
        <div className={styles.home}>
            <UserNavbar />
            <div className={styles.userHome}>
                <div className={styles.bookFrameItem}>

                    {bookDetails.map((book) => (
                        <Link to={`/book/${book.resourceId}`} key={book.resourceId}>
                            <div className={styles.bookFrame}>
                                {console.log(book)}
                                <BookFrame book={book} />
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
            <Footer />
        </div >
    );
}


export default UserHome;
