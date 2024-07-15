import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import styled from 'styled-components';
import { serverTimestamp } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD4byuiSTU9LkuTAiQMJ2pNrJlQtp3BjV8",
  authDomain: "librarymanagementsystemchat.firebaseapp.com",
  projectId: "librarymanagementsystemchat",
  storageBucket: "librarymanagementsystemchat.appspot.com",
  messagingSenderId: "983035203953",
  appId: "1:983035203953:web:6167dd445148c26f6826d0"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp, 'https://librararymanagementsystemchat-default-rtdb.asia-southeast1.firebasedatabase.app/');
const ChatContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #999999;
  border-radius: 5px;
`;

const MessageList = styled.div`
  height: 300px;
  overflow-y: auto;
  border: 1px solid #999999;
  padding: 10px;
  margin-bottom: 20px;
`;

const MessageItem = styled.div`
  margin-bottom: 10px;
  text-align: ${props => props.isCurrentUser ? 'right' : 'left'};
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Chat = ({ username, isAdmin, selectedUser }) => {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);

  const chatPartner = isAdmin ? selectedUser : 'Librarian';
  const messagesRef = ref(database, `chats/${isAdmin ? selectedUser : username}`); // user-specific chat room

  // useEffect(() => {
  //   const unsubscribe = onValue(messagesRef, (snapshot) => {
  //     const messagesArray = [];
  //     snapshot.forEach((childSnapshot) => {
  //       messagesArray.push(childSnapshot.val());
  //     });
  //     console.log('Fetched messages:', messagesArray); // Log fetched messages for debugging
  //     setMessages(messagesArray);
  //   }, {
  //     onlyOnce: true // Ensure the listener fires only once initially
  //   });

  //   return () => {
  //     // Clean up the listener on component unmount
  //     unsubscribe();
  //   };
  // }, [isAdmin, selectedUser, username]);
  useEffect(() => {
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesArray = [];
      snapshot.forEach((childSnapshot) => {
        messagesArray.push(childSnapshot.val());
      });
      console.log('Fetched messages:', messagesArray); // Log fetched messages for debugging
      setMessages(messagesArray);
    });

    return () => {
      // Clean up the listener on component unmount
      unsubscribe();
    };
  }, [isAdmin, selectedUser, username]);

  useEffect(() => {
    // Scroll to bottom of message list on update
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim()) {
      push(messagesRef, {
        text: messageInput.trim(),
        createdAt: serverTimestamp(),
        username: username,
        isAdmin: isAdmin
      });
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <ChatContainer>
      <h2>Chat with {chatPartner}</h2>
      <MessageList ref={messageListRef}>
        {messages.map((msg, index) => (
          <MessageItem key={index} isCurrentUser={msg.isAdmin === isAdmin || msg.username === username}>
            <strong>{msg.username}:</strong> {msg.text}
          </MessageItem>
        ))}
      </MessageList>
      <InputContainer>
        <Input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat;