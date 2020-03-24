import React from 'react';
import styled from 'styled-components';

export default function Header({ isPending, onButtonClick }) {
  return (
    <HeaderWrapper>
      <h1>Hello Stranger?</h1>
      {
        !isPending && <button onClick={onButtonClick}>next</button>
      }
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
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
    background-color: #eee;
    text-transform: uppercase;
  }
`;
