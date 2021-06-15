import React, { FC } from 'react';
import { selectSettings } from '../settings/settingsSlice';
import { useAppSelector } from '../../app/hooks';
import { DetailsList } from '../../common/components/DetailsList';

const Profile: FC = () => {
  const settings = useAppSelector(selectSettings);
  return (
    <>
      <h1>Profile</h1>
      <DetailsList data={settings} />
    </>
  );
};

export { Profile };
