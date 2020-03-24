import React, { useState } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
const socket = io.connect('http://localhost:8080');

export default function App () {
  const [username, setUsername] = useState('');
  const [peerName, setPeerName] = useState('');
  const [chatText, setChatText] = useState('');
  const [chats, setChats] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isPending, setIsPending] = useState(true);

  socket.on('chat start', peerName => {
    const message = `${peerName} was join.`;
    const chatEle = createChatEle('log', message);

    setIsPending(false);
    setPeerName(peerName);
    appendChatEle(chatEle);
  });

  socket.on('typing', () => {
    
  });

  socket.on('leave room', () => {
    const message = `${peerName} was leave.`;
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
  }

  function nextClickHandler () {
    socket.emit('leave room');
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
      <Header>
        <h1>Hang out new friends</h1>
        {
          !isPending && <button onClick={nextClickHandler}>next</button>
        }
      </Header>
      <Main>
        {
          isLogin ? (
            <form onSubmit={chatSubmitHandler}>
              <fieldset>
                <legend>Chat Area</legend>
                <ul>
                  {
                    chats.map((chat, index) => {
                      const { type, message } = chat;
                      return (
                        <li key={`chat-${index}`}>{ message }</li>
                      )
                    })
                  }
                </ul>
                <p>
                  <input type="text" value={chatText} onChange={chatChangeHandler}/>
                </p>
                <p>
                  <button type="submit">Submit</button>
                </p>
              </fieldset>
              {
                isPending && "Pending..."
              }
            </form>
          ) : (
            <form onSubmit={usernameSubmitHandler}>
              <fieldset>
                <legend>Set your nickname</legend>
                <p>
                  <input type="text" value={username} onChange={usernameChangeHandler} />
                </p>
                <p>
                  <button type="submit">Submit</button>
                </p>
              </fieldset>
            </form>
          )
        }
      </Main>
    </>
  )
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #ebebeb;
  padding: 20px;
  & h1 {
    font-size: 20px;
  }
  & button {
    border: 0;
    padding: 0 20px;
    font-size: 16px;
    border-radius: 5px;
    text-transform: uppercase;
  }
`;
const Main = styled.main`
  flex: 1;
  display: flex;
`;
