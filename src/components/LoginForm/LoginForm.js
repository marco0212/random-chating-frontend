import React, { useState } from 'react';

export default function LoginForm () {
  const [username, setUsername] = useState('');

  function changeHandler(e) {
    setUsername(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log(username);
  }
  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <legend>Your name</legend>
        <p>
          <input
            type="text"
            value={username}
            placeholder="Type your nickname"
            onChange={changeHandler}
          />
        </p>
        <p>
          <button>Join</button>
        </p>
      </fieldset>
    </form>
  );
}
