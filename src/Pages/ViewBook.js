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
    const [rating, setRating] = useState(3.5);

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

        const fetchRating = async () => {
            try {
                const response = await fetch(`http://localhost:8080/resource/get/id/${id}/rating`);
                const data = await response.json();
                setRating(data);
            } catch (error) {
                console.error('Error fetching rating:', error);
            }
        };

        fetchBookDetails();
        fetchComments();
        //fetchRating();
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

    if (!book.title) {
        return <div>Loading...</div>;
    }

    const handleRatingChange = (newValue) => {
        setRating(newValue);
    };

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
                    <div className={styles.authorDetails}>
                        <div>
                            <p>Author: {book.author}</p>
                            <p>ISBN: {book.isbn || "Not mentioned"}</p>
                        </div>
                    </div>
                    <div className={styles.about}>
                        <p> Description: {book.about}</p>
                    </div>
                </div>

                <div className={styles.commentsAndRating}>
                    <div className={styles.Rating}>
                        <div className={styles.ratingVal}>
                            <TextRating onRatingChange={handleRatingChange} />
                        </div>
                        <div className={styles.averageRating}>
                            <p>Average Rating: {book.averageRating}</p>
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