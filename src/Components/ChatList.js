import React from 'react';
import styles from './ChatList.module.css';
import ContactElement from './ContactElement';

function ChatList({ chats, onSelect }) {
    return (
        <div className={styles.chatList}>
            <ul className={styles.contactList}>
                {chats.map(chat => (
                    <li key={chat.id} onClick={() => onSelect(chat.id)}>
                        <ContactElement 
                            name={chat.name} 
                            message={chat.message} 
                            imgSrc={chat.imgSrc} 
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatList;