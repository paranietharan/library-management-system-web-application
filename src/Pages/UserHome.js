import React from 'react';
import BookFrame from "../Components/BookFrame";
import styles from './style/userHomeStyle.module.css'; // Import the CSS module
import UserNavbar from '../Components/UserNavBar';
import Footer from '../Components/LibraryFooter';
import { Link } from 'react-router-dom';

function UserHome({ books }) {
    if (!Array.isArray(books)) {
        return <div>Error: books prop is not an array</div>;
    }

    return (
        <div className={styles.home}>
            <UserNavbar />
            <div className={styles.userHome}>
                <div className={styles.bookFrameItem}>

                    {books.map((book) => (
                        <Link to={`/book/${book.id}`} key={book.id}>
                            <div className={styles.bookFrame}>
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
