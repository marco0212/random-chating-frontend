import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  const eventObj = {};
  const someString = 'Hello world?';

  it('should has require elements (text input, button)', () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm/>);

    expect(getByPlaceholderText('Type your nickname')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('should changes value depends on value prop', () => {
    const sampleFunction = () => {};
    const { getByDisplayValue, rerender } = render(
      <LoginForm InputValue={''} onChangeHandler={sampleFunction}/>
    );

    expect(getByDisplayValue('')).toBeTruthy();
    rerender(<LoginForm InputValue={someString}/>);
    expect(getByDisplayValue(someString)).toBeTruthy();
  });

  it('should calls event handler when event is fired', () => {
    const sampleFunction = (e) => {
      e.preventDefault();
      eventObj.isSubmit = true;
    };
    const { getByText } = render(<LoginForm onSubmitHandler={sampleFunction}/>);
    const submitButton = getByText('Submit');

    expect(eventObj.isSubmit).toBeUndefined();
    fireEvent.click(submitButton);
    expect(eventObj.isSubmit).toBeTruthy();
  });
});
