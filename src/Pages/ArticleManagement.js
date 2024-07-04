import { Link } from 'react-router-dom';
import style from './style/ArticleManagement.module.css';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import Footer from '../Components/LibraryFooter';
import SearchBar from '../Components/SearchBarComponent';
import ArticleReviewComponent from '../Components/ArticleReviewComponent';
import styles from './style/ArticleManagement.module.css';
import { useState } from 'react';
import http from '../service/http-common'; // Import custom Axios instance

function ArticleManagement() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    const fetchData = (query) => {
        if (!query) {
            setData([]);
            return;
        }

        const headingUrl = `/article/search/heading/${query}`;
        const bodyUrl = `/article/search/body/${query}`;

        Promise.all([
            http.get(headingUrl).then((res) => res.data),
            http.get(bodyUrl).then((res) => res.data)
        ])
            .then(([headingData, bodyData]) => {
                // Merge the results, ensuring no duplicates if any
                const combinedData = [...headingData, ...bodyData.filter(item => !headingData.some(h => h.articleID === item.articleID))];
                setData(combinedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setData([]); // Set data to empty array in case of an error
            });
    };

    const handleSearch = (query) => {
        setQuery(query);
        fetchData(query);
    };

    return (
        <div className={styles.ArticleManagement}>
            <LibrarianTopNavBar />

            <div className={styles.container}>
                <div className={styles.centerContent}>
                    <div className={styles.search}>
                        <SearchBar
                            onSearch={handleSearch}
                            className={styles.searchBar}
                        />
                    </div>
                </div>

                <div className={styles.articles}>
                    {data.map((article) => (
                        <Link
                            key={article.articleID}
                            to={`/librarian-article-management/${article.articleID}`}
                            className={style.articleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {console.log(article.title)}
                            <ArticleReviewComponent
                                image={article.articleImg}
                                heading={article.title}
                                description={article.body}
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