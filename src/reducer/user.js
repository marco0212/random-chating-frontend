import { CREATE_USER } from "../constants";

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      const username = action.payload;
      
      return {
        username
      };

    default:
      return state;
  }
}
