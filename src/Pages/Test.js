import React from 'react';
import Chat from '../Components/Chat';

function Test() {

  const username = "JohnDoexyx";  // or "Admin" for admin user
  const isAdmin = false;  // or true for admin user

  return (
    <div>
      <h1>My Chat Application</h1>
      <Chat username={username} isAdmin={false} />
    </div>
  );
}
export default Test;