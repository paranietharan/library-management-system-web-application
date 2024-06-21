// ArticleHome.js
import React from 'react';
import ArticleNavBar from "../Components/ArticleNavBar";
import Footer from "../Components/LibraryFooter";
import ArticleSummary from "../Components/ArticleSummary";
import styles from './style/ArticleHome.module.css';

function ArticleHome({ articles }) {
    return (
        <div>
            <ArticleNavBar />
            <div className={styles.container}>
                <div className={styles.articles}>
                    {articles.map(article => (
                        <ArticleSummary key={article.id} article={article}/>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ArticleHome;