import React, { useState } from 'react';
import styles from './style/AddBooksComponent.module.css';
import http from '../service/http-common';
import BookAddAlertDialog from './BookAddAlertDialog';

function AddBooksComponent({ onAdd }) {
    const [isbn, setIsbn] = useState('');
    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [bookImage, setBookImage] = useState(null);
    const [bookCount, setBookCount] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [errors, setErrors] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setBookImage(file);

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!bookName) errors.bookName = 'Please enter book name';
        if (!authorName) errors.authorName = 'Please enter author name';
        if (!description) errors.description = 'Please enter description';
        if (!bookCount) errors.bookCount = 'Please enter book count';
        if (!isbn) errors.isbn = 'Please enter ISBN';
        if (!category) errors.category = 'Please enter category';
        setErrors(errors);

        if (Object.keys(errors).length !== 0) return;

        const newFormData = new FormData();
        newFormData.append('ISBN', isbn);
        newFormData.append('title', bookName);
        newFormData.append('author', authorName);
        newFormData.append('about', description);
        newFormData.append('category', category);
        newFormData.append('no_of_copies', bookCount);

        if (bookImage) {
            newFormData.append('bookImg', bookImage);
        } else {
            newFormData.append('bookImg', null);
        }

        setFormData(newFormData);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogAgree = async () => {
        setDialogOpen(false);

        try {
            const response = await http.post('/resource/addResource', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setIsbn('');
            setBookName('');
            setAuthorName('');
            setDescription('');
            setCategory('');
            setBookCount('');
            setBookImage(null);
            setPreviewUrl('');
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <div className={styles.addBooksComponent}>
            <div className={styles.addBooksForm}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="ISBN"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        className={errors.isbn && styles.errorInput}
                    />
                    {errors.isbn && <p className={styles.errorMsg}>{errors.isbn}</p>}
                    <input
                        type="text"
                        placeholder="Book Name"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        className={errors.bookName && styles.errorInput}
                    />
                    {errors.bookName && <p className={styles.errorMsg}>{errors.bookName}</p>}
                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={errors.category && styles.errorInput}
                    />
                    {errors.category && <p className={styles.errorMsg}>{errors.category}</p>}
                    <input
                        type="text"
                        placeholder="Author Name"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className={errors.authorName && styles.errorInput}
                    />
                    {errors.authorName && <p className={styles.errorMsg}>{errors.authorName}</p>}
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={errors.description && styles.errorInput}
                    ></textarea>
                    {errors.description && <p className={styles.errorMsg}>{errors.description}</p>}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={errors.bookImage && styles.errorInput}
                    />
                    {errors.bookImage && <p className={styles.errorMsg}>{errors.bookImage}</p>}
                    <input
                        type="number"
                        placeholder="Book Count"
                        value={bookCount}
                        onChange={(e) => setBookCount(e.target.value)}
                        className={errors.bookCount && styles.errorInput}
                    />
                    {errors.bookCount && <p className={styles.errorMsg}>{errors.bookCount}</p>}
                    <div className={styles.imagePreview}>
                        {previewUrl && <img src={previewUrl} alt="Book Preview" />}
                    </div>
                    <button type="submit">Add Book</button>
                </form>
            </div>
            <BookAddAlertDialog
                open={dialogOpen} 
                onClose={handleDialogClose} 
                onAgree={handleDialogAgree} 
            />
        </div>
    );
}

export default AddBooksComponent;