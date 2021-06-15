import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SettingsForm {
  firstName: string;
  lastName: string;
  email: string;
}

export type SettingsState = SettingsForm;

const initialState: SettingsState = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'admin@mail.to',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<SettingsState>) => action.payload,
  },
});

export const { save } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;
export default settingsSlice.reducer;
