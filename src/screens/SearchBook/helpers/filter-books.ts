import {
  PickedBookDocument,
  bookDocumentKeysToPick,
} from '~store/search-books/search-books-slice-types';

/**
 * The `filterBooks` function filters an array of book documents based on a search text.
 * @param {PickedBookDocument[]} books - An array of objects representing books. Each book object
 * should have properties such as title, author, genre, etc.
 * @param {string} searchText - The `searchText` parameter is a string that represents the text that
 * you want to search for in the books.
 * @returns an array of PickedBookDocument objects that match the search criteria.
 */
export function filterBooks(
  books: PickedBookDocument[],
  searchText: string,
): PickedBookDocument[] {
  // No search text, return all books
  if (!searchText.trim()) {
    return books;
  }

  const normalizedSearchText = searchText.trim().toLowerCase();

  return books.filter((book) => {
    // Check each key for a match
    return bookDocumentKeysToPick.some((bookKey) => {
      const bookValue = (book as any)[bookKey];

      if (bookValue === undefined || bookValue === null) {
        return false;
      }

      if (Array.isArray(bookValue)) {
        return bookValue.some((entry) =>
          entry.trim().toLowerCase().includes(normalizedSearchText),
        );
      } else if (typeof bookValue === 'string') {
        return bookValue.trim().toLowerCase().includes(normalizedSearchText);
      } else if (typeof bookValue === 'number') {
        return bookValue
          .toString()
          .trim()
          .toLowerCase()
          .includes(normalizedSearchText);
      } else {
        return false;
      }
    });
  });
}
