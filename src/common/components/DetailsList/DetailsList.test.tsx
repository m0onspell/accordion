import React from 'react';
import renderer from 'react-test-renderer';
import { DetailsList, DetailsListProps } from './DetailsList';

const makeProps = (props: Partial<DetailsListProps> = {}): DetailsListProps => ({
  data: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@mail.to',
  },
  ...props,
});

const setup = (props?: Partial<DetailsListProps>) =>
  renderer.create(<DetailsList {...makeProps(props)} />).toJSON();

test('renders correctly', () => {
  expect(setup()).toMatchSnapshot();
});

test('renders subset of fields', () => {
  expect(setup({ renderFields: ['email', 'lastName'] })).toMatchSnapshot();
});
