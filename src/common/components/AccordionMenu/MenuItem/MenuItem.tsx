import React, { FC } from 'react';
import styles from './MenuItem.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  label: string;
  href: string;
  isActive: boolean;
}

const MenuItem: FC<MenuItemProps> = ({ label, isActive, href }) => (
  <li className={styles.item}>
    <Link className={classNames(styles.menuLink, { [styles.activeLink]: isActive })} to={href}>
      {label}
    </Link>
  </li>
);

export { MenuItem };
