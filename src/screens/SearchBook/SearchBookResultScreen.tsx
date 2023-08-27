import { ListRenderItemInfo } from '@shopify/flash-list';
import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { InfiniteList } from '~components/InfiniteList';
import ModalLoader from '~components/ModalLoader';
import { ScreenView } from '~components/ScreenView';
import { Spacing } from '~components/Spacing';
import { AppTextInput } from '~components/TextInput';
import { ErrorService } from '~lib/error/error-utils';
import {
  NetworkError,
  NetworkErrorFeedbackMessages,
} from '~lib/error/network-errors';
import {
  ServerError,
  ServerErrorFeedbackMessages,
} from '~lib/error/server-errors';
import { RouteNames } from '~navigation/RouteNames';
import { BookStackScreenProps } from '~navigation/types';
import {
  DEFAULT_LIMIT,
  useSearchBooksPaginationQuery,
} from '~store/search-books/search-books-slice';
import { PickedBookDocument } from '~store/search-books/search-books-slice-types';
import { makeStyles } from '~theme/make-styles';
import { getWindowWidth } from '~utils/layout';
import {
  ITEM_HEIGHT,
  SearchBookResultItem,
} from './components/SearchBookResultItem';
import { filterBooks } from './helpers/filter-books';
import { getCoverImageUrl } from './helpers/get-cover-image-url';
import { useBookItemActions } from './helpers/useBookItemActions';

type Props = BookStackScreenProps<RouteNames.SearchBookResult>;

export const SearchBookResultScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const { query } = route.params;
  const styles = useStyles();
  const [searchText, setSearchText] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(1);
  const [filteredBooks, setFilteredBooks] = React.useState<
    Array<PickedBookDocument>
  >([]);
  const [isFirstItemMounted, setIsFirstItemMounted] =
    React.useState<boolean>(false);

  const shouldEnableInfiniteLoading = searchText.trim().length === 0;

  const {
    handleToggleCurrentlyReadingItem,
    handleToggleWishlistItem,
    getIsAddedToList,
    currentlyReadingBooks,
    wishlistBooks,
  } = useBookItemActions();

  const {
    isLoading,
    data: searchBookResult,
    refetch,
    isFetching,
    error,
    isError,
  } = useSearchBooksPaginationQuery({
    page,
    query,
    limit: DEFAULT_LIMIT,
  });

  if (typeof error !== 'undefined' && isError) {
    // we could also trigger to the nearest ErrorBoundary using `showBoundary` method from `useErrorBoundary` method
    // lets throw the errors manually for now

    // showBoundary(error)
    if (ErrorService.isNetworkError(error)) {
      throw new NetworkError({
        message: NetworkErrorFeedbackMessages.NETWORK_ERROR,
        name: 'NETWORK_ERROR',
        cause: error,
      });
    }

    if (ErrorService.isServerError(error)) {
      throw new ServerError({
        message: ServerErrorFeedbackMessages.SERVER_ERROR,
        name: 'SERVER_ERROR',
        cause: error,
      });
    }
  }

  React.useEffect(() => {
    if (
      typeof searchBookResult?.docs !== 'undefined' &&
      searchBookResult?.docs?.length > 0
    ) {
      const apiBooks = searchBookResult.docs;

      if (searchText.length > 0) {
        const filtered = filterBooks(apiBooks, searchText);
        setFilteredBooks(filtered);
      } else {
        setFilteredBooks(apiBooks);
      }
    }
  }, [searchBookResult?.docs, searchText]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Search results for: ${query}`,
    });
  }, [navigation, query]);

  const hasNextPage = !!searchBookResult?.hasNextPage;

  const handleOnPressItem = React.useCallback(
    // use currying to avoid usage of arrow function in renderItem, which then maintains memoization
    (bookDetail: PickedBookDocument) => () => {
      // prefetch cover image with the size of `L` for book result detail screen
      if (bookDetail.cover_edition_key) {
        FastImage.preload([
          { uri: getCoverImageUrl('L', bookDetail.cover_edition_key) },
        ]);
      }

      navigation.navigate(RouteNames.SearchResultDetail, {
        bookDetail,
      });
    },
    [navigation],
  );

  const getIsFirstItemMounted = React.useCallback((_e: LayoutChangeEvent) => {
    setIsFirstItemMounted(true);
  }, []);

  const renderItem = React.useCallback(
    ({ item, index }: ListRenderItemInfo<PickedBookDocument>) => {
      return (
        <SearchBookResultItem
          {...item}
          onLayout={index === 0 ? getIsFirstItemMounted : undefined}
          onPress={handleOnPressItem(item)}
          isAddedToCurrentlyReading={getIsAddedToList(
            item.key,
            'currentlyReading',
          )}
          isAddedToWishlist={getIsAddedToList(item.key, 'wishlist')}
          onToggleCurrentlyReading={handleToggleCurrentlyReadingItem(item.key)}
          onToggleWishlist={handleToggleWishlistItem(item.key)}
        />
      );
    },
    [
      getIsAddedToList,
      getIsFirstItemMounted,
      handleOnPressItem,
      handleToggleCurrentlyReadingItem,
      handleToggleWishlistItem,
    ],
  );

  const handleOnEndReached = () => {
    setPage((_page) => _page + 1);
  };

  return (
    <ScreenView withStatusBar disableHorizontalPadding disableVerticalPadding>
      {/**
       * @see https://docs.swmansion.com/react-native-reanimated/docs/shared-element-transitions/overview/
       *
       * CAUTION
       * Shared Element Transitions is an experimental feature, not recommended for production use yet. We are waiting for your feedback to improve implementation.
       *
       * Although Shared Element Transition from react native reanimated is not recommended for production usage yet, meaning it is not smooth yet.
       * we can make use of it for this specific task.
       *
       * We could also utilize the https://github.com/IjzerenHein/react-navigation-shared-element package,
       * however it does not support native stack navigator, therefore we did prefer reanimated's shared element transition
       *
       */}
      <Animated.View
        style={styles.textInputWrapper}
        sharedTransitionTag="search-bar"
      >
        <AppTextInput
          onChangeText={setSearchText}
          value={searchText}
          returnKeyType="search"
          startIconName="magnify"
        />
      </Animated.View>

      <Spacing marginTop="m" />

      {!!searchBookResult && Array.isArray(searchBookResult.docs) && (
        <InfiniteList<PickedBookDocument>
          extraData={
            wishlistBooks.length.toString() +
            currentlyReadingBooks.length.toString()
          }
          data={filteredBooks}
          estimatedItemSize={ITEM_HEIGHT}
          isFetching={isFetching}
          isLoading={isLoading}
          onEndReached={
            shouldEnableInfiniteLoading ? handleOnEndReached : undefined
          }
          hasNextPage={hasNextPage}
          listEmptyText="No book found..."
          trigger={refetch}
          shouldRenderFooter={
            shouldEnableInfiniteLoading &&
            searchBookResult.docs.length > 0 &&
            /**
             * specifically wait for first item to be mounted before rendering footer
             * this is effectively needed for android since footer component was being displayed
             * for a milliseconds right before all of the items are rendered in the list
             */
            isFirstItemMounted
          }
          renderItem={renderItem}
        />
      )}
      <ModalLoader isVisible={isLoading} />
    </ScreenView>
  );
};

const useStyles = makeStyles((theme) => ({
  textInputWrapper: {
    marginTop: theme.spacing.m,
    width: getWindowWidth(100) - theme.spacing.m * 2,
    alignSelf: 'center',
  },
}));
