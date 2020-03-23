import React, { useState } from 'react';

export default function ChatPlayground({ chats }) {
  const [text, setText] = useState('');

  function inputChangeHandler(e) {
    setText(e.target.value);
  }

  function formSubmitHandler(e) {
    e.preventDefault();
    setText('');
  }

  return (
    <main>
      <ul>
        {
          chats.map(chat => {
            const {} = chat;
            
            return (
              <li className="message-wrapper from">
                <div className="message">{chat.message}</div>
              </li>
            );
          })
        }
        {/* <li className="message-wrapper from">
          <div className="message">Hello, What your name?</div>
        </li>
        <li className="message-wrapper to">
          <div className="message">Hi, My name is Jeong</div>
        </li> */}
      </ul>
      <form onSubmit={formSubmitHandler}>
        <input type="text" value={text} onChange={inputChangeHandler} />
      </form>
    </main>
  )
}