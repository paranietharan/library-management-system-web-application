import React, { useState } from 'react';
import styles from './style/BookDetailsEdit.module.css';
import { Button, TextField } from '@mui/material';
import http from '../service/http-common'; // Import general http service
import httpMultipart from '../service/http-multipart'; // Import multipart http service

function BookDetailsEdit({ book, onBack }) {
  const [editing, setEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({
    resourceId: book.resourceId,
    title: book.title,
    author: book.author,
    no_of_copies: book.no_of_copies,
    category: book.category,
    about: book.about,
    isbn: book.isbn,
    bookImg: book.bookImg,
  });
  const [newPhoto, setNewPhoto] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('ISBN', editedBook.isbn || '');
    formData.append('title', editedBook.title);
    formData.append('author', editedBook.author);
    formData.append('no_of_copies', editedBook.no_of_copies);
    formData.append('category', editedBook.category);
    formData.append('about', editedBook.about);

    if (newPhoto) {
      formData.append('bookImg', newPhoto);
    } else if (deletePhoto) {
      formData.append('bookImg', '');
    } else if (editedBook.bookImg) {
      const imageBlob = base64ToBlob(`data:image/jpeg;base64,${editedBook.bookImg}`, 'image/jpeg');
      formData.append('bookImg', imageBlob, 'original_image.jpg');
    }

    httpMultipart.put(`/resource/update/${editedBook.resourceId}`, formData)
      .then(response => {
        console.log('Book details saved:', response.data);
        setEditing(false);
        onBack();
      })
      .catch(error => {
        console.error('Error saving book details:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setNewPhoto(file);
    setDeletePhoto(false);
  };

  const handleDeletePhoto = () => {
    setNewPhoto(null);
    setDeletePhoto(true);
  };

  const base64ToBlob = (base64Data, contentType) => {
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };

  return (
    <div className={styles.bookDetails}>
      <div className={styles.row}>
        <div className={styles.column}>
          <img
            src={newPhoto ? URL.createObjectURL(newPhoto) : (editedBook.bookImg ? `data:image/png;base64,${editedBook.bookImg}` : 'https://easydrawingguides.com/wp-content/uploads/2020/10/how-to-draw-an-open-book-featured-image-1200-1024x672.png')}
            alt="Book Cover"
            className={styles.bookCover}
          />
          {editing && (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className={styles.photoInput}
              />
              <Button onClick={handleDeletePhoto} className={styles.deleteButton}>Delete Image</Button>
            </div>
          )}
          <h2 className={styles.bookName}>
            {!editing && editedBook.title}
          </h2>
        </div>
        <div className={styles.column}>
          {editing ? (
            <>
              <TextField
                name="title"
                value={editedBook.title}
                onChange={handleInputChange}
                variant="standard"
                sx={{ marginBottom: 2 }}
              />

              <TextField
                name="author"
                label="Author"
                value={editedBook.author}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="about"
                label="Description"
                value={editedBook.about}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="isbn"
                label="ISBN"
                value={editedBook.isbn}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="no_of_copies"
                label="Book Count"
                type="number"
                value={editedBook.no_of_copies}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="category"
                label="Category"
                value={editedBook.category}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </>
          ) : (
            <>
              <p><strong>Author:</strong> {editedBook.author}</p>
              <p><strong>Description:</strong> {editedBook.about}</p>
              <p><strong>ISBN:</strong> {editedBook.isbn}</p>
              <p><strong>Book Count:</strong> {editedBook.no_of_copies}</p>
              <p><strong>Category:</strong> {editedBook.category}</p>
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