import reducer, { initialState } from './chats';
import { addChat, resetChat } from '../actions';

describe('chats reducer', () => {
  const message1 = 'Hello Jeong?';
  const message2 = 'Hi, How are you?';

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle add chat', () => {
    const prevState = reducer(initialState, addChat(message1));
    const currentState = reducer(prevState, addChat(message2));

    expect(currentState).toEqual([...initialState, message1, message2]);
  });

  it('should handle reset chat', () => {
    const state = [message1, message2];

    expect(reducer(state, { type: undefined })).toEqual([message1, message2]);
    expect(reducer(state, resetChat())).toEqual([]);
  });
});
