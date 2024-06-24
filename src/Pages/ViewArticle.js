import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styles from './style/ViewArticle.module.css';
import HoverRating from '../Components/HoverRating';
import ViewComments from '../Components/ViewComments';
import ArticleBreadCrumbs from '../Components/ArticleBreadCrumbs';
import Footer from '../Components/LibraryFooter';

function ViewArticle() {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
            } catch (error) {
                console.error('Error fetching article details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticleDetails();
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
                            {/* {authorDetails?.image && <img src={authorDetails.image} alt="Author" className={styles.authorImage} />} */}
                            <p>{"Author Name Not Available"}</p>
                        </div>
                        <div className={styles.publishedDate}>
                            {/* <p>{authorDetails?.publishedDate || "Publish Date Not Available"}</p> */}
                        </div>
                    </div>

                    <div className={styles.articleHeader}>
                        <h1 className={styles.articleTitle}>{title}</h1>
                        <p>
                            {/* {contents?.tags?.map((tag, index) => (
                                <span key={index}>#{tag} </span>
                            )) || "No Tags Available"} */}
                        </p>
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
                        <HoverRating />
                    </div>

                    <div className={styles.commentSection}>
                        {/* Write a comment */}
                        <div className={styles.writeComment}>
                            <textarea placeholder="Write a comment"></textarea>
                            <button>Submit</button>
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