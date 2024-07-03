import React, { useState } from 'react';
import styles from './style/EditBookComponent.module.css';
import SearchBar from './SearchBarComponent';
import SingleBookSearchResult from './SingleBookSearchResult';
import BookDetailsEdit from './BookDetailsEdit';
import axios from 'axios';


function EditBooksComponent() {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    searchBooks(query);
    setSearchQuery(query);
    console.log('Search Query:', query);
  };

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

  //which component 2 display
  const [displayComponent, setDisplayComponent] = useState('search');

  // State 2 hold the details of the selected book
  const [selectedBook, setSelectedBook] = useState(null);

  // Function 2 handle click
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setDisplayComponent('details'); // Switch to displaying book details
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
            {searchResults.map((book) => (
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