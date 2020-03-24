import { actionTypes } from "../constants";

const {
  ADD_CHAT,
  RESET_CHAT,
  UPDATE_IS_LOGIN,
  UPDATE_IS_PENDING,
  UPDATE_IS_TYPING
} = actionTypes;

export const addChat = (chat) => ({ type: ADD_CHAT, payload: chat });
export const resetChat = () => ({ type: RESET_CHAT });
export const updateIsLogin = (bool) => ({ type: UPDATE_IS_LOGIN, payload: bool});
export const updateIsPending = (bool) => ({ type: UPDATE_IS_PENDING, payload: bool });
export const updateIsTyping = (bool) => ({ type: UPDATE_IS_TYPING, payload: bool });
