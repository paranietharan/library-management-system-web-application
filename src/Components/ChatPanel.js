import React from 'react';
import styles from './ChatPanel.module.css';
import ChatIcon from '@mui/icons-material/Chat';

function ChatPanel({ selectedChat }) {
    return (
        <div className={styles.chatPanel}>
            {selectedChat ? (
                <div>
                    <h3>Chat with {selectedChat}</h3>
                </div>
            ) : (
                <div className={styles.nonSelectMsg}>
                    <p>Please select a chat from the list</p>
                    <ChatIcon />
                </div>
            )}
        </div>
    );
}

export default ChatPanel;
