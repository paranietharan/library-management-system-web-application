import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style/BookViewStyle.module.css';
import SendIcon from '@mui/icons-material/Send';
import UserNavBar from '../Components/UserNavBar';
import TextRating from '../Components/TextRating';
import Footer from '../Components/LibraryFooter';

function ViewBook({ books }) {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [rating, setRating] = useState(3.5);

    useEffect(() => {
        const selectedBook = books.find(book => book.id === parseInt(id));
        if (selectedBook) {
            setBook(selectedBook);
            setComments(selectedBook.comments);
        }
    }, [id, books]);

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            const newCommentObj = {
                id: (comments.length + 1).toString(),
                imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=New+Commenter',
                author: 'New Commenter',
                content: newComment,
                timestamp: new Date().toISOString()
            };
            setComments([...comments, newCommentObj]);
            setNewComment('');
        }
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    const handleRatingChange = (newValue) => {
        setRating(newValue);
        console.log(rating);
    };

    return (
        <>
            <UserNavBar />
            <div className={styles.bookViewContainer}>
                <div className={styles.bookDetails}>
                    <div className={styles.bookImage}>
                        <img src={book.bookImage} alt={book.title} />
                    </div>
                    <div className={styles.bookHeading}>
                        <h1>{book.title}</h1>
                    </div>
                    <div className={styles.authorDetails}>
                        <img src={book.authorDetails.image} alt={book.authorDetails.name} />
                        <div>
                            <p>{book.authorDetails.name}</p>
                            <p>Published Date: {book.authorDetails.publishedDate}</p>
                        </div>
                    </div>
                    <div className={styles.about}>
                        <p>{book.description}</p>
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

                    <h2>Comments</h2>
                    <div className={styles.commentList}>
                        <div className={styles.comments}>
                            {comments.map(comment => (
                                <div key={comment.id} className={styles.comment}>
                                    <img src={comment.imgLink} alt={comment.author} />
                                    <div>
                                        <p>{comment.author}</p>
                                        <p>{comment.content}</p>
                                        <p>{comment.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.writeComment}>
                        <div className={styles.addComment}>
                            <textarea
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                            ></textarea>
                            <button onClick={handleAddComment}>
                                <SendIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ViewBook;
