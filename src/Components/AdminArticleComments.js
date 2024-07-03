import React, { useState } from "react";
import Comment from "./Comment";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import ArticleCommentDeleteAlertBox from "./ArticleCommentDeleteAlertBox";

function AdminArticleComments({ comments, articleId }) {
    const [open, setOpen] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [commentList, setCommentList] = useState(comments);

    const handleClickOpen = (commentId) => {
        setSelectedCommentId(commentId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCommentId(null);
    };

    const handleDelete = () => {
        // Replace with your delete URL and the appropriate comment ID
        axios.delete(`http://localhost:8080/article/comment/${selectedCommentId}`)
            .then(response => {
                // Remove the comment from the list after successful deletion
                setCommentList(commentList.filter(comment => comment.id !== selectedCommentId));
                setOpen(false);
            })
            .catch(error => {
                console.error('Error deleting comment:', error);
                setOpen(false);
            });
    };

    // Check if comments array is undefined
    if (!comments) {
        return <div>No comments available</div>;
    }

    return (
        <>
            <h1>Comments</h1>
            <div style={{ padding: 14, width: "40vw", margin: "0 auto", overflowY: "auto", maxHeight: "25vh", }}>
                {commentList.map((comment, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <Comment key={index} comment={comment} style={{ height: "100px" }} />
                        <DeleteIcon onClick={() => handleClickOpen(comment.articleCommentId)} style={{ cursor: 'pointer' }} />
                    </div>
                ))}
            </div>
            <ArticleCommentDeleteAlertBox
                open={open}
                onClose={handleClose}
                onConfirm={handleDelete}
                title="Delete Comment"
                description="Are you sure you want to delete this comment?"
            />
        </>
    );
}

export default AdminArticleComments;