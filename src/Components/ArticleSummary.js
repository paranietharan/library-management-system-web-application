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
  const title = article.title.split(' ');
  const displayedTitle = title.length > 7 ? `${title.slice(0, 4).join(' ')}...` : title.join(' ');

  return (
    <Card sx={{ maxWidth: '100%', maxHeight: '400px', margin: '10px', backgroundColor: '#e6e6e6' , border: '2px solid #cccccc'}}>
      <Link to={`/article/${article.articleID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {/* Use article.articleID instead of article.articleId */}
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`data:image/jpeg;base64,${article.articleImg}`}
            alt="Article Image"
            style={{ width: '25vw', maxHeight: '250px', height: 'auto', border: '2px solid #b3b3b3', objectFit: 'cover' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: '"Oswald", sans-serif',}}>
              {displayedTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{fontFamily: '"Playwrite NO"', fontWeight: '1000'}}>
              {article.body.substring(0, 20)} {/* Display first 200 characters of body */}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" component={Link} to={`/article/${article.articleID}`} style={{ textDecoration: 'none' }}>
          Read Article
        </Button>
      </CardActions> */}
    </Card>
  );
}

export default ArticleSummary;