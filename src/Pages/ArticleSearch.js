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

        const url = query.startsWith('heading:')
            ? `http://localhost:8080/article/search/heading/${query.replace('heading:', '')}`
            : `http://localhost:8080/article/search/body/${query}`;

        fetch(url)
            .then((res) => res.json())
            .then((d) => setData(d));
    };

    const handleSearch = (query) => {
        console.log(query);
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