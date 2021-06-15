import React from 'react';
import logo from './logo.svg';
import { Settings } from './features/settings';
import { Profile } from './features/profile';
import { Activities } from './features/activities';
import styles from './App.module.css';
import { Switch, Link, Route } from 'react-router-dom';

import { AccordionMenu, MenuItemProps } from './common/components/AccordionMenu';

const navItems: MenuItemProps[] = [
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
];

function App() {
  return (
    <div className={styles.appContainer}>
      <header className={styles.appHeader}>
        <Link to="/" className={styles.appLink}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <h1>Accordion App</h1>
        </Link>
      </header>

      <AccordionMenu className={styles.sideBar} items={navItems} />

      <main className={styles.main}>
        <Switch>
          <Route path="/account/settings" component={Settings} />
          <Route path="/account/profile" component={Profile} />
          <Route path="/activities/:type" component={Activities} />
          <Route path="/">
            <h1 className={styles.greetings}>Hello!</h1>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
