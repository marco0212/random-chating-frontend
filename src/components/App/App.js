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
            <ChatForm onSubmit={chatSubmitHandler}>
              <ul>
                {
                  isPending && 'Looking for peer'
                }
                {
                  chats.map((chat, index) => {
                    const { type, message } = chat;

                    return (
                      <Message key={`chat-${index}`} type={type}>
                        <p>{message}</p>
                      </Message>
                    )
                  })
                }
              </ul>
              <InputGroup>
                <input type="text" value={chatText} onChange={chatChangeHandler}/>
                <button type="submit">Submit</button>
              </InputGroup>
            </ChatForm>
          ) : (
            <LoginForm onSubmit={usernameSubmitHandler}>
              <InputGroup>
                <input type="text" value={username} onChange={usernameChangeHandler} placeholder="Type your nickname"/>
                <button type="submit">Submit</button>
              </InputGroup>
            </LoginForm>
          )
        }
      </Main>
    </>
  )
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
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
  background-color: #eee;
  padding: 20px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const LoginForm = styled(Form)`
  margin: auto;
`;
const ChatForm = styled(Form)`
  & > ul {
    flex: 1;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    margin-bottom: 21px;
  }
`;
const Message = styled.li`
  ${props => props.type === 'to' && 'text-align: right;'}
  margin-bottom: 10px;
  word-break: break-all;
  &:last-child {
    margin-bottom: 0;
  }

  & p {
    ${props => {
      if (props.type === 'log') {
        return 'font-weight: bold;font-style: italic;';
      } else {
        return (
          'display: inline-block;' +
          'max-width: 70%;' +
          'line-height: 21px;' +
          'padding: 5px 15px;' +
          'border-radius: 5px;' +
          'box-shadow: 0px 0px 5px rgba(0, 0, 0, .2);'
        );
      }
    }}
    text-align: left;
  }
`;
const InputGroup = styled.p`
  display: flex;
  border-radius: 4px;
  overflow: hidden;

  & input, & button {
    border: 0;
    font-size: inherit;
    line-height: 40px;
    height: 40px;
    padding: 0 15px;
  }
  & input {
    flex: 1;
  }
  & button {
    background-color: #666;
    color: #fff;
  }
`;
