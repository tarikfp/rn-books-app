// https://openlibrary.org/dev/docs/api/covers
export function getCoverImageUrl(
  size: 'S' | 'M' | 'L',
  cover_edition_key: string,
) {
  return `https://covers.openlibrary.org/b/olid/${cover_edition_key}-${size}.jpg?default=false`;
}
