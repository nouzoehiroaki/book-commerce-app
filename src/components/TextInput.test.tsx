// TextInput.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { expect, test } from 'vitest';

import TextInput from './TextInput';

test('TextInput Component Test', async () => {
  const user = userEvent.setup();
  render(<TextInput />);

  const inputElement = screen.getByLabelText('Text Input');
  expect(screen.getByText('Entered Text:')).toBeTruthy();

  await user.type(inputElement, 'Hello World');
  expect(screen.getByText('Entered Text: Hello World')).toBeTruthy();
});