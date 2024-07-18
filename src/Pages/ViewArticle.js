import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styles from './style/ViewArticle.module.css';
import HoverRating from '../Components/HoverRating';
import ViewComments from '../Components/ViewComments';
import ArticleBreadCrumbs from '../Components/ArticleBreadCrumbs';
import Footer from '../Components/LibraryFooter';
import http from '../service/http-common'; // Import custom Axios instance
import getUserID from "../service/GetUserID";

function ViewArticle() {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [authorDetails, setAuthorDetails] = useState(null);
    const [comment, setComment] = useState('');
    const [userRating, setUserRating] = useState(5.0);
    const [userId, setuserId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const userID = getUserID();
            setuserId(userID);
            await fetchArticleDetails();
            await fetchComments();
            await fetchAverageRating();
            await fetchUserRating(userID);
        };
        fetchData();
    }, [articleId]);

    // Function to handle comment submission
    const handleSubmit = async () => {
        // check the comment is empty or not
        if (comment === '') {
            alert('Comment cannot be empty');
            return;
        }
        try {
            const response = await http.post(`/article/${userId}/comment`, {
                comment,
                commenterId: userId,
                articleId
            });
            console.log('Comment submitted successfully:', response.data);
            setComment('');
            fetchComments(); // Fetch updated comments after submission
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    // Function to handle rating change
    const handleRatingChange = async (newRating) => {
        try {
            const response = await http.post(`/article/${articleId}/rating`, {
                userID: userId,
                rating: newRating
            });
            console.log('Rating submitted successfully:', response.data);
            fetchAverageRating(); // Fetch updated average rating after submission
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    // Fetch article details
    const fetchArticleDetails = async () => {
        try {
            const { data: articleData } = await http.get(`/article/view/${articleId}`);
            setArticle(articleData);

            const { data: authorData } = await http.get(`/user/getUserProfile/${articleData.userID}`);
            setAuthorDetails(authorData);
        } catch (error) {
            console.error('Error fetching article details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch comments
    const fetchComments = async () => {
        try {
            const { data: commentsData } = await http.get(`/article/${articleId}/comment`);
            setComments(commentsData);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setComments([]);
        }
    };

    // Fetch average rating
    const fetchAverageRating = async () => {
        try {
            const { data: ratingData } = await http.get(`/article/${articleId}/rating`);
            setAverageRating(ratingData);
        } catch (error) {
            console.error('Error fetching average rating:', error);
            setAverageRating(null);
        }
    };

    // Fetch user's rating
    const fetchUserRating = async (userId) => {
        try {
            const { data: userRatingData } = await http.get(`/article/${articleId}/rating/${userId}`);
            setUserRating(userRatingData);
        } catch (error) {
            console.error('Error fetching user rating:', error);
            setUserRating(0);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!article) {
        return <div>Article not found!</div>;
    }

    const { title, body, articleImg } = article;

    return (
        <>
            <div className={styles.navbar}>
                <ArticleBreadCrumbs className={styles.breadCrumbs} />
            </div>
            <div className={styles.ViewArticle}>
                <div className={styles.content}>
                    {articleImg && <img src={`data:image/png;base64,${articleImg}`} alt={title || "Article Image"} className={styles.articleImage} />}
                    <div className={styles.authorSection}>
                        <div className={styles.authorDetails}>
                            {authorDetails?.profileImg
                                ? <img src={`data:image/png;base64,${authorDetails.profileImg}`} alt="Author" className={styles.authorImage} />
                                : <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Author" className={styles.authorImage} />}
                            <p>{authorDetails.firstName + " " + authorDetails.lastName}</p>
                        </div>
                    </div>
                    <div className={styles.articleHeader}>
                        <h1 className={styles.articleTitle}>{title}</h1>
                    </div>
                    <div className={styles.articleContent}>
                        <p>{body}</p>
                    </div>
                </div>
                <div className={styles.RatingAndCommentSection}>
                    <div className={styles.ratingSection}>
                        <p>Average Rating: {averageRating}</p>
                        <HoverRating ratingValue={userRating} onRatingChange={handleRatingChange} />
                    </div>
                    <div className={styles.commentSection}>
                        <div className={styles.writeComment}>
                            <textarea
                                placeholder="Write a comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
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