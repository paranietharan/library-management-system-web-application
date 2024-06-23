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
  const displayedTitle = title.length > 7 ? `${title.slice(0, 7).join(' ')}...` : title.join(' ');

  return (
    <Card sx={{ maxWidth: '25%', maxHeight: '400px', margin: '10px', backgroundColor: '#e6e6e6' }}>
      <Link to={`/article/${article.articleId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
              {displayedTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {article.body.substring(0, 200)} {/* Display first 200 characters of body */}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" component={Link} to={`/article/${article.articleId}`} style={{ textDecoration: 'none' }}>
          Read Article
        </Button>
      </CardActions>
      {article.author && (
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary">
            Author: {article.author.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Published Date: {article.dateCreated}
          </Typography>
        </CardContent>
      )}
      {article.comments && (
        <CardContent>
          <Typography variant="h6" color="text.primary">
            Comments:
          </Typography>
          {article.comments.map(comment => (
            <div key={comment.id}>
              <Typography variant="body2" color="text.secondary">
                {comment.content}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Commented by: {comment.author.name} on {comment.timestamp}
              </Typography>
            </div>
          ))}
        </CardContent>
      )}
      {article.averageRating && (
        <CardContent>
          <Typography variant="subtitle1" color="text.primary">
            Average Rating: {article.averageRating}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}

export default ArticleSummary;