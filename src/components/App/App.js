import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8080');

export default function App () {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  socket.on('chat start', peerName => {
    console.log(peerName);
  });

  socket.on('message', message => {
    console.log(message);
  });

  function usernameChangeHandler (e) {
    setUsername(e.target.value);
  }

  function usernameSubmitHandler (e) {
    e.preventDefault();
    socket.emit('login', username);
  }

  function chatChangeHandler (e) {
    setMessage(e.target.value);
  }

  function chatSubmitHandler (e) {
    e.preventDefault();
    socket.emit('message', message);
  }
  return (
    <div>
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
          </ul>
          <p>
            <input type="text" value={message} onChange={chatChangeHandler}/>
          </p>
          <p>
            <button type="submit">Submit</button>
          </p>
        </fieldset>
      </form>
    </div>
  )
}
