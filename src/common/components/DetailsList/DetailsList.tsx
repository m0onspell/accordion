import React, { FC, memo } from 'react';
import styles from './DetailsList.module.css';
import startCase from 'lodash.startcase';

export interface DetailsListProps {
  data: Record<string, any>;
  renderFields?: string[];
}

const isNotLastItem = (index: number, fields: string[]) => index !== fields.length - 1;

const DetailsList: FC<DetailsListProps> = memo(({ data, renderFields = [] }) => {
  const fields = renderFields.length ? renderFields : Object.keys(data);
  return (
    <div className={styles.container}>
      {fields.map((field, index) => (
        <React.Fragment key={field}>
          <div className={styles.detailGroup}>
            <div>{startCase(field)}</div>
            <div>{data[field]}</div>
          </div>
          {isNotLastItem(index, fields) && <hr />}
        </React.Fragment>
      ))}
    </div>
  );
});

export { DetailsList };
