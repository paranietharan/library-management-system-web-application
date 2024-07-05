import React from "react";
import styles from "./style/SearchResult.module.css";
import { Link } from "react-router-dom";

const SearchResult = ({ result }) => {
    return (
        <div
            className={styles.searchResult}
            //onClick={() => alert(`You selected ${result.title}!`)}
        >
            <Link to={`/article/${result.articleID}`} className={styles.title}>
                {result.title}
            </Link>
        </div>
    );
};

export default SearchResult;