import LibrarianTopNavBar from "../Components/LibrarianTopNavBar";
import LibraryBookCount from "../Components/LibraryBookCount";
import React from 'react';
import styles from './style/AdminDashBoardHome.module.css';
import SearchBar from '../Components/SearchBarComponent';
import SingleSearchResult from "../Components/SingleSearchResult";
import exampleImage from '../resources/sample-picture.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../Components/LibraryFooter";

function AdminDashboardHome() {

  const [totalAvilableBooks, setTotalAvilableBooks] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    searchBooks(query);
    setSearchQuery(query);
    console.log('Search Query:', query);
  };

  // using axios get the total number of books in the library
  useEffect(() => {
    axios.get('http://localhost:8080/resource/total')
      .then(response => {
        setTotalAvilableBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    setTotalAvilableBooks(100);
  }, []);

  // using axios search books
  const searchBooks = (searchQuery) => {
    axios.get('http://localhost:8080/resource/search', {
      params: {
        keyword: searchQuery
      }
    })
      .then(response => {
        //console.log('Search Results:', response.data);
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
                    book.image === null ? exampleImage : `data:image/jpeg;base64,${book.image}`
                  }
                  isbn={book.isbn}
                  id={book.id}
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