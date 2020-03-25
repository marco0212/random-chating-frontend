import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import ChatArea from '../ChatArea/ChatArea';

export default function ChatForm({
  chats,
  isTyping,
  isPending,
  InputValue,
  onChangeHandler,
  onSubmitHandler
}) {
  return (
    <Form onSubmit={onSubmitHandler}>
      <ChatArea
        chats={chats}
        isTyping={isTyping}
        isPending={isPending}
      />
      <InputGroup>
        <input
          type="text"
          value={InputValue}
          onChange={onChangeHandler}
          disabled={isPending}
        />
        <button type="submit" disabled={isPending}>Submit</button>
      </InputGroup>
    </Form>
  );
}

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
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
    background-color: #4caf50;
    color: #fff;
  }
  & button:disabled {
    background-color: #666;
  }
`;

ChatForm.propTypes = {
  chats: propTypes.array,
  isTyping: propTypes.bool,
  isPending: propTypes.bool,
  InputValue: propTypes.string,
  onChangeHandler: propTypes.func,
  onSubmitHandler: propTypes.func
};
