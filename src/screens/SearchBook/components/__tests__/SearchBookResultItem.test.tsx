import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { PickedBookDocument } from '~store/search-books/search-books-slice-types';
import { render } from '~utils/test-utils';
import { SearchBookResultItem } from '../SearchBookResultItem';

const mockBook: PickedBookDocument = {
  key: 'test-key',
  title: 'Sample Title',
  author_name: ['Author 1', 'Author 2'],
  first_publish_year: 2022,
  cover_edition_key: 'sample-cover-key',
};

describe('SearchBookResultItem', () => {
  it('renders basic information correctly', () => {
    const { getByText } = render(
      <SearchBookResultItem
        {...mockBook}
        onPress={() => {}}
        onToggleWishlist={() => {}}
        onToggleCurrentlyReading={() => {}}
        isAddedToWishlist={false}
        isAddedToCurrentlyReading={false}
      />,
    );

    const title = getByText('Sample Title');
    const author = getByText('Author name: Author 1');
    const publishDate = getByText('Publish date: 2022');

    expect(title).toBeTruthy();
    expect(author).toBeTruthy();
    expect(publishDate).toBeTruthy();
  });

  it('handles base button press correctly', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <SearchBookResultItem
        {...mockBook}
        onPress={onPressMock}
        onToggleWishlist={() => {}}
        onToggleCurrentlyReading={() => {}}
        isAddedToWishlist={false}
        isAddedToCurrentlyReading={false}
      />,
    );

    const baseButton = getByTestId('search-book-result-item-button');
    fireEvent.press(baseButton);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('handles wishlist button press correctly', () => {
    const onToggleWishlistMock = jest.fn();
    const { getByTestId } = render(
      <SearchBookResultItem
        {...mockBook}
        onPress={() => {}}
        onToggleWishlist={onToggleWishlistMock}
        onToggleCurrentlyReading={() => {}}
        isAddedToWishlist={false}
        isAddedToCurrentlyReading={false}
      />,
    );

    const wishlistButton = getByTestId('wishlist-button');
    fireEvent.press(wishlistButton);

    expect(onToggleWishlistMock).toHaveBeenCalledTimes(1);
  });

  it('handles currently reading button press correctly', () => {
    const onToggleCurrentlyReadingMock = jest.fn();
    const { getByTestId } = render(
      <SearchBookResultItem
        {...mockBook}
        onPress={() => {}}
        onToggleWishlist={() => {}}
        onToggleCurrentlyReading={onToggleCurrentlyReadingMock}
        isAddedToWishlist={false}
        isAddedToCurrentlyReading={false}
      />,
    );

    const currentlyReadingButton = getByTestId('currently-reading-button');
    fireEvent.press(currentlyReadingButton);

    expect(onToggleCurrentlyReadingMock).toHaveBeenCalledTimes(1);
  });

  it('render image correctly', () => {
    const { getByTestId } = render(
      <SearchBookResultItem
        {...mockBook}
        onPress={() => {}}
        onToggleWishlist={() => {}}
        onToggleCurrentlyReading={() => {}}
        isAddedToWishlist={false}
        isAddedToCurrentlyReading={false}
      />,
    );

    const image = getByTestId('search-book-result-item-image');

    expect(image).toBeTruthy();
  });

  it('sets the correct source for the image', () => {
    const { getByTestId } = render(
      <SearchBookResultItem
        {...mockBook}
        onPress={() => {}}
        onToggleWishlist={() => {}}
        onToggleCurrentlyReading={() => {}}
        isAddedToWishlist={false}
        isAddedToCurrentlyReading={false}
      />,
    );

    const image = getByTestId('search-book-result-item-image');

    const source = image.props.source;
    expect(source.uri).toBe(
      'https://covers.openlibrary.org/b/olid/sample-cover-key-L.jpg?default=false',
    );
  });
});
