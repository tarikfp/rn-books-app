import { PickedBookDocument } from '~store/search-books/search-books-slice-types';
import { filterBooks } from '../filter-books';

const sampleBooks: PickedBookDocument[] = [
  {
    key: '1',
    ratings_average: 4.5,
    ratings_count: 100,
    first_sentence: ['Once upon a time'],
    publisher_facet: ['Publisher A'],
    subject_facet: ['Fiction', 'Adventure'],
    title: 'Book 1',
    author_name: ['Author 1'],
    cover_edition_key: 'cover_1',
    first_publish_year: 2000,
  },
  {
    key: '2',
    ratings_average: 3.8,
    ratings_count: 75,
    first_sentence: ['In a galaxy far far away'],
    publisher_facet: ['Publisher B'],
    subject_facet: ['Science Fiction'],
    title: 'Book 2',
    author_name: ['Author 2'],
    cover_edition_key: 'cover_2',
    first_publish_year: 2010,
  },
];

describe('filterBooks', () => {
  it('returns all books when search text is empty', () => {
    const searchText = '';
    const result = filterBooks(sampleBooks, searchText);
    expect(result).toEqual(sampleBooks);
  });

  it('filters books based on search text', () => {
    const searchText = 'adventure';
    const result = filterBooks(sampleBooks, searchText);
    expect(result).toEqual([sampleBooks[0]]);
  });

  it('filters books based on author', () => {
    const searchText = 'author 1';
    const result = filterBooks(sampleBooks, searchText);
    expect(result).toEqual([sampleBooks[0]]);
  });

  it('filters books based on multiple keys', () => {
    const searchText = '2000';
    const result = filterBooks(sampleBooks, searchText);
    expect(result).toEqual([sampleBooks[0]]);
  });

  it('handles case-insensitive search', () => {
    const searchText = 'once upon a time';
    const result = filterBooks(sampleBooks, searchText);
    expect(result).toEqual([sampleBooks[0]]);
  });

  it('handles no matches', () => {
    const searchText = 'xyz';
    const result = filterBooks(sampleBooks, searchText);
    expect(result).toEqual([]);
  });

  it('filters based on publisher', () => {
    const searchText = 'publisher a';
    const result = filterBooks(sampleBooks, searchText);
    expect(result).toEqual([sampleBooks[0]]);
  });

  it('filters based on multiple subject facets', () => {
    const searchText = 'Adventure';
    const result = filterBooks(sampleBooks, searchText);
    expect(result).toEqual([sampleBooks[0]]);
  });

  it('handles numeric search', () => {
    const searchText = '4.5';
    const result = filterBooks(sampleBooks, searchText);
    expect(result).toEqual([sampleBooks[0]]);
  });
});
