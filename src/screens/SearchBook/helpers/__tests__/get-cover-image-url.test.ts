import { getCoverImageUrl } from '../get-cover-image-url';

describe('getCoverImageUrl', () => {
  it('returns the correct URL for size S', () => {
    const coverUrl = getCoverImageUrl('S', 'cover_1');
    expect(coverUrl).toBe(
      'https://covers.openlibrary.org/b/olid/cover_1-S.jpg?default=false',
    );
  });

  it('returns the correct URL for size M', () => {
    const coverUrl = getCoverImageUrl('M', 'cover_2');
    expect(coverUrl).toBe(
      'https://covers.openlibrary.org/b/olid/cover_2-M.jpg?default=false',
    );
  });

  it('returns the correct URL for size L', () => {
    const coverUrl = getCoverImageUrl('L', 'cover_3');
    expect(coverUrl).toBe(
      'https://covers.openlibrary.org/b/olid/cover_3-L.jpg?default=false',
    );
  });
});
