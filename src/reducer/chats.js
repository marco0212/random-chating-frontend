import { actionTypes } from "../constants";

const { ADD_CHAT, RESET_CHAT } = actionTypes;
const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CHAT:
      return [ ...state, action.payload ];

    case RESET_CHAT:
      return [];

    default:
      return state;
  }
}
