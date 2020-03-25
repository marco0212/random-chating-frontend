import reducer, { initialState } from './status';
import { updateIsLogin, updateIsPending, updateIsTyping } from '../actions';

describe('status reducer', () => {
  it('should handle initial state', () => {
    expect(initialState).toEqual({
      isLogin: false,
      isPending: true,
      isTyping: false
    });

    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle update login', () => {
    expect(reducer(initialState, updateIsLogin(false)))
      .toEqual({ ...initialState, isLogin: false });

    expect(reducer({ ...initialState, isLogin: false }, updateIsLogin(true)))
      .toEqual({ ...initialState, isLogin: true });
  });

  it('should handle update pending', () => {
    expect(reducer(initialState, updateIsPending(false)))
      .toEqual({ ...initialState, isPending: false });

    expect(reducer({ ...initialState, isPending: false }, updateIsPending(true)))
      .toEqual({ ...initialState, isPending: true });
  });

  it('should handle update typing', () => {
    expect(reducer(initialState, updateIsTyping(false)))
      .toEqual({ ...initialState, isTyping: false });

    expect(reducer({ ...initialState, isTyping: false }, updateIsTyping(true)))
      .toEqual({ ...initialState, isTyping: true });
  });
});
