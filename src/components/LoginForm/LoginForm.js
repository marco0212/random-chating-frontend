import React from 'react';

export default function LoginForm ({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Your name</legend>
        <p>
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Type your nickname"
          />
        </p>
        <p>
          <button>Join</button>
        </p>
      </fieldset>
    </form>
  );
}
