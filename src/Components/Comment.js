import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Comment({ comment }) {
    const { comment: content, commenterId: authorId } = comment;
    const [commenter, setCommenter] = useState({});

    useEffect(() => {
        const fetchCommenterName = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/getUserProfile/${authorId}`);
                const commenter = response.data;
                setCommenter(commenter);
            } catch (error) {
                console.error("Error fetching commenter details:", error);
            }
        };

        fetchCommenterName();
    }, [authorId]);

    const commenterName = commenter.firstName + " " + commenter.lastName;

    return (
        <>
            <div style={{ padding: "20px 10px", display: "flex", alignItems: "center" }}>
            {commenter.profileImg ? (
                    <img
                        src={`data:image/png;base64,${commenter.profileImg}`}
                        alt={`${commenter.firstName} ${commenter.lastName}`}
                        style={{ width: 50, height: 50, borderRadius: "50%", marginRight: 10, border: '2px solid #8c8c8c' }}
                    />
                ) : (
                    <img
                        src="https://www.w3schools.com/howto/img_avatar.png" // Placeholder image or default avatar
                        alt="Default Avatar"
                        style={{ width: 50, height: 50, borderRadius: "50%", marginRight: 10, border: '2px solid #8c8c8c' }}
                    />
                )}
                <div style={{ flex: "1", minWidth: "0" }}>
                    <p style={{ textAlign: "left" }}>{content}</p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        {commenterName}
                    </p>
                </div>
            </div>
            <hr style={{ margin: "5px 0 0 0", border: "none", borderBottom: "1px solid #ccc" }} />
        </>
    );
}

export default Comment;