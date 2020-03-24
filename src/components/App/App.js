import React, { useState } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import Header from '../Header/Header';
import ChatForm from '../ChatForm/ChatForm';
import LoginForm from '../LoginForm/LoginForm';

const socket = io.connect('http://localhost:8080');

export default function App () {
  const [username, setUsername] = useState('');
  const [peerName, setPeerName] = useState('');
  const [chatText, setChatText] = useState('');
  const [chats, setChats] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isPending, setIsPending] = useState(true);

  socket.on('chat start', peerName => {
    const message = `${peerName} joined.`;
    const chatEle = createChatEle('log', message);

    setIsPending(false);
    setPeerName(peerName);
    appendChatEle(chatEle);
  });

  socket.on('typing', () => {
    
  });

  socket.on('chat end', () => {
    const message = `${peerName} left.`;
    const chatEle = createChatEle('log', message);

    appendChatEle(chatEle);
  });

  socket.on('message', message => {
    const chatEle = createChatEle('from', message);

    appendChatEle(chatEle);
  });

  function usernameChangeHandler (e) {
    setUsername(e.target.value);
  }

  function usernameSubmitHandler (e) {
    e.preventDefault();
    setIsLogin(true);
    socket.emit('login', username);
  }

  function chatChangeHandler (e) {
    setChatText(e.target.value);
    socket.emit('typing');
  }

  function chatSubmitHandler (e) {
    e.preventDefault();
    const chatEle = createChatEle('to', chatText);

    appendChatEle(chatEle);
    socket.emit('message', chatText);
    setChatText('');
  }

  function nextClickHandler () {
    socket.emit('leave room');
    setChats([]);
    setIsPending(true);
  }

  function createChatEle(type, message) {
    return { type, message };
  }

  function appendChatEle(ele) {
    const copyChats = chats.slice();

    copyChats.push(ele);
    setChats(copyChats);
  }
  return (
    <>
      <Header isPending={isPending} onButtonClick={nextClickHandler}/>
      <Main>
        {
          isLogin ? (
            <ChatForm
              chats={chats}
              isPending={isPending}
              InputValue={chatText}
              onChangeHandler={chatChangeHandler}
              onSubmitHandler={chatSubmitHandler}
            />
          ) : (
            <LoginForm
              InputValue={username}
              onChangeHandler={usernameChangeHandler}
              onSubmitHandler={usernameSubmitHandler}
            />
          )
        }
      </Main>
    </>
  )
}

const Main = styled.main`
  flex: 1;
  display: flex;
  background-color: #eee;
  padding: 20px;
`;
