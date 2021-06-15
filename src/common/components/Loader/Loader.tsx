import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.container}>
    <FontAwesomeIcon className="fa-spin fa-10x" icon={faSpinner} />
  </div>
);

export { Loader };
