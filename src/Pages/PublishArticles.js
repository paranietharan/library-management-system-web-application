import React, { useState } from 'react';
import ArticleNavBar from '../Components/ArticleNavBar';
import Footer from '../Components/LibraryFooter';
import axios from 'axios';

function ArticleForm() {
    const [image, setImage] = useState(null);
    const [heading, setHeading] = useState('');
    const [body, setBody] = useState('');

    const author_id = 'sampleUserID'; // Example author ID

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', heading);
        formData.append('body', body);
        formData.append('authorId', author_id);

        if (image) {
            formData.append('articleImg', image);
        } else {
            formData.append('articleImg', null);
        }

        try {
            const response = await axios.post('http://localhost:8080/article/addArticle', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            //console.log(formData)
            //console.log(response.data);

            // forward to home page
            // Wait for 2 seconds before redirecting
            setTimeout(() => {
                window.location.href = '/';
            }, 2000); // 2000 milliseconds = 2 seconds


            // set editor to default values
            setHeading('');
            setBody('');
            setImage(null);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowY: 'scroll' }}>
            <ArticleNavBar />

            <div style={{
                flex: '1',
                width: '100%',
                maxWidth: '100%',
                padding: '20px',
                boxSizing: 'border-box',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div style={{ maxWidth: '80%', margin: '0 auto' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.2rem' }} className="submit-button">Publish</button>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <input
                                type="text"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                                placeholder="Enter your article title"
                                style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box', fontSize: '1.2rem' }}
                                className="title-input"
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="image" style={{ display: 'block', marginBottom: '5px', fontSize: '1.2rem', fontWeight: 'bold' }}>Image:</label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ width: '50%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box', fontSize: '1.2rem' }}
                                className="image-input"
                            />
                        </div>

                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                style={{ width: '100px', marginBottom: '15px', borderRadius: '5px', padding: '10px' }}
                                className="image-preview"
                            />
                        )}

                        <div style={{ marginBottom: '20px' }}>
                            <textarea
                                value={body}
                                onChange={handleBodyChange}
                                style={{ border: '1px solid #ccc', borderRadius: '5px', minHeight: '200px', width: '70vw', overflowY: 'scroll' }}
                                placeholder="Type your article body here"
                            />

                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ArticleForm;