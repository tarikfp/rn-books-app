import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookState {
  wishlist: string[];
  currentlyReading: string[];
}

const initialState: BookState = {
  wishlist: [],
  currentlyReading: [],
};

const savedBooksSlice = createSlice({
  name: 'saved-books',
  initialState,
  reducers: {
    toggle: (
      state,
      action: PayloadAction<{
        listType: 'wishlist' | 'currentlyReading';
        bookKey: string;
      }>,
    ) => {
      const { listType, bookKey } = action.payload;
      const list = state[listType];
      const index = list.indexOf(bookKey);

      if (index !== -1) {
        list.splice(index, 1);
      } else {
        list.push(bookKey);
      }
    },
  },
});

export const { toggle } = savedBooksSlice.actions;

export default savedBooksSlice.reducer;
