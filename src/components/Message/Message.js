import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { chatTypes } from '../../constants';

const { LOG, TO } = chatTypes;

export default function Message({ type, text }) {
  return (
    <MessageWrapper type={type}>
      <p>{text}</p>
    </MessageWrapper>
  );
}

const MessageWrapper = styled.li`
  ${props => props.type === TO && 'text-align: right;'}
  margin-bottom: 10px;
  word-break: break-all;
  &:last-child {
    margin-bottom: 0;
  }
  & p {
    text-align: left;
    ${props => {
      if (props.type === LOG) {
        return 'font-weight: bold;font-style: italic;';
      } else {
        return (
          'display: inline-block;'
          + 'max-width: 70%;'
          + 'line-height: 21px;'
          + 'padding: 5px 15px;'
          + 'border-radius: 5px;'
          + 'box-shadow: 0px 0px 5px rgba(0, 0, 0, .2);'
        );
      }
    }}
  }
`;

Message.prototype = {
  type: propTypes.string,
  text: propTypes.string
};
