import React, { useState } from 'react';
import ArticleNavBar from "../Components/ArticleNavBar";
import Footer from "../Components/LibraryFooter";
import SearchBar from '../Components/SearchBarComponent';
import styles from './style/ArticleTag.module.css';

function ArticleSearch() {
    const [searchText, setSearchText] = useState([]);

    // Function 2 handle search
    const handleSearch = (searchText) => {
        setSearchText([searchText]);
    };
    const searchResults = [];

    //const searchResults = ["Article 1", "Article 2", "Article 3", "Article 4", "Article 5", "Article 6", "Article 7", "Article 8", "Article 9", "Article 10"];


    return (
        <div className={styles.container}>
            <ArticleNavBar />

            <div className={styles.content}>
                <SearchBar onSearch={handleSearch} className={styles.searchBar} />
                <div className={styles.searchResults}>
                    {searchResults.map((result) => (
                        <div className={styles.searchResult}>{result}</div>
                    ))}
                </div>

            </div>

            <div className={styles.footerContainer}>
                <Footer />
            </div>
        </div >
    );
}

export default ArticleSearch;
