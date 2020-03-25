import { combineReducers } from 'redux';
import chats from './chats';
import status from './status';

export default combineReducers({
  chats,
  status
});
