import { configureStore } from '@reduxjs/toolkit';
import settingsSlice from '../features/settings/settingsSlice';
import activitiesSlice from '../features/activities/activitiesSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      settings: settingsSlice,
      activities: activitiesSlice,
    },
  });

export const store = makeStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type Store = typeof store;
