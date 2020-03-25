import { render } from '@testing-library/react';
import React from 'react';
import Message from './Message';

describe('<Message />', () => {
  const someString = 'Hello World?';

  it('should include text passed by prop', () => {
    const { getByText } = render(<Message text={someString}/>);

    expect(getByText(someString)).toBeTruthy();
  });
});
