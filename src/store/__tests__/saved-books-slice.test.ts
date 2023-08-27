import savedBooksReducer, { BookState, toggle } from '../saved-books-slice';

describe('savedBooksSlice reducer', () => {
  it('should handle toggling a book in wishlist', () => {
    const initialState: BookState = {
      wishlist: [],
      currentlyReading: [],
    };

    const nextState = savedBooksReducer(
      initialState,
      toggle({ listType: 'wishlist', bookKey: 'book_1' }),
    );
    expect(nextState.wishlist).toEqual(['book_1']);

    const finalState = savedBooksReducer(
      nextState,
      toggle({ listType: 'wishlist', bookKey: 'book_1' }),
    );
    expect(finalState.wishlist).toEqual([]);
  });

  it('should handle toggling a book in currentlyReading', () => {
    const initialState: BookState = {
      wishlist: [],
      currentlyReading: [],
    };

    const nextState = savedBooksReducer(
      initialState,
      toggle({ listType: 'currentlyReading', bookKey: 'book_2' }),
    );
    expect(nextState.currentlyReading).toEqual(['book_2']);

    const finalState = savedBooksReducer(
      nextState,
      toggle({ listType: 'currentlyReading', bookKey: 'book_2' }),
    );
    expect(finalState.currentlyReading).toEqual([]);
  });
});
