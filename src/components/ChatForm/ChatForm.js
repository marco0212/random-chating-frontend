import React from 'react';
import styled from 'styled-components';

export default function ChatForm({
  chats,
  isPending,
  InputValue,
  onChangeHandler,
  onSubmitHandler
}) {
  return (
    <ChatFormWrapper onSubmit={onSubmitHandler}>
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
        <input
          type="text"
          value={InputValue}
          onChange={onChangeHandler}
        />
        <button type="submit">Submit</button>
      </InputGroup>
    </ChatFormWrapper>
  );
}

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ChatFormWrapper = styled(Form)`
  & > ul {
    flex: 1;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    margin-bottom: 21px;
  }
`;
export const InputGroup = styled.p`
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
