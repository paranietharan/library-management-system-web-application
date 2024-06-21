import React from "react";

function Comment({ comment }) {
    const { imgLink, author, content, timestamp } = comment;

    return (
        <>
            <div style={{ padding: "20px 10px", display: "flex", alignItems: "center" }}>
                <img src={imgLink} alt={author} style={{ borderRadius: "50%", width: "50px", height: "50px", marginRight: "10px" }} />
                <div style={{ flex: "1", minWidth: "0" }}>
                    <h4 style={{ margin: 0, textAlign: "left" }}>{author}</h4>
                    <p style={{ textAlign: "left" }}>{content}</p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        posted {timestamp}
                    </p>
                </div>
            </div>
            <hr style={{ margin: "5px 0", border: "none", borderBottom: "1px solid #ccc" }} />
        </>
    );
}

export default Comment;