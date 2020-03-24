import React from 'react';
import styled from 'styled-components';
import { InputGroup, Form } from '../ChatForm/ChatForm';

export default function LoginForm ({
  InputValue,
  onChangeHandler,
  onSubmitHandler
}) {
  return (
    <LoginFormWrapper onSubmit={onSubmitHandler}>
      <InputGroup>
        <input
          type="text"
          value={InputValue}
          onChange={onChangeHandler}
          placeholder="Type your nickname"
        />
        <button type="submit">Submit</button>
      </InputGroup>
    </LoginFormWrapper>
  );
}

const LoginFormWrapper = styled(Form)`
  margin: auto;
`;
