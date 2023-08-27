import React from 'react';
import { useAppDispatch, useAppSelector } from '~store/hooks';
import { toggle } from '~store/saved-books-slice';

export const useBookItemActions = () => {
  const wishlistBooks = useAppSelector((state) => state.savedBooks.wishlist);
  const currentlyReadingBooks = useAppSelector(
    (state) => state.savedBooks.currentlyReading,
  );

  const dispatch = useAppDispatch();

  const handleToggleWishlistItem = React.useCallback(
    // use currying to avoid usage of arrow function in renderItem, which then maintains memoization
    (bookKey: string) => () => {
      dispatch(toggle({ bookKey, listType: 'wishlist' }));
    },
    [dispatch],
  );

  const handleToggleCurrentlyReadingItem = React.useCallback(
    // use currying to avoid usage of arrow function in renderItem, which then maintains memoization
    (bookKey: string) => () => {
      dispatch(toggle({ bookKey, listType: 'currentlyReading' }));
    },
    [dispatch],
  );

  const getIsAddedToList = React.useCallback(
    (bookKey: string, listType: 'wishlist' | 'currentlyReading') => {
      return listType === 'currentlyReading'
        ? currentlyReadingBooks.includes(bookKey)
        : wishlistBooks.includes(bookKey);
    },
    [currentlyReadingBooks, wishlistBooks],
  );

  return {
    handleToggleCurrentlyReadingItem,
    handleToggleWishlistItem,
    getIsAddedToList,
    currentlyReadingBooks,
    wishlistBooks,
  };
};
