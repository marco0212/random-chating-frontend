import { ADD_CHAT, RESET_CHAT } from "../constants";

export const addChat = (chat) => ({ type: ADD_CHAT, payload: chat });
export const resetChat = () => ({ type: RESET_CHAT });
