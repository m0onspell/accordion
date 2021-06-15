import activitiesReducer, {
  ActivitiesState,
  Activity,
  loadActivity,
  selectActivity,
  selectIsLoading,
} from './activitiesSlice';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../../app/store';

const mockAxios = new MockAdapter(axios);
const mockStore = configureStore<RootState, AppDispatch>(getDefaultMiddleware());

const makeActivity = (props: Partial<Activity> = {}): Activity => ({
  activity: 'baking',
  type: 'cooking',
  participants: 1,
  price: 200,
  link: 'com',
  key: 'test',
  ...props,
});

const initialState: ActivitiesState = {
  loading: true,
  activity: null,
};

afterEach(mockAxios.reset);

describe('activities reducer', () => {
  test('handle initial state', () => {
    expect(activitiesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('handle loading', () => {
    const actual = activitiesReducer(initialState, { type: loadActivity.pending });
    expect(actual.loading).toEqual(true);
  });

  test('handle loaded activity', () => {
    const activity = makeActivity();
    const actual = activitiesReducer(initialState, {
      type: loadActivity.fulfilled,
      payload: activity,
    });
    expect(actual.activity).toEqual(activity);
    expect(actual.loading).toEqual(false);
  });
});

describe('activities thunks', () => {
  test('loadActivity thunk', async () => {
    const type = 'recreational';
    const activity = makeActivity();

    mockAxios.onGet(`https://www.boredapi.com/api/activity?type=${type}`).reply(200, activity);

    const store = mockStore();
    await store.dispatch(loadActivity('recreational'));

    const actual = store.getActions();

    expect(actual).toMatchObject([
      {
        type: 'activities/fetchActivity/pending',
      },
      {
        type: 'activities/fetchActivity/fulfilled',
        payload: activity,
      },
    ]);
  });
});

describe('activities selectors', () => {
  const state = {
    activities: {
      loading: false,
      activity: null,
    },
  } as RootState;
  test('selectActivity', () => {
    expect(selectActivity(state)).toEqual(null);
  });
  test('selectIsLoading', () => {
    expect(selectIsLoading(state)).toEqual(false);
  });
});
