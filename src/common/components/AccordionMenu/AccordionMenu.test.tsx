import React from 'react';
import renderer from 'react-test-renderer';
import { AccordionMenu } from './AccordionMenu';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccordionMenuProps } from './AccordionMenu';
import * as H from 'history';

const makeProps = (props: Partial<AccordionMenuProps> = {}): AccordionMenuProps => ({
  items: [
    {
      label: 'Activities',
      href: '/activities',
      items: [
        { label: 'Recreational', href: '/recreational' },
        {
          label: 'Cooking',
          href: '/cooking',
        },
      ],
    },
    {
      label: 'Account',
      href: '/account',
      items: [
        { label: 'Profile', href: '/profile' },
        { label: 'Settings', href: '/settings' },
      ],
    },
  ],
  className: 'testClass',
  ...props,
});

const setup = ({
  props,
  initialEntries,
}: { props?: Partial<AccordionMenuProps>; initialEntries?: H.LocationDescriptor[] } = {}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <AccordionMenu {...makeProps(props)} />
  </MemoryRouter>
);

test('renders correctly', () => {
  const tree = renderer.create(setup({ initialEntries: ['/activities/cooking'] })).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders with current route menu link active', () => {
  render(setup({ initialEntries: ['/account/profile'] }));
  expect(screen.getByText(/Account/).parentElement).toHaveClass('activeSection');
  expect(screen.getByText(/Profile/)).toHaveClass('activeLink');
});

test('click on a section title toggles item visibility while keeping previous section state', () => {
  render(setup({ initialEntries: ['/account/profile'] }));
  const activities = screen.getByText(/Activities/);
  const account = screen.getByText(/Account/);

  expect(account.parentElement).toHaveClass('activeSection');

  userEvent.click(activities);

  expect(account.parentElement).toHaveClass('activeSection');
  expect(activities.parentElement).toHaveClass('activeSection');

  userEvent.click(activities);

  expect(account.parentElement).toHaveClass('activeSection');
  expect(activities.parentElement).not.toHaveClass('activeSection');
});
