import React, { useState } from 'react';
import ArticleNavBar from "../Components/ArticleNavBar";
import Footer from "../Components/LibraryFooter";
import SearchBar from '../Components/SearchBarComponent';
import styles from './style/ArticleTag.module.css';

function ArticleTag() {
    const [searchResults, setSearchResults] = useState([]);

    // Function 2 handle search
    const handleSearch = (searchText) => {
        setSearchResults([searchText]);
        console.log(searchResults);
    };

    return (
        <div className={styles.container}>
            <ArticleNavBar />

            <div className={styles.content}>
                <SearchBar onSearch={handleSearch} className={styles.searchBar} />

                 <div className={styles.tagsContainer}>
                    <div className={styles.tag}>#medical</div>
                    <div className={styles.tag}>#maths</div>
                    <div className={styles.tag}>#science</div>
                    <div className={styles.tag}>#technology</div>
                    <div className={styles.tag}>#engineering</div>
                    <div className={styles.tag}>#arts</div>
                    <div className={styles.tag}>#humanities</div>
                    <div className={styles.tag}>#business</div>
                    <div className={styles.tag}>#law</div>
                    <div className={styles.tag}>#social</div>
                    <div className={styles.tag}>#psychology</div>
                    <div className={styles.tag}>#education</div>
                    <div className={styles.tag}>#health</div>
                    <div className={styles.tag}>#environment</div>
                    <div className={styles.tag}>#agriculture</div>
                    <div className={styles.tag}>#food</div>
                    <div className={styles.tag}>#nutrition</div>
                    <div className={styles.tag}>#sports</div>
                    <div className={styles.tag}>#fitness</div>
                    <div className={styles.tag}>#lifestyle</div>
                    <div className={styles.tag}>#fashion</div>
                    <div className={styles.tag}>#beauty</div>
                    <div className={styles.tag}>#travel</div>
                    <div className={styles.tag}>#tourism</div>
                    <div className={styles.tag}>#hospitality</div>
                </div>
            </div>

            <div className={styles.footerContainer}>
                <Footer />
            </div>
        </div >
    );
}

export default ArticleTag;
