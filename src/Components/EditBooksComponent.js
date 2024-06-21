import React, { useState } from 'react';
import styles from './style/EditBookComponent.module.css';
import SearchBar from './SearchBarComponent';
import SingleBookSearchResult from './SingleBookSearchResult';
import BookDetailsEdit from './BookDetailsEdit';
import exampleImage from '../resources/bookImage.jpg';

function EditBooksComponent() {
  // Example book data array
  const [books, setBooks] = useState([
    {
      id: 1,
      profileImage: exampleImage,
      name: 'John Doe',
      bookName: 'The Great Gatsby',
      Description: '$10',
      isbn: '1234567890',
      count: 5,
    },
  ]);

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
            <SearchBar SearchBarPlaceholder="Search Books" />
          </div>
          <div className={styles.searchResults}>
            {books.map((book) => (
              <SingleBookSearchResult
                key={book.id}
                {...book}
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