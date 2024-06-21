import React, { useState } from 'react';
import styles from './style/DeleteBooksComponent.module.css';
import SearchBar from './SearchBarComponent';
import SingleBookSearchResult from './SingleBookSearchResult';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import exampleImage from '../resources/bookImage.jpg';

function DeleteBooksComponent() {
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
        {
          id: 2,
          profileImage: exampleImage,
          name: 'John Doe',
          bookName: 'The Great Gatsby',
          Description: '$10',
          isbn: '1234567890',
          count: 5,
        },
      ]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = () => {
    setBooks(books.filter(book => book.id !== selectedBook.id));
    setOpenDialog(false);
    setSelectedBook(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBook(null);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className={styles.deleteBookComponent}>
      <div className={styles.searchBar}>
        <SearchBar SearchBarPlaceholder="Search Books"/>
      </div>
      <div className={styles.searchResults}>
        {books.map((book) => (
          <div key={book.id} onClick={() => handleBookClick(book)}>
            <SingleBookSearchResult {...book}/>
            <IconButton onClick={() => { setOpenDialog(true); }} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Book</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteBooksComponent;