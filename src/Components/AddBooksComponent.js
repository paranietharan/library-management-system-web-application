// AddBooksComponent.js
import React, { useState } from 'react';
import styles from './style/AddBooksComponent.module.css';

function AddBooksComponent({ onAdd }) {
    // code for image preview
    const [previewUrl, setPreviewUrl] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setBookImage(file);

        // Read the file and set the preview URL
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [description, setDescription] = useState('');
    const [bookImage, setBookImage] = useState('');
    const [bookCount, setBookCount] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form fields
        const errors = {};
        if (!bookName) errors.bookName = 'Please enter book name';
        if (!authorName) errors.authorName = 'Please enter author name';
        if (!description) errors.description = 'Please enter description';
        if (!bookImage) errors.bookImage = 'Please select book image';
        if (!bookCount) errors.bookCount = 'Please enter book count';
        setErrors(errors);

        // Check if there are any errors
        if (Object.keys(errors).length !== 0) return;

        // Create a new book object
        const newBook = {
            bookName,
            authorName,
            description,
            bookImage,
            bookCount: parseInt(bookCount),
        };

        // Pass the new book object to the parent component
        onAdd(newBook);

        // Reset form fields after submission
        setBookName('');
        setAuthorName('');
        setDescription('');
        setBookImage('');
        setBookCount('');
    };

    return (
        <div className={styles.addBooksComponent}>
            <div className={styles.addBooksForm}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {/* <input
                        type="text"
                        placeholder="Book Name"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        className={errors.bookName && styles.errorInput}
                    /> */}
                    
                    {errors.bookName && <p className={styles.errorMsg}>{errors.bookName}</p>}
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
                        onChange={(e) => {
                            setBookImage(e.target.files[0]);
                            handleImageChange(e); // Call the handleImageChange function 2 update the preview
                        }}
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

                    {/* Display image preview */}
                    <div className={styles.imagePreview}>
                        {previewUrl && (
                            <img src={previewUrl} alt="Book Preview" />
                        )}
                    </div>
                    <button type="submit">Add Book</button>
                </form>
            </div>
        </div>
    );
};

export default AddBooksComponent;