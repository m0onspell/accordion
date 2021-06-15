import React from 'react';
import renderer from 'react-test-renderer';
import { Loader } from './Loader';

const setup = () => renderer.create(<Loader />).toJSON();

test('renders correctly', () => {
  expect(setup()).toMatchSnapshot();
});