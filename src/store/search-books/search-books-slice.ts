import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getQueryParams } from './get-query-params';
import {
  SearchResult,
  bookDocumentKeysToPick,
} from './search-books-slice-types';

const BASE_URL = 'https://openlibrary.org/';

export const DEFAULT_LIMIT = 10;

/**
 * @property {number} page - The "page" property is a number that represents the page number of the
 * query results. It is used to paginate through the results, allowing the user to view different pages
 * of the query results.
 * @property {string} query - The `query` property is a string that represents the search query or
 * keyword that will be used to filter the results.
 * @property {number} limit - The `limit` property is an optional number that specifies the maximum
 * number of results to be returned per page. If not provided, a default limit may be used.
 */
type QueryArgs = {
  page: number;
  query: string;
  limit: number;
};

type InfiniteSearchResult = {
  hasNextPage: boolean;
} & SearchResult;

export const searchBooksApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + 'search.json' }),
  endpoints: (builder) => ({
    searchBooksPagination: builder.query<
      InfiniteSearchResult,
      QueryArgs | void
    >({
      query: ({ query, page, limit = DEFAULT_LIMIT }: QueryArgs) =>
        getQueryParams({
          query,
          page,
          limit,
          bookDocumentKeysToPick,
        }),

      transformResponse: (response: SearchResult, _, queryArgs) => {
        const { docs, numFound } = response;
        const { page, limit } = queryArgs as QueryArgs;
        const hasNextPage = docs.length + (page - 1) * limit < numFound;
        return { ...response, hasNextPage };
      },

      serializeQueryArgs: ({ queryArgs: _queryArgs }) => {
        const { query, limit } = _queryArgs as QueryArgs;

        // exclude `page` from cache key
        return {
          limit,
          query,
        };
      },

      merge: (currentCache, newItems) => {
        currentCache.docs.push(...newItems.docs);
      },

      // lets not cache anything since its a search api
      keepUnusedDataFor: 0,

      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
  }),
});

export const { useSearchBooksPaginationQuery } = searchBooksApi;
