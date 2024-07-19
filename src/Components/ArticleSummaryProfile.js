import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import ArticleDeleteAlertDialog from './ArticleDeleteAlert';
import { useState } from 'react';
import axios from 'axios';

function ArticleSummaryProfile({ article }) {
  const title = article.title.split(' ');
  const displayedTitle = title.length > 7 ? `${title.slice(0, 7).join(' ')}...` : title.join(' ');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [authorId, setAuthorId] = useState(""); // Example author ID
  const [articleId, setArticleId] = useState(0); // Example article ID

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8080/article/${authorId}/delete/${articleId}`);
      setDialogOpen(false);
      // Optionally refresh articles or navigate to another page
    } catch (error) {
      console.error("Failed to delete article:", error);
    }
  };

  useEffect(() => {
    setArticleId(article.articleID);
    setAuthorId(article.userID);
  }, [])

  return (
    <Card sx={{ maxWidth: '100%', maxHeight: '400px', margin: '10px', backgroundColor: '#e6e6e6' }}>
      <Link to={`/article/${article.articleID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {/* Use article.articleID instead of article.articleId */}
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`data:image/jpeg;base64,${article.articleImg}`}
            alt="Article Image"
            style={{ width: '25vw', maxHeight: '100px', height: 'auto' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: '"Oswald", sans-serif', }}>
              {displayedTitle.substring(0, 25)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Playwrite NO"', fontWeight: '1000' }}>
              {article.body.substring(0, 5)} {/* Display first 200 characters of body */}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`/article-edit/${article.articleID}`}
          style={{ textDecoration: 'none', fontFamily: '"Bona Nova SC", serif', fontSize: '20px', fontWeight: 'bold' }}
        >
          Edit
        </Button>

        <Button sx={{ textDecoration: 'none', fontFamily: '"Bona Nova SC", serif', fontSize: '20px', fontWeight: 'bold', backgroundColor: 'red', color: 'white' }} onClick={handleDialogOpen}>
          Delete Article
        </Button>
        <ArticleDeleteAlertDialog
          title={`Delete Article: ${displayedTitle}`}
          description="Are you sure you want to delete this article? This action cannot be undone."
          open={dialogOpen}
          handleClose={handleDialogClose}
          handleConfirm={handleDeleteConfirm}
        />

        <Button size="small" component={Link} to={`/article/${article.articleID}`} style={{ textDecoration: 'none', fontFamily: '"Bona Nova SC", serif', fontSize: '15px', fontWeight: 'bold' }}>
          Read Article
        </Button>
      </CardActions>
    </Card>
  );
}

export default ArticleSummaryProfile;