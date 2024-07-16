import React, { useState, useEffect } from 'react';
import LibrarianTopNavBar from "../Components/LibrarianTopNavBar";
import LibraryBookCount from "../Components/LibraryBookCount";
import SearchBar from '../Components/SearchBarComponent';
import SingleSearchResult from "../Components/SingleSearchResult";
import exampleImage from '../resources/sample-picture.jpg';
import styles from './style/AdminDashBoardHome.module.css';
import http from '../service/http-common';
import Footer from "../Components/LibraryFooter";
import httpCommon from '../service/http-common';

function AdminDashboardHome() {

  const [totalAvilableBooks, setTotalAvilableBooks] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [IssuedBooks, setIssuedBooks] = useState(0);

  const handleSearch = (query) => {
    searchBooks(query);
    setSearchQuery(query);
    console.log('Search Query:', query);
  };

  // using http get the total number of books in the library
  useEffect(() => {
    http.get('/resource/total')
      .then(response => {
        setTotalAvilableBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });

      httpCommon.get("issues/issue-book-count")
      .then((response) => {
        setIssuedBooks(response.data);
        console.log('Issued Books:', response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // using http search books
  const searchBooks = (searchQuery) => {
    http.get('/resource/search', {
      params: {
        keyword: searchQuery
      }
    })
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => {
        console.error('Search Error:', error);
      });
  };

  return (
    <div>
      <LibrarianTopNavBar />

      <div className={styles.content}>
        <LibraryBookCount
          TotalBooks={totalAvilableBooks}
          IssuedBooks={IssuedBooks}
        />

        <div className={styles.search}>
          <SearchBar
            SearchBarPlaceholder="Search for books..."
            width="150%"
            onSearch={handleSearch}
          />

          <div className={styles.searchResults}>
            {
              searchResults.length === 0 ? <h3>No search results found</h3> :
              searchResults.map((book) => (
                <SingleSearchResult
                  key={book.resourceId}
                  title={book.title}
                  author={book.author}
                  image={
                    book.bookImg === null ? exampleImage : `data:image/jpeg;base64,${book.bookImg}`
                  }
                  isbn={book.isbn}
                />
              ))
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboardHome;