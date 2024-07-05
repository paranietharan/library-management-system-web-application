import React, { useState } from 'react';
import ArticleNavBar from "../Components/ArticleNavBar";
import Footer from "../Components/LibraryFooter";
import SearchBar from '../Components/SearchBarComponent';
import styles from './style/ArticleTag.module.css';
import SearchResultsList from '../Components/SearchResultsList';

function ArticleSearch() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    const fetchData = (query) => {
        if (!query) {
            setData([]);
            return;
        }

        const headingUrl = `http://localhost:8080/article/search/heading/${query}`;
        const bodyUrl = `http://localhost:8080/article/search/body/${query}`;

        Promise.all([
            fetch(headingUrl).then((res) => res.json()),
            fetch(bodyUrl).then((res) => res.json())
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
        <div className={styles.container}>
            <ArticleNavBar />

            <div className={styles.content}>
                <SearchBar onSearch={handleSearch} className={styles.searchBar} />

                <div className={styles.searchResults}>
                    <SearchResultsList results={data} />
                </div>

            </div>

            <div className={styles.footerContainer}>
                <Footer />
            </div>
        </div>
    );
}

export default ArticleSearch;