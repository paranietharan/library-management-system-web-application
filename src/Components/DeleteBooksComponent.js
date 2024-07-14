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
import http from '../service/http-common';

function DeleteBooksComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    searchBooks(query);
    console.log('Search Query:', query);
  };

  const searchBooks = (query) => {
    setLoading(true);
    http.get('/resource/search', {
      params: {
        keyword: query
      }
    })
      .then(response => {
        console.log('Search Results:', response.data);
        setSearchResults(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Search Error:', error);
        setLoading(false);
      });
  };

  const handleDelete = () => {
    http.delete(`/resource/delete/${selectedBook.resourceId}`)
      .then(response => {
        console.log('Delete Response:', response.data);
        setSearchResults(searchResults.filter(book => book.resourceId !== selectedBook.resourceId));
        setOpenDialog(false);
        setSelectedBook(null);
      })
      .catch(error => {
        console.error('Delete Error:', error);
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBook(null);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  return (
    <div className={styles.deleteBookComponent}>
      <div className={styles.searchBar}>
        <SearchBar
          placeholder="Search for books..."
          width="100%"
          onSearch={handleSearch}
        />
      </div>
      <div className={styles.searchResults}>
        {loading && <p>Loading...</p>}
        {searchResults.length === 0 ? <h3>No search results found</h3> :
          searchResults.map((book) => (
            <div key={book.resourceId} className={styles.bookItem} onClick={() => handleBookClick(book)}>
              <SingleBookSearchResult book={book} />
              <IconButton aria-label="delete">
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