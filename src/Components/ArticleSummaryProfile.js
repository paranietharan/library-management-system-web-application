import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

function ArticleSummaryProfile({ article }) {
  const title = article.title.split(' ');
  const displayedTitle = title.length > 7 ? `${title.slice(0, 7).join(' ')}...` : title.join(' ');

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
            <Typography gutterBottom variant="h5" component="div">
              {displayedTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {article.body.substring(0, 200)} {/* Display first 200 characters of body */}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" component={Link} to={`/article-edit/${article.articleID}`} style={{ textDecoration: 'none' }}>Edit</Button>
        <Button size="small">Delete</Button>
        <Button size="small" component={Link} to={`/article/${article.articleID}`} style={{ textDecoration: 'none' }}>
          Read Article
        </Button>
      </CardActions>
    </Card>
  );
}

export default ArticleSummaryProfile;