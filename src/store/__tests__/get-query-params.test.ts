import { getQueryParams } from '~store/search-books/get-query-params';

describe('getQueryParams function', () => {
  it('should generate correct query params string', () => {
    const queryParams = getQueryParams({
      limit: 10,
      page: 1,
      query: 'fantasy',
      bookDocumentKeysToPick: ['title', 'author_name', 'first_publish_year'],
    });

    expect(queryParams).toBe(
      '?q=fantasy&fields=title,author_name,first_publish_year&limit=10&page=1',
    );
  });

  it('should handle empty bookDocumentKeysToPick array', () => {
    const queryParams = getQueryParams({
      limit: 20,
      page: 2,
      query: 'science fiction',
      bookDocumentKeysToPick: [],
    });

    expect(queryParams).toBe('?q=science%20fiction&fields=&limit=20&page=2');
  });

  it('should encode query parameter properly', () => {
    const queryParams = getQueryParams({
      limit: 5,
      page: 3,
      query: 'action adventure',
      bookDocumentKeysToPick: ['title'],
    });

    expect(queryParams).toBe(
      '?q=action%20adventure&fields=title&limit=5&page=3',
    );
  });
});
