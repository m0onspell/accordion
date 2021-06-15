import React, { FC, memo } from 'react';
import styles from './AccordionMenu.module.css';
import { useLocation } from 'react-router-dom';
import { GroupMenuItem } from './GroupMenuItem';
import { MenuItem } from './MenuItem';

export type MenuItemProps = {
  label: string;
  href: string;
  items?: MenuItemProps[];
};

export interface AccordionMenuProps {
  className?: string;
  items: MenuItemProps[];
}

const mapItems = (items: MenuItemProps[], currentPathname: string, basePath: string = '') =>
  items.map(({ label, href, items }) => {
    const fullPath = `${basePath}${href}`;
    const isActive = currentPathname.startsWith(fullPath);
    return items ? (
      <GroupMenuItem isActive={isActive} label={label} key={fullPath}>
        {mapItems(items, currentPathname, fullPath)}
      </GroupMenuItem>
    ) : (
      <MenuItem label={label} href={fullPath} isActive={isActive} key={fullPath} />
    );
  });

const AccordionMenu: FC<AccordionMenuProps> = memo(({ className, items }) => {
  const { pathname } = useLocation();
  return (
    <nav className={className}>
      <ul className={styles.container}>{mapItems(items, pathname)}</ul>
    </nav>
  );
});

export { AccordionMenu };
