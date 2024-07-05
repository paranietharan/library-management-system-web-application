import React, { useState, useEffect } from 'react';
import http from '../service/http-common'; // Import custom Axios instance
import ArticleNavBar from "../Components/ArticleNavBar";
import Footer from "../Components/LibraryFooter";
import ArticleSummary from "../Components/ArticleSummary";
import styles from './style/ArticleHome.module.css';

function ArticleHome() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await http.get('/article/allArticles');
                setArticles(response.data); // Assuming your API returns an array of articles
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []); // Empty dependency array means it only runs once on component mount

    return (
        <div className={styles.ArticleHomePage}>
            <ArticleNavBar />
            <div className={styles.container}>
                <div className={styles.articles}>
                    {articles.map(article => (
                        <ArticleSummary key={article.articleId} article={article} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ArticleHome;