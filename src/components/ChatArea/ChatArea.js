import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import Message from '../Message/Message';
import { chatTypes } from '../../constants';

const { LOG, TYPING } = chatTypes;

export default function ChatArea({
  chats,
  isTyping,
  isPending
}) {
  return (
    <Chats>
      {
        isPending && <Message type={LOG} text={'Looking for peer'}/>
      }
      {
        chats.map((chat, index) => {
          const { type, message } = chat;

          return (
            <Message key={`chat-${index}`} type={type} text={message} />
          );
        })
      }
      {
        isTyping && <Message type={TYPING} text={'Typing...'}/>
      }
    </Chats>
  );
}

const Chats = styled.ul`
  flex: 1;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 21px;
`;

ChatArea.propTypes = {
  chats: propTypes.array,
  isTyping: propTypes.bool,
  isPending: propTypes.bool
};
