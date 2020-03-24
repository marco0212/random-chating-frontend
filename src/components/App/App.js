import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import Header from '../Header/Header';
import ChatForm from '../ChatForm/ChatForm';
import LoginForm from '../LoginForm/LoginForm';
import { eventNames, chatTypes } from '../../constants';

const socket = io.connect('http://localhost:8080');

export default function App ({
  chats, 
  isLogin,
  isPending,
  isTyping,
  addChat,
  resetChat,
  updateIsLogin,
  updateIsPending,
  updateIsTyping
}) {
  const [username, setUsername] = useState('');
  const [peerName, setPeerName] = useState('');
  const [chatText, setChatText] = useState('');
  const { LOGIN, MESSAGE, CHAT_START, TYPING, CHAT_END, LEAVE_ROOM } = eventNames;
  const { LOG, FROM, TO } = chatTypes;

  useEffect(() => {
    socket.on(CHAT_START, peerName => {
      const message = `${peerName} joined.`;
      const chatEle = ChatCreator(LOG, message);

      updateIsPending(false);
      setPeerName(peerName);
      addChat(chatEle);
    });

    socket.on(TYPING, () => {
      updateIsTyping(true);
    });

    socket.on(MESSAGE, message => {
      const chatEle = ChatCreator(FROM, message);

      updateIsTyping(false);
      addChat(chatEle);
    });
  }, []);

  useEffect(() => {
    if (peerName) {
      socket.on(CHAT_END, () => {
        const message = `${peerName} left.`;
        const chatEle = ChatCreator(LOG, message);

        addChat(chatEle);
      });
    }
  }, [peerName])

  function usernameChangeHandler (e) {
    setUsername(e.target.value);
  }

  function usernameSubmitHandler (e) {
    e.preventDefault();

    if (username.trim()) {
      updateIsLogin(true);
      socket.emit(LOGIN, username);
    }
  }

  function chatChangeHandler (e) {
    setChatText(e.target.value);
    socket.emit(TYPING);
  }

  function chatSubmitHandler (e) {
    e.preventDefault();

    if (chatText.trim()) {
      const chatEle = ChatCreator(TO, chatText);

      addChat(chatEle);
      socket.emit(MESSAGE, chatText);
      setChatText('');
    }
  }

  function nextClickHandler () {
    socket.emit(LEAVE_ROOM);
    resetChat();
    updateIsPending(true);
  }

  function ChatCreator(type, message) {
    return { type, message };
  }
  return (
    <>
      <Header
        isPending={isPending}
        onButtonClick={nextClickHandler}
      />
      <Main>
        {
          isLogin ? (
            <ChatForm
              chats={chats}
              isTyping={isTyping}
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
