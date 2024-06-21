import ArticleNavBar from "../Components/ArticleNavBar";
import Footer from "../Components/LibraryFooter";
import ProfileCard from "../Components/ProfileCard";
import styles from "./style/MyProfile.module.css";
import ArticleSummary from "../Components/ArticleSummary";

function MyProfile({ articles }) {
  return (
    <div className={styles.articleProfile}>
      {/* <div className={styles.myProfileHeader}>
        <ArticleNavBar />
      </div> */}

      <div className={styles.articleContainer}>
        <div className={styles.articleList}>
          {articles
            .filter(article => ["1", "3", "5"].includes(article.id)) // Display [1, 3, 5]
            .map((article) => (
              <div className={styles.article}>
                <ArticleSummary key={article.id} article={article} />
              </div>
            ))}

          {articles
            .filter(article => ["1", "3", "5"].includes(article.id)) // Display [1, 3, 5]
            .map((article) => (
              <div className={styles.article}>
                <ArticleSummary key={article.id} article={article} />
              </div>
            ))}

          {articles
            .filter(article => ["1", "3", "5"].includes(article.id)) // Display [1, 3, 5]
            .map((article) => (
              <div className={styles.article}>
                <ArticleSummary key={article.id} article={article} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;