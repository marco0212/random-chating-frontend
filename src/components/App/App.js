import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import Header from '../Header/Header';
import ChatForm from '../ChatForm/ChatForm';
import LoginForm from '../LoginForm/LoginForm';
import { eventNames, chatTypes } from '../../constants';

const socket = io.connect('http://localhost:8080');

export default function App ({ chats, addChat, resetChat}) {
  const [username, setUsername] = useState('');
  const [peerName, setPeerName] = useState('');
  const [chatText, setChatText] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const { LOGIN, MESSAGE, CHAT_START, TYPING, CHAT_END, LEAVE_ROOM } = eventNames;
  const { LOG, FROM, TO } = chatTypes;

  useEffect(() => {
    socket.on(CHAT_START, peerName => {
      const message = `${peerName} joined.`;
      const chatEle = ChatCreator(LOG, message);

      setIsPending(false);
      setPeerName(peerName);
      addChat(chatEle);
    });

    socket.on(TYPING, () => {
      setIsTyping(true);
    });

    socket.on(MESSAGE, message => {
      const chatEle = ChatCreator(FROM, message);

      setIsTyping(false);
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
      setIsLogin(true);
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
    setIsPending(true);
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
