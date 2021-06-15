import React from 'react';
import renderer from 'react-test-renderer';
import { Settings } from './Settings';
import { Provider } from 'react-redux';
import { makeStore } from '../../app/store';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { selectSettings } from './settingsSlice';

const setup = (store = makeStore()) => (
  <Provider store={store}>
    <Settings />
  </Provider>
);

test('renders correctly', async () => {
  const tree = renderer.create(setup());
  expect(tree.toJSON()).toMatchSnapshot();
});

test('saves changed settings to the store', async () => {
  const store = makeStore();

  render(setup(store));

  const firstName = screen.getByLabelText(/First Name/i);
  const lastName = screen.getByLabelText(/Last Name/i);
  const email = screen.getByLabelText(/Email/i);
  const submit = screen.getByRole('button', { name: /submit/i });

  userEvent.clear(firstName);
  userEvent.type(firstName, 'Ben');

  userEvent.clear(lastName);
  userEvent.type(lastName, 'Dukes');

  userEvent.clear(email);
  userEvent.type(email, 'newmail@to.com');

  userEvent.click(submit);

  await waitFor(() =>
    expect(selectSettings(store.getState())).toEqual({
      email: 'newmail@to.com',
      firstName: 'Ben',
      lastName: 'Dukes',
    }),
  );
});

test('adds required error', () => {
  render(setup());

  const inputs = [
    screen.getByLabelText(/First Name/i),
    screen.getByLabelText(/Last Name/i),
    screen.getByLabelText(/Email/i),
  ];
  const submit = screen.getByRole('button', { name: /submit/i });

  inputs.forEach(async input => {
    userEvent.clear(input);
    userEvent.click(submit);
    await waitFor(() =>
      // @ts-ignore
      expect(input.parentElement.querySelector('.errorMessage')).toHaveTextContent('Required!'),
    );
  });
});

test('adds email error', async () => {
  render(setup());

  const email = screen.getByLabelText(/Email/i);
  const submit = screen.getByRole('button', { name: /submit/i });

  userEvent.clear(email);
  userEvent.type(email, '123');
  userEvent.click(submit);

  await waitFor(() =>
    // @ts-ignore
    expect(email.parentElement.querySelector('.errorMessage')).toHaveTextContent('Invalid email'),
  );
});
