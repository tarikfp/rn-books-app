import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserSettingsState {
  isDarkTheme: boolean;
}

const initialState: UserSettingsState = {
  isDarkTheme: false,
};

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    setIsDarkTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkTheme = action.payload;
    },
  },
});

export const { toggleTheme, setIsDarkTheme } = userSettingsSlice.actions;

export default userSettingsSlice.reducer;
