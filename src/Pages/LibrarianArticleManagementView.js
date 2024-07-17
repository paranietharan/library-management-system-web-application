import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styles from './style/LibrarianArticleManagement.module.css';
import Footer from '../Components/LibraryFooter';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import AdminArticleComments from '../Components/AdminArticleComments';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleDeleteAlertDialog from '../Components/ArticleDeleteAlert';
import http from '../service/http-common';

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
        const userID = "admin";
        http.delete(`/article/${userID}/delete/${articleId}`)
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
        fetchArticleDetails();
        fetchComments();
        fetchAverageRating();
    }, []);

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!article) {
        return <div>Article not found!</div>;
    }

    const { title, body, articleImg } = article;

    return (
        <>
            <LibrarianTopNavBar />

            <div className={styles.ViewArticle}>
                <div className={styles.content}>
                    {articleImg && <img src={`data:image/png;base64,${articleImg}`} alt={title || "Article Image"} className={styles.articleImage} />}

                    <div className={styles.authorSection}>
                        <div className={styles.authorDetails}>
                            {authorDetails?.profileImg && <img src={authorDetails.profileImg} alt="Author" className={styles.authorImage} />}
                            {!authorDetails?.profileImg && <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Author" className={styles.authorImage} />}
                            <p>{authorDetails?.firstName + " " + authorDetails?.lastName}</p>
                        </div>
                    </div>

                    <div className={styles.articleHeader}>
                        <h1 className={styles.articleTitle}>{title}</h1>
                        <DeleteIcon onClick={handleClickOpen} style={{ cursor: 'pointer' }} />
                    </div>

                    <ArticleDeleteAlertDialog
                        open={open}
                        handleClose={handleClose}
                        handleConfirm={handleDelete}
                        title="Delete Article"
                        description="Are you sure you want to delete this article?"
                    />

                    <div className={styles.articleContent}>
                        <p>{body}</p>
                    </div>
                </div>

                <div className={styles.RatingAndCommentSection}>
                    <div className={styles.ratingSection}>
                        <p>Average Rating: {averageRating}</p>
                    </div>

                    <div className={styles.commentSection}>
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