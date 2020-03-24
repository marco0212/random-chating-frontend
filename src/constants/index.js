const ADD_CHAT = 'ADD_CHAT';
const RESET_CHAT = 'RESET_CHAT';
const UPDATE_IS_LOGIN = 'UPDATE_IS_LOGIN';
const UPDATE_IS_PENDING = 'UPDATE_IS_PENDING';
const UPDATE_IS_TYPING = 'UPDATE_IS_TYPING';
const LOGIN = 'LOGIN'
const MESSAGE = 'MESSAGE';
const TYPING = 'TYPING';
const CHAT_START = 'CHAT_START';
const CHAT_END = 'CHAT_END';
const LEAVE_ROOM = 'LEAVE_ROOM';
const LOG = 'LOG';
const FROM = 'FROM';
const TO = 'TO';

export const actionTypes = {
  ADD_CHAT,
  RESET_CHAT,
  UPDATE_IS_LOGIN,
  UPDATE_IS_PENDING,
  UPDATE_IS_TYPING
};
export const eventNames = {
  LOGIN,
  MESSAGE,
  CHAT_START,
  TYPING,
  CHAT_END,
  LEAVE_ROOM
};
export const chatTypes = {
  LOG,
  FROM,
  TO,
  TYPING
};
