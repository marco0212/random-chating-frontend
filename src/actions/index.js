import { actionTypes } from "../constants";

const { ADD_CHAT, RESET_CHAT } = actionTypes;

export const addChat = (chat) => ({ type: ADD_CHAT, payload: chat });
export const resetChat = () => ({ type: RESET_CHAT });
