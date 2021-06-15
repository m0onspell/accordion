import settingsReducer, {
  SettingsForm,
  SettingsState,
  save,
  selectSettings,
} from './settingsSlice';
import { RootState } from '../../app/store';

const initialState: SettingsState = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'admin@mail.to',
};

describe('settings reducer', () => {
  test('handle initial state', () => {
    expect(settingsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('handle save', () => {
    const settingsForm: SettingsForm = {
      firstName: 'Ben',
      lastName: 'Jones',
      email: 'new@mail.to',
    };
    const actual = settingsReducer(initialState, save(settingsForm));
    expect(actual).toEqual(settingsForm);
  });
});

describe('settings selectors', () => {
  const state = {
    settings: initialState,
  };
  test('selectSettings', () => {
    expect(selectSettings(state as RootState)).toEqual(initialState);
  });
});
