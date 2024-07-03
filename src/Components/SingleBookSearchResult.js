import React from 'react';
import styles from './style/SingleSearchResult.module.css';

const SingleBookSearchResult = ({ book, onClick }) => {
  // Check if book is undefined or null
  if (!book) {
    return null; // or render a placeholder or loading state
  }

  return (
    <div className={styles.singleSearchResult} onClick={onClick}>
      <div className={styles.profilePicture}>
        <img 
          src={book.bookImg ? `data:image/png;base64,${book.bookImg}` : 'https://easydrawingguides.com/wp-content/uploads/2020/10/how-to-draw-an-open-book-featured-image-1200-1024x672.png'} 
          alt={book.title} 
        />
      </div>
      <div className={styles.details}>
        <p><strong>Book Name:</strong> {book.title}</p>
        <p><strong>Author Name:</strong> {book.author}</p>
        <p><strong>Description:</strong> {book.about}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Count:</strong> {book.no_of_copies}</p>
        <p><strong>Category:</strong> {book.category}</p>
      </div>
    </div>
  );
};

export default SingleBookSearchResult;