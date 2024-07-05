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

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = 'sampleUserID';

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/resource/get/id/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setBook(data);
                } else {
                    throw new Error(data.error || 'Failed to fetch book details');
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/resource/${id}/comment`);
                const data = await response.json();
                if (response.ok) {
                    setComments(data || []);
                } else {
                    throw new Error(data.error || 'Failed to fetch comments');
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError(error.message);
            }
        };

        const fetchRating = async () => {
            try {
                const response = await fetch(`http://localhost:8080/resource/${id}/rating/${userId}`);
                const data = await response.json();
                if (response.ok) {
                    setRatingValue(data || 0);
                } else {
                    throw new Error(data.error || 'Failed to fetch rating');
                }
            } catch (error) {
                console.error('Error fetching rating:', error);
                setError(error.message);
            }
        };

        const fetchAvgRating = async () => {
            try {
                const response = await fetch(`http://localhost:8080/resource/${id}/rating`);
                const data = await response.json();
                if (response.ok) {
                    setAvgRating(data || 0);
                } else {
                    throw new Error(data.error || 'Failed to fetch average rating');
                }
            } catch (error) {
                console.error('Error fetching average rating:', error);
                setError(error.message);
            }
        };

        fetchBookDetails();
        fetchComments();
        fetchRating();
        fetchAvgRating();
    }, [id]);

    const handleAddComment = async () => {
        try {
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
            if (response.ok) {
                setComments([...comments, newCommentData]);
                setNewComment('');
            } else {
                throw new Error(newCommentData.error || 'Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            setError(error.message);
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
                setRatingValue(newRating);
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update rating');
            }
        } catch (error) {
            console.error('Error updating rating:', error);
            setError(error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <>
            <UserNavBar />
            <div className={styles.bookViewContainer}>
                <div className={styles.bookDetails}>
                    <div className={styles.bookImage}>
                        <img
                            // src={book.bookImg ? `data:image/png;base64,${book.bookImg}`
                            //     : `https://easydrawingguides.com/wp-content/uploads/2020/10/how-to-draw-an-open-book-featured-image-1200-1024x672.png`}
                            src={`data:image/png;base64,${book.bookImg}`}
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
                            <p>Description: {book.about}</p>
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