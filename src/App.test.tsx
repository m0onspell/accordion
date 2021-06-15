import React from 'react';
import { Provider } from 'react-redux';
import { makeStore, Store } from './app/store';
import App from './App';
import { MemoryRouter } from 'react-router';
import * as H from 'history';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

jest.mock('./features/settings/Settings');
jest.mock('./features/profile/Profile');
jest.mock('./features/activities/Activities');
jest.mock('./common/components/AccordionMenu/AccordionMenu');

const setup = ({
  initialEntries,
  store = makeStore(),
}: { initialEntries?: H.LocationDescriptor[]; store?: Store } = {}) => (
  <Provider store={store}>
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  </Provider>
);

test('renders correctly', () => {
  const tree = renderer.create(setup({ initialEntries: ['/'] }));
  expect(tree.toJSON()).toMatchSnapshot();
});

test.each`
  initialEntries             | page
  ${['/account/settings']}   | ${'Settings'}
  ${['/account/profile']}    | ${'Profile'}
  ${['/activities/cooking']} | ${'Activities'}
  ${['/']}                   | ${'Hello!'}
`('renders $page', ({ initialEntries, page }) => {
  render(setup({ initialEntries }));
  expect(screen.getByText(page)).toBeInTheDocument();
});
