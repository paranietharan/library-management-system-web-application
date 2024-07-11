import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style/BookViewStyle.module.css';
import SendIcon from '@mui/icons-material/Send';
import UserNavBar from '../Components/UserNavBar';
import TextRating from '../Components/TextRating';
import Footer from '../Components/LibraryFooter';
import ViewBookComments from '../Components/ViewBookComments';
import http from '../service/http-common';
import getUserID from '../service/GetUserID';

function ViewBook() {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [ratingValue, setRatingValue] = useState(0);
    const [avgRating, setAvgRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const[userId, setUserId] = useState('');
    //const userId = 'sampleUserID';

    useEffect(() => {
        const userId = getUserID();
        setUserId(userId);
        const fetchBookDetails = async () => {
            try {
                const response = await http.get(`/resource/get/id/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await http.get(`/resource/${id}/comment`);
                setComments(response.data || []);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError(error.message);
            }
        };

        const fetchRating = async () => {
            try {
                const response = await http.get(`/resource/${id}/rating/${userId}`);
                setRatingValue(response.data || 0);
            } catch (error) {
                console.error('Error fetching rating:', error);
                setError(error.message);
            }
        };

        const fetchAvgRating = async () => {
            try {
                const response = await http.get(`/resource/${id}/rating`);
                setAvgRating(response.data || 0);
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
            const response = await http.post(`/resource/${id}/comment`, {
                userID: userId,
                comment: newComment
            });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
            setError(error.message);
        }
    };

    const handleRatingChange = async (newRating) => {
        try {
            await http.post(`/resource/${id}/rating`, {
                userID: userId,
                rating: newRating
            });
            setRatingValue(newRating);
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