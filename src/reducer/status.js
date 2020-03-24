import { actionTypes } from "../constants";

const {
  UPDATE_IS_LOGIN,
  UPDATE_IS_PENDING,
  UPDATE_IS_TYPING
} = actionTypes;

const initialState = {
  isLogin: false,
  isPending: true,
  isTyping: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload
      };

    case UPDATE_IS_PENDING:
      return {
        ...state,
        isPending: action.payload
      };

    case UPDATE_IS_TYPING:
      return {
        ...state,
        isTyping: action.payload
      };

    default:
      return state;
  }
}
