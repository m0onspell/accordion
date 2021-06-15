import React, { useState, FC, PropsWithChildren } from 'react';
import styles from './GroupMenuItem.module.css';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

type GroupMenuItemProps = PropsWithChildren<{
  label: string;
  isActive: boolean;
}>;

const GroupMenuItem: FC<GroupMenuItemProps> = ({ isActive, label, children }) => {
  const [isOpen, setIsOpen] = useState(isActive);
  return (
    <li className={classNames(styles.item, { [styles.activeSection]: isOpen })}>
      <div
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={styles.sectionTitle}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
      >
        {label} <FontAwesomeIcon className={styles.icon} icon={isOpen ? faAngleUp : faAngleDown} />
      </div>
      <ul aria-label={`${label} submenu`} aria-hidden={!isOpen} className={styles.subItems}>
        {children}
      </ul>
    </li>
  );
};

export { GroupMenuItem };
