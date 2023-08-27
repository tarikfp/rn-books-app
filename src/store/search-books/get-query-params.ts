export const getQueryParams = ({
  limit,
  page,
  query,
  bookDocumentKeysToPick,
}: {
  limit: number;
  page: number;
  query: string;
  bookDocumentKeysToPick: Array<string>;
}) => {
  return `?q=${encodeURIComponent(query)}&fields=${bookDocumentKeysToPick.join(
    ',',
  )}&limit=${limit}&page=${page}`;
};
