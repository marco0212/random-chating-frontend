import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8080');

export default function App () {
  const [username, setUsername] = useState('');
  const [peerName, setPeerName] = useState('');
  const [chatText, setChatText] = useState('');
  const [chats, setChats] = useState([]);

  socket.on('chat start', peerName => {
    const message = `${peerName} was join.`;
    const chatEle = createChatEle('log', message);

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

  function createChatEle(type, message) {
    return { type, message };
  }

  function appendChatEle(ele) {
    const copyChats = chats.slice();

    copyChats.push(ele);
    setChats(copyChats);
  }

  function next () {
    socket.emit('leave room');
  }
  return (
    <div>
      <button onClick={next}>next</button>
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
      </form>
    </div>
  )
}
