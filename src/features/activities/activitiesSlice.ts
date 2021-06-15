import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchActivity } from './activitiesAPI';

export interface Activity {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
}

export type ActivitiesState = {
  loading: boolean;
  activity: Activity | null;
};

const initialState: ActivitiesState = {
  loading: true,
  activity: null,
};

export const loadActivity = createAsyncThunk('activities/fetchActivity', async (type: string) => {
  const response = await fetchActivity(type);
  return response.data;
});

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadActivity.pending, state => {
        state.loading = true;
      })
      .addCase(loadActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.activity = action.payload;
      });
  },
});

export const selectActivity = (state: RootState) => state.activities.activity;

export const selectIsLoading = (state: RootState) => state.activities.loading;

export default activitiesSlice.reducer;
