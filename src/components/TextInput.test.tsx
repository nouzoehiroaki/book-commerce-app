// TextInput.test.js
import React from 'react';
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import TextInput from "./TextInput";
import { expect, test } from "vitest";

test("TextInput Component Test", async () => {
  const user = userEvent.setup();
  render(<TextInput />);

  const inputElement = screen.getByLabelText("Text Input");
  expect(screen.getByText("Entered Text:")).toBeTruthy();

  await user.type(inputElement, "Hello World");
  expect(screen.getByText("Entered Text: Hello World")).toBeTruthy();
});