import React, { useState } from 'react';
import ArticleNavBar from '../Components/ArticleNavBar';
import Footer from '../Components/LibraryFooter';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function ArticleForm() {
    const [image, setImage] = useState(null);
    const [heading, setHeading] = useState('');
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Extract the raw content state from the editor state
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);

        // Extract the highlighted text from the raw content state
        let highlightedText = '';
        rawContentState.blocks.forEach(block => {
            if (block.inlineStyleRanges && block.inlineStyleRanges.length > 0) {
                block.inlineStyleRanges.forEach(style => {
                    if (style.style === 'HIGHLIGHT') {
                        highlightedText += block.text.substring(style.offset, style.offset + style.length) + ' ';
                    }
                });
            }
        });

        // Log all the data including highlighted content
        console.log('Form submitted:', {
            image,
            heading,
            content: rawContentState,
            highlightedText: highlightedText.trim(), // Trim to remove any leading/trailing whitespace
        });

        // Reset form fields after submission
        setImage(null);
        setHeading('');
        setEditorState(EditorState.createEmpty());
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
                            <input
                                type="text"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                                placeholder="#Tags"
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
                                style={{ width: '50%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box', fontSize: '1.2rem'  }}
                                className="image-input"
                            />

                            {image && (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    style={{ width: '100%', marginBottom: '15px', borderRadius: '5px' }}
                                    className="image-preview"
                                />
                            )}
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ border: '1px solid #ccc', borderRadius: '5px', minHeight: '200px' }}>
                                <Editor
                                    editorState={editorState}
                                    wrapperClassName="editor-wrapper"
                                    editorClassName="editor-content"
                                    onEditorStateChange={setEditorState}
                                    placeholder="Enter your article content"
                                />
                            </div>
                        </div>

                        <div style={{ textAlign: 'right'}}>
                            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.2rem' }} className="submit-button">Publish</button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div >
    );
}

export default ArticleForm;
