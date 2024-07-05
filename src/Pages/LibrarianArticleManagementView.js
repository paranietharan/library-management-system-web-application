import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styles from './style/LibrarianArticleManagement.module.css';
import Footer from '../Components/LibraryFooter';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import AdminArticleComments from '../Components/AdminArticleComments';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleDeleteAlertDialog from '../Components/ArticleDeleteAlert';
import axios from 'axios';

function LibrarianArticleManagement() {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [authorDetails, setAuthorDetails] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        const userID = "adminId";
        axios.delete(`http://localhost:8080/article/${userID}/delete/${article.id}`)
            .then(response => {
                console.log('Article deleted successfully');
                setOpen(false);

                // forward to the article management page
                window.location.href = '/librarian-article-management';
            })
            .catch(error => {
                console.error('Error deleting article:', error);
                setOpen(false);
            });
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
            <LibrarianTopNavBar />

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
                    </div>

                    <div className={styles.articleHeader}>
                        <h1 className={styles.articleTitle}>{article.title}</h1>
                        <DeleteIcon onClick={handleClickOpen} style={{ cursor: 'pointer' }} />
                    </div>
                    {/* Article content goes here */}
                    <ArticleDeleteAlertDialog
                        open={open}
                        onClose={handleClose}
                        onConfirm={handleDelete}
                        title="Delete Article"
                        description="Are you sure you want to delete this article?"
                    />

                    <div className={styles.articleContent}>
                        <p>{body}</p>
                    </div>
                </div>

                {/* Details from comments and Rating */}
                <div className={styles.RatingAndCommentSection}>
                    <div className={styles.ratingSection}>
                        <p>Average Rating: {averageRating}</p>
                    </div>

                    <div className={styles.commentSection}>
                        {/* List all comments */}
                        <div className={styles.viewComments}>
                            <AdminArticleComments comments={comments || []} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

LibrarianArticleManagement.propTypes = {
    articleId: PropTypes.string.isRequired,
};

export default LibrarianArticleManagement;