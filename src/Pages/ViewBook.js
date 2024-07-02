import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style/BookViewStyle.module.css';
import SendIcon from '@mui/icons-material/Send';
import UserNavBar from '../Components/UserNavBar';
import TextRating from '../Components/TextRating';
import Footer from '../Components/LibraryFooter';
import ViewBookComments from '../Components/ViewBookComments';

function ViewBook() {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const [ratingValue, setRatingValue] = useState(0);
    const [avgRating, setAvgRating] = useState(0);

    const userId = 'sampleUserID';

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/resource/get/id/${id}`);
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/resource/${id}/comment`);
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        // Fetch initial rating value of user from the database
        const fetchRating = async () => {
            try {
                const response = await fetch(`http://localhost:8080/resource/${id}/rating/${userId}`);
                const data = await response.json();
                setRatingValue(data); // Assuming the response contains a rating field
            } catch (error) {
                console.error('Error fetching rating:', error);
            }
        };

        // fetch average rating of the book
        const fetchAvgRating = async () => {
            try {
                const response = await fetch(`http://localhost:8080/resource/${id}/rating`);
                const data = await response.json();
                setAvgRating(data); // Assuming the response contains a rating field
            } catch (error) {
                console.error('Error fetching average rating:', error);
            }
        };

        fetchBookDetails();
        fetchComments();
        // get user rating(individual) for the book
        fetchRating();
        // get average rating of the book
        fetchAvgRating();
    }, [id]);

    const handleAddComment = async () => {
        try {
            if (!JSON || typeof JSON.stringify !== 'function') {
                throw new Error('JSON.stringify is not available');
            }

            const response = await fetch(`http://localhost:8080/resource/${id}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: userId,
                    comment: newComment
                })
            });

            const newCommentData = await response.json();
            setComments([...comments, newCommentData]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleRatingChange = async (newRating) => {
        try {
            const response = await fetch(`http://localhost:8080/resource/${id}/rating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: userId,
                    rating: newRating
                })
            });

            if (response.ok) {
                console.log('Rating updated successfully');
            } else {
                console.error('Failed to update rating');
            }
        } catch (error) {
            console.error('Error updating rating:', error);
        }
    };

    if (!book.title) {
        return <div>Loading...</div>;
    }

    // const handleRatingChange = (newValue) => {
    //     setRating(newValue);
    // };

    return (
        <>
            <UserNavBar />
            <div className={styles.bookViewContainer}>
                <div className={styles.bookDetails}>
                    <div className={styles.bookImage}>
                        <img
                            src={book.bookImage ? `data:image/png;base64,${book.bookImage}`
                                : `https://easydrawingguides.com/wp-content/uploads/2020/10/how-to-draw-an-open-book-featured-image-1200-1024x672.png`}
                            alt={book.title || "Book Image"}
                            className={styles.book_image}
                        />
                    </div>
                    <div className={styles.bookHeading}>
                        <h1>{book.title}</h1>
                    </div>

                    <div className={styles.bookDetailsContent}>
                        <div className={styles.authorDetails}>
                            <div>
                                <p>Author: {book.author}</p>
                                <p>ISBN: {book.isbn || "Not mentioned"}</p>
                                <p>No of copies : {book.no_of_copies}</p>
                                <p>Category: {book.category}</p>
                            </div>
                        </div>
                        <div className={styles.about}>
                            <p> Description: {book.about}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.commentsAndRating}>
                    <div className={styles.Rating}>
                        <div className={styles.ratingVal}>
                            <TextRating
                                ratingValue={ratingValue}
                                onRatingChange={handleRatingChange}
                            />
                        </div>
                        <div className={styles.averageRating}>
                            <p>Average Rating: {avgRating}</p>
                        </div>
                    </div>

                    <ViewBookComments
                        comments={comments}
                        newComment={newComment}
                        setNewComment={setNewComment}
                        handleAddComment={handleAddComment}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ViewBook;