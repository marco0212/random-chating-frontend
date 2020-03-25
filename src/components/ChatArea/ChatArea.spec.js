import { render } from '@testing-library/react';
import React from 'react';
import ChatArea from './ChatArea';
import { initialState } from '../../reducer/status';

describe('<ChatArea />', () => {
  const { isPending, isTyping } = initialState;

  it('should have message that user send depends on props', () => {
    const { container, rerender, queryAllByText } = render(<ChatArea />);
    const messages = container.querySelectorAll('li');

    expect(messages.length).toBe(0);

    const chatItem = { type: 'TO', message: 'Hello world' };
    const chats = Array(3).fill(chatItem);

    rerender(<ChatArea chats={chats}/>);
    expect(queryAllByText('Hello world').length).toBe(3);
  });

  it('should have log messages depends on props', () => {
    const { queryByText, rerender } = render(
      <ChatArea
        isPending={isPending}
        isTyping={isTyping}
      />
    );

    expect(queryByText('Looking for peer')).toBeTruthy();
    expect(queryByText('Typing...')).toBeNull();

    rerender(
      <ChatArea
        isPending={!isPending}
      />
    );
    expect(queryByText('Looking for peer')).toBeNull();
    
    rerender(
      <ChatArea
        isTyping={!isTyping}
      />
    );
    expect(queryByText('Typing...')).toBeTruthy();
  });
});
