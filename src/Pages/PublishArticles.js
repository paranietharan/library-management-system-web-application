import React, { useState, useEffect } from 'react';
import ArticleNavBar from '../Components/ArticleNavBar';
import Footer from '../Components/LibraryFooter';
import httpMultipart from '../service/http-multipart';
import getUserID from "../service/GetUserID";

function ArticleForm() {
    const [image, setImage] = useState(null);
    const [heading, setHeading] = useState('');
    const [body, setBody] = useState('');
    const [authorId, setAuthorId] = useState();

    useEffect(() => {
        const userID = getUserID();
        setAuthorId(userID);
    }, []);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // check if heading or body is empty
        if (!heading || !body) {
            alert('Please fill out all fields');
            return;
        }

        const formData = new FormData();
        formData.append('title', heading);
        formData.append('body', body);
        formData.append('authorId', authorId);

        if (image) {
            formData.append('articleImg', image);
        }

        try {
            const response = await httpMultipart.post('/article/addArticle', formData);
            console.log(response.data);

            alert('Article published successfully! Redirecting to article home page...');
            
            setTimeout(() => {
                window.location.href = '/article-home';
            }, 2000);

            setHeading('');
            setBody('');
            setImage(null);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflowY: 'scroll',
        backgroundColor: '#f5f5f5',
    };

    const formContainerStyle = {
        flex: '1',
        width: '100%',
        maxWidth: '800px',
        margin: '20px auto',
        padding: '40px',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    };

    const titleStyle = {
        fontFamily: "'Playfair Display', serif",
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: '30px',
        textAlign: 'center',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        marginBottom: '20px',
        border: '1px solid #bdc3c7',
        borderRadius: '5px',
        fontSize: '1rem',
        fontFamily: "'Open Sans', sans-serif",
    };

    const buttonStyle = {
        padding: '12px 24px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        fontFamily: "'Open Sans', sans-serif",
        transition: 'background-color 0.3s ease',
    };

    const imagePreviewStyle = {
        maxWidth: '200px',
        marginBottom: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

    const textareaStyle = {
        width: '100%',
        minHeight: '300px',
        padding: '12px',
        border: '1px solid #bdc3c7',
        borderRadius: '5px',
        fontSize: '1rem',
        fontFamily: "'Open Sans', sans-serif",
        resize: 'vertical',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#2c3e50',
        fontFamily: "'Open Sans', sans-serif",
    };

    return (
        <div style={containerStyle}>
            <ArticleNavBar />
            <div style={formContainerStyle}>
                <h1 style={titleStyle}>Publish Your Article</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            placeholder="Enter your article title"
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label htmlFor="image" style={labelStyle}>Image:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={inputStyle}
                        />
                    </div>
                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            style={imagePreviewStyle}
                        />
                    )}
                    <div>
                        <textarea
                            value={body}
                            onChange={handleBodyChange}
                            placeholder="Type your article body here"
                            style={textareaStyle}
                        />
                    </div>
                    <button type="submit" style={buttonStyle}>
                        Publish
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default ArticleForm;