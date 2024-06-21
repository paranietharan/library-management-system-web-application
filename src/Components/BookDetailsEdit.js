import React, { useState } from 'react';
import styles from './style/BookDetailsEdit.module.css';
import { Button, TextField } from '@mui/material';

function BookDetailsEdit({ book, onBack }) {
  const [editing, setEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(book);
  const [newPhoto, setNewPhoto] = useState(null);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    console.log('Book details saved:', editedBook);
    if (newPhoto) {
      // Handle saving the new photo
      console.log('New photo uploaded:', newPhoto);
    }
    setEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setNewPhoto(file);
  };

  return (
    <div className={styles.bookDetails}>
      <div className={styles.row}>
        <div className={styles.column}>
          <img src={newPhoto ? URL.createObjectURL(newPhoto) : editedBook.profileImage} alt="Book Cover" className={styles.bookCover} />
          {editing && (
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className={styles.photoInput}
            />
          )}
          <h2 className={styles.bookName}>
            {editing ? (
              <TextField
                name="bookName"
                value={editedBook.bookName}
                onChange={handleInputChange}
                variant="standard"
              />
            ) : (
              editedBook.bookName
            )}
          </h2>
        </div>
        <div className={styles.column}>
          {editing ? (
            <>
              <TextField
                name="name"
                label="Author"
                value={editedBook.name}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="Description"
                label="Description"
                value={editedBook.Description}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="isbn"
                label="ISBN"
                value={editedBook.isbn}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="bookCount"
                label="Book Count"
                type="number"
                value={editedBook.bookCount}
                onChange={handleInputChange}
                fullWidth
              />
            </>
          ) : (
            <>
              <p><strong>Author:</strong> {editedBook.name}</p>
              <p><strong>Description:</strong> {editedBook.Description}</p>
              <p><strong>ISBN:</strong> {editedBook.isbn}</p>
              <p><strong>Book Count:</strong> {editedBook.bookCount}</p>
            </>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        {editing ? (
          <>
            <Button onClick={handleSave} className={styles.saveButton}>Save</Button>
            <Button onClick={onBack} className={styles.backButton}>Cancel</Button>
          </>
        ) : (
          <Button onClick={handleEdit} className={styles.editButton}>Edit</Button>
        )}
      </div>
    </div>
  );
}

export default BookDetailsEdit;
