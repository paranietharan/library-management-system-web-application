import { useEffect, useState } from 'react';
import styles from './style/ViewBookCommentsStyle.module.css';
import SendIcon from '@mui/icons-material/Send';
import httpCommon from '../service/http-common';

function ViewBookComments({ comments, newComment, setNewComment, handleAddComment }) {
    const [profiles, setProfiles] = useState({});

    useEffect(() => {
        const fetchCommenterProfiles = async () => {
            const profilePromises = comments.map(async (comment) => {
                try {
                    const response = await httpCommon.get(`/user/getUserProfile/${comment.userID}`);
                    const data = response.data;
                    return { userID: comment.userID, profile: data };
                } catch (error) {
                    console.error('Error fetching commenter profile:', error);
                    return { userID: comment.userID, profile: null };
                }
            });

            const profilesArray = await Promise.all(profilePromises);
            const profilesMap = profilesArray.reduce((acc, { userID, profile }) => {
                acc[userID] = profile;
                return acc;
            }, {});

            setProfiles(profilesMap);
        };

        if (comments.length > 0) {
            fetchCommenterProfiles();
        }
    }, [comments]);

    return (
        <>
            <div className={styles.writeComment}>
                <div className={styles.addComment}>
                    <textarea
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                    ></textarea>
                    <button onClick={handleAddComment}>
                        <SendIcon />
                    </button>
                </div>
            </div>
            <div className={styles.commentSection}>
                <h2>Comments</h2>
                <div className={styles.commentList}>
                    <div className={styles.comments}>
                        {comments.map(comment => (
                            <div key={comment.resourceCommentId} className={styles.comment}>
                                <img
                                    src={profiles[comment.userID].profileImg ?
                                         `data:image/png;base64,${profiles[comment.userID].profileImg}`: 
                                         'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account'}
                                    alt={profiles[comment.userID]?.username || 'Unknown'}
                                />
                                <div>
                                    <p>{profiles[comment.userID]?.firstName ? `${profiles[comment.userID].firstName} ${profiles[comment.userID].lastName}` : 'Anonymous'}</p>
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewBookComments;