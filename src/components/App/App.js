import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8080');

export default function App () {
  const [username, setUsername] = useState('');

  socket.on('chat start', peerName => {
    console.log(peerName);
  });

  function usernameChangeHandler (e) {
    setUsername(e.target.value);
  }

  function usernameSubmitHandler (e) {
    e.preventDefault();
    socket.emit('login', username);
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
    </div>
  )
}
