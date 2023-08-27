export interface SearchResult {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: PickedBookDocument[];
  num_found: number;
  q: string;
  offset: any;
}

// https://github.com/internetarchive/openlibrary/blob/master/conf/solr/conf/managed-schema#L136-L216
export interface BookDocument {
  key: string;
  type: string;
  redirects?: string[];
  has_fulltext?: boolean;
  title: string;
  title_suggest: string;
  title_sort: string;
  subtitle: string;
  alternative_title?: string[];
  alternative_subtitle?: string[];
  edition_count: number;
  edition_key?: string[];
  cover_edition_key?: string;
  by_statement?: string[];
  publish_date?: string[];
  publish_year?: number[];
  first_publish_year: number;
  first_edition?: string;
  first_publisher?: string;
  language?: string[];
  number_of_pages_median?: number;
  lccn?: string[];
  ia?: string[];
  ia_box_id?: string[];
  ia_loaded_id?: string[];
  ia_count?: number;
  ia_collection?: string[];
  oclc?: string[];
  isbn?: string[];
  ebook_access: 'ebookAccessLevel';
  lcc?: string[];
  lcc_sort: string;
  ddc?: string[];
  ddc_sort: string;
  contributor?: string[];
  publish_place?: string[];
  publisher?: string[];
  publisher_facet?: string[];
  first_sentence?: string[];
  author_key?: string[];
  author_name?: string[];
  author_alternative_name?: string[];
  author_facet?: string[];
  subject?: string[];
  subject_facet?: string[];
  subject_key?: string[];
  place?: string[];
  place_facet?: string[];
  place_key?: string[];
  person?: string[];
  person_facet?: string[];
  person_key?: string[];
  time?: string[];
  time_facet?: string[];
  time_key?: string[];
  ratings_average?: number;
  ratings_sortable?: number;
  ratings_count?: number;
  ratings_count_1?: number;
  ratings_count_2?: number;
  ratings_count_3?: number;
  ratings_count_4?: number;
  ratings_count_5?: number;
  readinglog_count?: number;
  want_to_read_count?: number;
  currently_reading_count?: number;
  already_read_count?: number;
  text?: string[];
  seed?: string[];
}

type PickedKeys =
  | 'key'
  | 'ratings_average'
  | 'ratings_count'
  | 'first_sentence'
  | 'publisher_facet'
  | 'subject_facet'
  | 'title'
  | 'author_name'
  | 'cover_edition_key'
  | 'first_publish_year';

export const bookDocumentKeysToPick: Array<PickedKeys> = [
  'key',
  'ratings_average',
  'ratings_count',
  'first_sentence',
  'publisher_facet',
  'subject_facet',
  'title',
  'author_name',
  'cover_edition_key',
  'first_publish_year',
];

export type PickedBookDocument = Pick<BookDocument, PickedKeys>;
