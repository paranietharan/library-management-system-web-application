import { Link } from 'react-router-dom';
import style from './style/ArticleManagement.module.css';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import Footer from '../Components/LibraryFooter';
import SearchBar from '../Components/SearchBarComponent';

import ArticleReviewComponent from '../Components/ArticleReviewComponent';

function ArticleManagement({ articles }) {
    return (
        <div className={style.ArticleManagement}>
            <LibrarianTopNavBar />

            <div className={style.container}>
                <div className={style.centerContent}>
                    <h1>Articles</h1>

                    <div className={style.search}>
                        <SearchBar />
                    </div>
                </div>

                <div className={style.articles}>
                    {articles.map(article => (
                        <Link
                            key={article.id}
                            to={`/article/${article.id}`}
                            className={style.articleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ArticleReviewComponent
                                image={article.articleImage}
                                author={article.authorDetails.name}
                                description={article.contents.paragraphs[0]} // First paragraph as description
                            />
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ArticleManagement;