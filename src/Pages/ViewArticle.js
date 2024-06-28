import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styles from './style/ViewArticle.module.css';
import HoverRating from '../Components/HoverRating';
import ViewComments from '../Components/ViewComments';
import ArticleBreadCrumbs from '../Components/ArticleBreadCrumbs';
import Footer from '../Components/LibraryFooter';
import axios from 'axios';

function ViewArticle() {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [authorDetails, setAuthorDetails] = useState(null);

    const [comment, setComment] = useState('');

    const [UserRating, setUserRating] = useState(5.0);

    const userId = "sampleUserID"; // Hardcoded user ID for now, replace with actual user ID

    // Function to handle comment submission
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/article/${userId}/comment`, {
                comment,
                commenterId: userId,
                articleId
            });
            console.log('Comment submitted successfully:', response.data);
            // Optionally, reset the comment textarea or show a success message
            setComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
            // Handle error state or show error message to the user
        }
    };

    // Function to handle rating change
    const handleRatingChange = async (newRating) => {
        try {
            const response = await axios.post(`http://localhost:8080/article/${articleId}/rating`, {
                userID: userId,
                rating: newRating
            });
            console.log('Rating submitted successfully:', response.data);
            // Optionally, show a success message to the user
        } catch (error) {
            console.error('Error submitting rating:', error);
            // Handle error state or show error message to the user
        }
    };

    useEffect(() => {
        const fetchArticleDetails = async () => {
            try {
                // Fetch article details
                const articleResponse = await fetch(`http://localhost:8080/article/view/${articleId}`);
                if (!articleResponse.ok) {
                    const errorData = await articleResponse.json();
                    throw new Error(errorData.error || 'Article not found');
                }
                const articleData = await articleResponse.json();
                setArticle(articleData);

                // Fetch comments
                const commentsResponse = await fetch(`http://localhost:8080/article/${articleId}/comment`);
                if (commentsResponse.ok) {
                    const commentsData = await commentsResponse.json();
                    setComments(commentsData);
                } else {
                    setComments([]);
                }

                // Fetch average rating
                const ratingResponse = await fetch(`http://localhost:8080/article/${articleId}/rating`);
                if (ratingResponse.ok) {
                    const ratingData = await ratingResponse.json();
                    setAverageRating(ratingData);
                } else {
                    setAverageRating(null);
                }

                // fetch author details
                const authorResponse = await fetch(`http://localhost:8080/user/getUserProfile/${articleData.userID}`);
                if (authorResponse.ok) {
                    const authorData = await authorResponse.json();
                    setAuthorDetails(authorData);
                } else {
                    setAuthorDetails(null);
                }
            } catch (error) {
                console.error('Error fetching article details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const getUserRating = async () => {
            try {
                const response = await fetch(`http://localhost:8080/article/${articleId}/rating/${userId}`);
                if (response.ok) {
                    const ratingData = await response.json();
                    setUserRating(ratingData);
                } else {
                    setUserRating(null);
                }
            } catch (error) {
                console.error('Error fetching user rating:', error);
            }
        };

        fetchArticleDetails();
        getUserRating();
    }, [articleId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!article) {
        return <div>Article not found!</div>;
    }

    const { articleID, userID, title, body, articleImg } = article;

    return (
        <>

            <div className={styles.navbar}>
                <ArticleBreadCrumbs className={styles.breadCrumbs} />
            </div>

            <div className={styles.ViewArticle}>
                <div className={styles.content}>
                    {/* Details of the article */}
                    {articleImg && <img src={`data:image/png;base64,${articleImg}`} alt={title || "Article Image"} className={styles.articleImage} />}

                    <div className={styles.authorSection}>
                        <div className={styles.authorDetails}>
                            {/* if author image avilable display that else display default image */}
                            {authorDetails?.profileImg && <img src={authorDetails.profileImg} alt="Author" className={styles.authorImage} />}
                            {!authorDetails?.profileImg && <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Author" className={styles.authorImage} />}

                            {/*author name */}
                            <p>{authorDetails.firstName + " " + authorDetails.lastName}</p>
                        </div>
                        <div className={styles.publishedDate}>
                            {/* <p>{authorDetails?.publishedDate || "Publish Date Not Available"}</p> */}
                        </div>
                    </div>

                    <div className={styles.articleHeader}>
                        <h1 className={styles.articleTitle}>{title}</h1>
                    </div>

                    <div className={styles.articleContent}>
                        {/* {contents?.paragraphs?.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        )) || <p>No Content Available</p>} */}
                        <p>{body}</p>
                    </div>
                </div>

                {/* Details from comments and Rating */}
                <div className={styles.RatingAndCommentSection}>
                    {/* Rating Section */}
                    <div className={styles.ratingSection}>
                        <p>Average Rating: {averageRating}</p>
                        <HoverRating ratingValue={UserRating} onRatingChange={handleRatingChange} />
                    </div>

                    <div className={styles.commentSection}>
                        {/* Write a comment */}
                        <div className={styles.writeComment}>
                            <textarea
                                placeholder="Write a comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                        {/* List all comments */}
                        <div className={styles.viewComments}>
                            <ViewComments comments={comments || []} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

ViewArticle.propTypes = {
    articleId: PropTypes.string.isRequired,
};

export default ViewArticle;