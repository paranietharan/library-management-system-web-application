import React, { useEffect, useState } from "react";
import style from './style/EditArticleStyle.module.css';
import { useParams } from "react-router";
import ArticleNavBar from "../Components/ArticleNavBar";
import axios from 'axios';

function EditArticle() {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [originalArticle, setOriginalArticle] = useState({});
  const [editMode, setEditMode] = useState({ title: false, image: false, body: false });
  const [newImage, setNewImage] = useState(null);

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
    }
  };

  const handleSave = () => {
    const isArticleChanged =
      article.title !== originalArticle.title ||
      article.body !== originalArticle.body ||
      newImage;

    if (!isArticleChanged) {
      alert('No changes detected');
      return;
    }

    // Create form data
    const formData = new FormData();

    formData.append('title', article.title);
    formData.append('body', article.body);
    formData.append('authorId', 1); // Hardcoded for now
    if (newImage) {
      formData.append('articleImg', newImage);
    }

    // send data to api
    // fetch(`http://localhost:8080/article/editArticle/${articleId}`, {
    //   method: 'PUT',
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.success) {
    //       alert('Article updated successfully');
    //       setOriginalArticle(article);
    //     } else {
    //       alert('Failed to update article');
    //     }
    //   });
    // Axios PUT request
    axios.put(`http://localhost:8080/article/editArticle/${articleId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log('Success:', response.data);
        if (response.data.success) {
          alert('Article updated successfully');
          setOriginalArticle(article);
        } else {
          alert('Failed to update article');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to fetch data. Please try again later.');
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
              <input type="file" onChange={handleImageChange} />
            ) : (
              <img src={newImage ? URL.createObjectURL(newImage) : `data:image/jpeg;base64,${article.articleImg}`} alt="Article" />
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