import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import ChatForm from './ChatForm';

describe('<ChatForm />', () => {
  const eventObj = {};
  const someString = 'Hello world?';

  it('should has require elements (text input, button)', () => {
    const { container, getByText } = render(<ChatForm/>);

    expect(container.querySelector('input[type="text"]')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('should changes value depends on value prop', () => {
    const sampleFunction = () => {};
    const { getByDisplayValue, rerender } = render(
      <ChatForm InputValue={''} onChangeHandler={sampleFunction}/>
    );

    expect(getByDisplayValue('')).toBeTruthy();
    rerender(<ChatForm InputValue={someString}/>);
    expect(getByDisplayValue(someString)).toBeTruthy();
  });

  it('should calls event handler when event is fired', () => {
    const sampleFunction = (e) => {
      e.preventDefault();
      eventObj.isSubmit = true;
    };
    const { getByText } = render(<ChatForm onSubmitHandler={sampleFunction}/>);
    const submitButton = getByText('Submit');

    expect(eventObj.isSubmit).toBeUndefined();
    fireEvent.click(submitButton);
    expect(eventObj.isSubmit).toBeTruthy();
  });
});