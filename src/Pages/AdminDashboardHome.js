import LibrarianTopNavBar from "../Components/LibrarianTopNavBar";
import LibraryBookCount from "../Components/LibraryBookCount";
import React from 'react';
import styles from './style/AdminDashBoardHome.module.css';
import SearchBar from '../Components/SearchBarComponent';
import SingleSearchResult from "../Components/SingleSearchResult";
import exampleImage from '../resources/sample-picture.jpg';

function AdminDashboardHome() {
  return (
    <div>
      <LibrarianTopNavBar />

      <div className={styles.content}>
        <LibraryBookCount />

        <div className={styles.search}>
          <SearchBar width="100%" />

          <div className={styles.searchResults}>
            <SingleSearchResult
              profileImage={exampleImage}
              name="Paranie"
              bookName="Fire of wings"
              fineAmount="1000"
            />

            <SingleSearchResult
              profileImage={exampleImage}
              name="Paranie"
              bookName="Fire of wings"
              fineAmount="1000"
            />
          </div>
        </div>


      </div>
    </div>
  );
}

export default AdminDashboardHome;