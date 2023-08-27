import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PickedBookDocument } from '~store/search-books/search-books-slice-types';
import { RouteNames } from './RouteNames';

export type BookStackParamList = {
  [RouteNames.SearchBook]: undefined;
  [RouteNames.SearchBookResult]: {
    query: string;
  };
  [RouteNames.SearchResultDetail]: {
    bookDetail: PickedBookDocument;
  };
};

export type BookStackScreenProps<RouteName extends keyof BookStackParamList> =
  NativeStackScreenProps<BookStackParamList, RouteName>;
