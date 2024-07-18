import React, { useEffect, useState } from "react";
import style from './style/EditArticleStyle.module.css';
import { useParams } from "react-router";
import ArticleNavBar from "../Components/ArticleNavBar";
import http from '../service/http-common';
import httpMultipart from '../service/http-multipart';
import getUserID from "../service/GetUserID";

function EditArticle() {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [originalArticle, setOriginalArticle] = useState({});
  const [editMode, setEditMode] = useState({ title: false, image: false, body: false });
  const [newImage, setNewImage] = useState(null);
  const [deleteImage, setDeleteImage] = useState(false);
  const [author_id, setauthor_id] = useState();

  useEffect(() => {
    const userID = getUserID();
    setauthor_id(userID);
  }, []);

  //const author_id = 'sampleUserID'; // Example author ID

  useEffect(() => {
    http.get(`/article/viewFull/${articleId}`)
      .then((res) => {
        setArticle(res.data);
        setOriginalArticle(res.data);
      })
      .catch((error) => console.error('Error fetching article:', error));
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
    httpMultipart.put(`/article/editArticle/${articleId}`, formData)
      .then((response) => {
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
            <button className={style.button} onClick={() => setEditMode({ ...editMode, title: !editMode.title })}>
              {editMode.title ? 'Save' : 'Edit Title'}
            </button>
          </div>

          <div className={style.articleImage}>
            {editMode.image ? (
              <div className={style.deleteImageAndEditImage}>
                <input type="file" onChange={handleImageChange} />
                <button className={style.button} onClick={handleDeleteImage}>Delete Image</button>
              </div>
            ) : (
              <div className={style.imageContainer}>
                <img
                  src={newImage ? URL.createObjectURL(newImage) : `data:image/jpeg;base64,${originalArticle.articleImg}`}
                  alt="Article" />
              </div>
            )}
            <button className={style.button} onClick={() => setEditMode({ ...editMode, image: !editMode.image })}>
              {editMode.image ? 'Save Image' : 'Change Image'}
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
            <button className={style.button} onClick={() => setEditMode({ ...editMode, body: !editMode.body })}>
              {editMode.body ? 'Save Content' : 'Edit Content'}
            </button>
          </div>

          <button className={`${style.button} ${style.submitButton}`} onClick={handleSave}>Submit Changes</button>
        </div>
      </div>
    </>
  );
}

export default EditArticle;