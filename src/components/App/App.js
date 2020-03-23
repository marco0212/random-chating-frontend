import React, { useEffect, useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import io from 'socket.io-client';
import ChatPlayground from '../ChatPlayground/ChatPlayground';

const socket = io.connect('http://localhost:8080');

export default function App () {
  const [nickname, setNickname] = useState('');
  const [room, setRoom] = useState('');
  const [chats, setChats] = useState([]);

  socket.on('chat start', data => {
    const { name, roomId } = data;

    setRoom(roomId);
    log(`${name} is Joined. Enjoy!`);
  });

  function onNicknameInputHandler(e) {
    setNickname(e.target.value);
  }

  function onLoginFormSubmitHandler(e) {
    e.preventDefault();
    socket.emit('login', nickname);
  }

  function log(message) {
    const chat = {
      type: 'LOG',
      message
    };
    const copyChats = chats.slice();

    copyChats.push(chat);
    setChats(copyChats);
  }
  return (
    <div className="App">
      <header>
        <h1>Hello Anonymous!</h1>
      </header>
      <main>
        <ChatPlayground
          chats={chats}
        />
        <LoginForm
          value={nickname}
          onChange={onNicknameInputHandler}
          onSubmit={onLoginFormSubmitHandler}
        />
      </main>
    </div>
  );
}
