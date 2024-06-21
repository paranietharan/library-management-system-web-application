import React, { useState } from 'react';
import UserNavBar from '../Components/UserNavBar';
import { MessageLeft, MessageRight } from '../Components/Message';
import styles from './style/userChat.module.css';
import SendIcon from '@mui/icons-material/Send';

function UserChat() {
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleMessageSubmit = () => {
        if (messageInput.trim() !== '') {
            // Add the message to the messages array
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    content: messageInput,
                    sender: 'user', // Assuming current user is the sender
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Get current time
                }
            ]);
            // Clear the message input field
            setMessageInput('');
            console.log(messages);
        }
    };

    return (
        <>
            <UserNavBar />

            <div className={styles.userChatContainer}>
                <div className={styles.chatBox}>
                    <MessageLeft
                        message="Hello, how are you?"
                        timestamp="10:00 AM"
                        photoURL="https://via.placeholder.com/150"
                        displayName="John"
                    />
                    <MessageRight
                        message="I'm good, thanks! How about you?"
                        timestamp="10:05 AM"
                    />
                    <MessageLeft
                        message="I'm doing great, thanks for asking."
                        timestamp="10:10 AM"
                        photoURL="https://via.placeholder.com/150"
                        displayName="John"
                    />
                </div>

            </div>

            <div className={styles.messageInputContainer}>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                    className={styles.messageInput}
                />
                <button onClick={handleMessageSubmit} className={styles.sendMessageButton}>
                    <SendIcon />
                </button>
            </div>
        </>
    );
}

export default UserChat;