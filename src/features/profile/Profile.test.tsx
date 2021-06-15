import React from 'react';
import renderer from 'react-test-renderer';
import { Profile } from './Profile';
import { Provider } from 'react-redux';
import { makeStore } from '../../app/store';

const setup = () => (
  <Provider store={makeStore()}>
    <Profile />
  </Provider>
);

test('renders correctly', async () => {
  const tree = renderer.create(setup());
  expect(tree.toJSON()).toMatchSnapshot();
});
