import React, { useState } from 'react';
import styles from './style/EditBookComponent.module.css';
import SearchBar from './SearchBarComponent';
import SingleBookSearchResult from './SingleBookSearchResult';
import BookDetailsEdit from './BookDetailsEdit';
import http from '../service/http-common'; // Import http service

function EditBooksComponent() {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    searchBooks(query);
    setSearchQuery(query);
    //console.log('Search Query:', query);
  };

  // using http service to search books
  const searchBooks = (searchQuery) => {
    http.get('/resource/search', {
      params: {
        keyword: searchQuery
      }
    })
      .then(response => {
        //console.log('Search Results:', response.data);
        setSearchResults(response.data);
      })
      .catch(error => {
        //console.error('Search Error:', error);
        setSearchResults([]);
      });
  };

  // which component to display
  const [displayComponent, setDisplayComponent] = useState('search');

  // State to hold the details of the selected book
  const [selectedBook, setSelectedBook] = useState({});

  // Function to handle click
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setDisplayComponent('details');

    // reset search result
    setSearchResults([]);
  };

  return (
    <div className={styles.editBookComponent}>
      {displayComponent === 'search' && (
        <div>
          <div className={styles.searchBar}>
            <SearchBar
              SearchBarPlaceholder="Search for books..."
              width="150%"
              onSearch={handleSearch}
            />
          </div>
          <div className={styles.searchResults}>
            {searchResults.length === 0 ? <h3>No search results found</h3> :
              searchResults.map((book) => (
                <SingleBookSearchResult
                  key={book.resourceId}
                  book={book}
                  onClick={() => handleBookClick(book)}
                />
              ))}
          </div>
        </div>
      )}
      {displayComponent === 'details' && (
        <BookDetailsEdit
          book={selectedBook}
          onBack={() => setDisplayComponent('search')} // Function to go back to search results
        />
      )}
    </div>
  );
}

export default EditBooksComponent;