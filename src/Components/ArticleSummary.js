import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

function ArticleSummary({ article }) {
  const title = article.contents.title.split(' ');
  const displayedTitle = title.length > 7 ? `${title.slice(0, 7).join(' ')}...` : title.join(' ');


  return (
    <Card sx={{ maxWidth: '25%', maxHeight: '400px', margin: '10px', backgroundColor: '#e6e6e6' }}>
      <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={article.articleImage}
            alt="Article Image"
            style={{ width: '25vw', maxHeight: '250px', height: 'auto' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {/* {article.contents.title.split(' ').slice(0, 7).join(' ')} getting title from article.contents */}
              {displayedTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {article.contents.paragraphs[0].split(' ').slice(0, 10).join(' ')} {/* 2 display the first paragraph 10 wrds as summary */}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" component={Link} to={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
          Read Article
        </Button>
      </CardActions>
    </Card>
  );
}

export default ArticleSummary;
