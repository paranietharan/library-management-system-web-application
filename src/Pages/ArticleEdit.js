import React, { useEffect, useState } from "react";
import style from './style/EditArticleStyle.module.css';
import { useParams } from "react-router";
import ArticleNavBar from "../Components/ArticleNavBar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditArticle() {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [originalArticle, setOriginalArticle] = useState({});
  const [editMode, setEditMode] = useState({ title: false, image: false, body: false });
  const [newImage, setNewImage] = useState(null);
  const [deleteImage, setDeleteImage] = useState(false);

  const author_id = 'sampleUserID'; // Example author ID

  useEffect(() => {
    fetch(`http://localhost:8080/article/viewFull/${articleId}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setOriginalArticle(data);
      });

  }, [articleId]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
      setDeleteImage(false); // Reset delete flag when new image is selected
    }
  };

  const handleDeleteImage = () => {
    setNewImage(null);
    setDeleteImage(true);
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

  const handleSave = () => {
    // check for changes
    const isArticleChanged =
      article.title !== originalArticle.title ||
      article.body !== originalArticle.body ||
      newImage || deleteImage;

    if (!isArticleChanged) {
      alert('No changes detected');
      return;
    }

    // Create a form data object
    const formData = new FormData();

    // Copy properties from the original article
    formData.append('title', article.title);
    formData.append('body', article.body);
    formData.append('authorId', author_id); // Add authorId

    // Add or remove the image
    if (newImage) {
      formData.append('articleImg', newImage);
    } else if (deleteImage) {
      formData.append('articleImg', '');
    } else if (originalArticle.articleImg) {
      const imageBlob = base64ToBlob(`data:image/jpeg;base64,${originalArticle.articleImg}`, 'image/jpeg');
      formData.append('articleImg', imageBlob, 'original_image.jpg');
    }

    // Axios PUT request
    axios.put(`http://localhost:8080/article/editArticle/${articleId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        //console.log('Success:', response.data);
        if (response.data.success) {
          alert('Article updated successfully');
          setOriginalArticle(article);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to update article. Please try again later.');
      });
  };

  return (
    <>
      <ArticleNavBar />
      <div className={style.container}>
        <div className={style.article}>
          <div className={style.articleTitle}>
            {editMode.title ? (
              <input
                type="text"
                value={article.title}
                onChange={(e) => setArticle({ ...article, title: e.target.value })}
              />
            ) : (
              <h1>{article.title}</h1>
            )}
            <button onClick={() => setEditMode({ ...editMode, title: !editMode.title })}>
              {editMode.title ? 'Save' : 'Change'}
            </button>
          </div>

          <div className={style.articleImage}>
            {editMode.image ? (
              <div className={style.deleteImageAndEditImage}>
                <input type="file" onChange={handleImageChange} />
                <button onClick={handleDeleteImage}>Delete Image</button>
              </div>
            ) : (
              <div className={style.imageContainer}>
                <img
                  src={newImage ? URL.createObjectURL(newImage) : `data:image/jpeg;base64,${originalArticle.articleImg}`}
                  alt="Article" />
              </div>
            )}
            <button onClick={() => setEditMode({ ...editMode, image: !editMode.image })}>
              {editMode.image ? 'Save' : 'Change'}
            </button>
          </div>

          <div className={style.articleBody}>
            {editMode.body ? (
              <textarea
                value={article.body}
                onChange={(e) => setArticle({ ...article, body: e.target.value })}
              />
            ) : (
              <p>{article.body}</p>
            )}
            <button onClick={() => setEditMode({ ...editMode, body: !editMode.body })}>
              {editMode.body ? 'Save' : 'Change'}
            </button>
          </div>

          <button onClick={handleSave}>Submit</button>
        </div>
      </div>
    </>
  );
}

export default EditArticle;