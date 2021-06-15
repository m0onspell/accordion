import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { MemoryRouter, Route } from 'react-router-dom';
import { Activities } from './Activities';
import MockAdapter from 'axios-mock-adapter';
import * as H from 'history';
import axios from 'axios';
import { Provider } from 'react-redux';
import { makeStore } from '../../app/store';
import { Activity } from './activitiesSlice';

const mockAxios = new MockAdapter(axios);

const makeActivity = (props: Partial<Activity> = {}): Activity => ({
  activity: 'baking',
  type: 'cooking',
  participants: 1,
  price: 200,
  link: 'com',
  key: 'test',
  ...props,
});

const setup = ({
  initialEntries = ['/activities/cooking'],
}: { initialEntries?: H.LocationDescriptor[] } = {}) => (
  <Provider store={makeStore()}>
    <MemoryRouter initialEntries={initialEntries}>
      <Route path="/activities/:type">
        <Activities />
      </Route>
    </MemoryRouter>
  </Provider>
);

afterEach(mockAxios.reset);

test('renders correctly', async () => {
  const activity = makeActivity();

  mockAxios.onGet(`https://www.boredapi.com/api/activity?type=cooking`).reply(200, activity);

  let tree;
  await act(async () => {
    tree = renderer.create(setup());
  });
  // @ts-ignore
  expect(tree.toJSON()).toMatchSnapshot();
});

test('renders loading state', () => {
  const activity = makeActivity();

  mockAxios.onGet(`https://www.boredapi.com/api/activity?type=cooking`).reply(201, activity);

  const tree = renderer.create(setup());
  expect(tree.toJSON()).toMatchSnapshot();
});
