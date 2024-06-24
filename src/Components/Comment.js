import React from "react";

function Comment({ comment }) {
    const { comment: content, commenterId: authorId, articleId, timestamp } = comment;

    return (
        <>
            <div style={{ padding: "20px 10px", display: "flex", alignItems: "center" }}>
                <div style={{ flex: "1", minWidth: "0" }}>
                    <p style={{ textAlign: "left" }}>{content}</p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        posted on {timestamp}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        Commenter ID: {authorId}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        Article ID: {articleId}
                    </p>
                </div>
            </div>
            <hr style={{ margin: "5px 0", border: "none", borderBottom: "1px solid #ccc" }} />
        </>
    );
}

export default Comment;