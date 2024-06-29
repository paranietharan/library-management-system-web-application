import React from "react";
import styles from "./style/SearchResultsList.module.css";
import SearchResult from "./SearchResult";

const SearchResultsList = ({ results }) => {
    if (results.length === 0) {
        return <div className={styles.noResults}>No results found</div>;
    }

    return (
        <div className={styles.resultsList}>
            {results.map((result) => (
                <SearchResult key={result.articleID} result={result} />
            ))}
        </div>
    );
};

export default SearchResultsList;