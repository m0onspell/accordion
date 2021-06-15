import React, { FC, useEffect } from 'react';
import { Activity, selectActivity, selectIsLoading, loadActivity } from './activitiesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DetailsList } from '../../common/components/DetailsList';
import { Loader } from '../../common/components/Loader';
import { useParams } from 'react-router-dom';

interface RouteParams {
  type: string;
}

const Activities: FC = () => {
  const activity = useAppSelector(selectActivity);
  const loading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const { type } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(loadActivity(type));
  }, [dispatch, type]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1>Activities</h1>
      <DetailsList
        data={activity as Activity}
        renderFields={['activity', 'type', 'participants']}
      />
    </>
  );
};

export { Activities };
