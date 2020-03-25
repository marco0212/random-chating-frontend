import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Header from './Header';

describe('<Header />', () => {
  it('should have Button element depends on isPending props', () => {
    const { queryByText, rerender } = render(
      <Header isPending={true} />
    );

    expect(queryByText('next')).toBeNull();

    rerender(<Header isPending={false} />);
    expect(queryByText('next')).toBeTruthy();
  });

  it('should call event handler when button is clicked', () => {
    let count = 0;
    const clickHandler = () => (count) += 1;
    const { queryByText } = render(
      <Header isPending={false} onButtonClick={clickHandler} />
    );
    const button = queryByText('next');

    expect(count).toBe(0);
    fireEvent.click(button);
    expect(count).toBe(1);
  });
});
