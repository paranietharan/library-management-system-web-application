import React, { useState } from 'react';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import ChatPanel from '../Components/ChatPanel';
import ChatList from '../Components/ChatList';
import styles from './style/LibrarianChatStyle.module.css';
import Footer from '../Components/LibraryFooter';

function LibrarianChat() {
    // State to manage selected chat
    const [selectedChat, setSelectedChat] = useState(null);

    // Dummy data for chat list
    const chatList = [
        { id: 1, name: 'John Doe', message: "Hey there! How are you?", imgSrc: "https://example.com/avatar.jpg"},
        { id: 2, name: 'Jane Smith', message: "Hey there! How are you?", imgSrc: "https://example.com/avatar.jpg" },
        { id: 3, name: 'Alice Johnson', message: "Hey there! How are you?", imgSrc: "https://example.com/avatar.jpg" },
        { id: 4, name: 'John Doe', message: "Hey there! How are you?", imgSrc: "https://example.com/avatar.jpg"},
        { id: 5, name: 'Jane Smith', message: "Hey there! How are you?", imgSrc: "https://example.com/avatar.jpg" },
        { id: 6, name: 'Alice Johnson', message: "Hey there! How are you?", imgSrc: "https://example.com/avatar.jpg" }
    ];

    // Handler function to select a chat
    const handleChatSelect = (chatId) => {
        setSelectedChat(chatId);
    };

    return (
        <div className={styles.librarianChat}>
            <LibrarianTopNavBar />

            <div className={styles.Container}>
                <div className={styles.chatContainer}>
                    <div className={styles.chatList}>
                        <ChatList chats={chatList} onSelect={handleChatSelect} />
                    </div>

                    <div className={styles.chatPannel} >
                        <ChatPanel selectedChat={selectedChat} />
                    </div>
                </div>
            </div>

            <Footer />
        </div >
    );
}

export default LibrarianChat;