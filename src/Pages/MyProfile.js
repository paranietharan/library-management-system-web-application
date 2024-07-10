import React, { useEffect, useState } from "react";
import ArticleNavBar from "../Components/ArticleNavBar";
import CustomFooter from "../Components/CustomFooter"; // Import the custom footer
import ProfileCard from "../Components/ProfileCard";
import ArticleSummaryProfile from "../Components/ArticleSummaryProfile";
import styles from "./style/MyProfile.module.css";
import http from '../service/http-common';
import Footer from "../Components/LibraryFooter";
import getUserID from "../service/GetUserID";

function MyProfile() {
  const [articles, setArticles] = useState([]);
  const [authorDetails, setAuthorDetails] = useState({});

  useEffect(() => {
    const authorId = getUserID();

    //const authorId = userId;
    console.log("Author id from : " + authorId)

    const fetchArticles = async () => {
      try {
        const response = await http.get(`/article/getByUserID/${authorId}`);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    const fetchAuthorDetails = async () => {
      try {
        const response = await http.get(`/user/getUserProfile/${authorId}`);
        setAuthorDetails(response.data);
      } catch (error) {
        console.error('Error fetching author details:', error);
      }
    };

    fetchArticles();
    fetchAuthorDetails();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <ArticleNavBar />
      </div>
      <div className={styles.content}>
        <div className={styles.profileCard}>
          <ProfileCard authorDetails={authorDetails} />
        </div>
        <div className={styles.articleList}>
          {articles.map(article => (
            <ArticleSummaryProfile key={article.articleId} article={article} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyProfile;