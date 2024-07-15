import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import styled from 'styled-components';
import Chat from './Chat';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

const UserListContainer = styled.div`
  max-width: 200px;
  margin: 20px;
  border: 1px solid #999999;
  border-radius: 5px;
  width: 10vw;
`;

const UserListItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const AdminChat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, 'chats');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const users = snapshot.val() ? Object.keys(snapshot.val()) : [];
      setUserList(users);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <UserListContainer>
        <h3 style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '10px' }}>
          <GroupIcon style={{ marginRight: '8px' }} /> Users
        </h3>
        {userList.map(user => (
          <UserListItem
            key={user}
            onClick={() => setSelectedUser(user)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              backgroundColor: selectedUser === user ? '#cccccc' : '#e6e6e6',
              borderRadius: '5px',
              border: '1px solid #808080',
            }}>
            <AccountCircleIcon style={{ marginRight: '8px' }} />
            {user}
          </UserListItem>
        ))}
      </UserListContainer>
      {selectedUser && <Chat username="Admin" isAdmin={true} selectedUser={selectedUser} />}
    </div>
  );
};

export default AdminChat;