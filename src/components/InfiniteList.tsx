import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Box } from '~components/Box';
import { AppText } from '~components/Text';
import { useAppTheme } from '~theme/core';
import { makeStyles } from '~theme/make-styles';
import { getWindowWidth } from '~utils/layout';
import { ListLoadMoreButton } from './ListLoadMoreButton';

interface Props<T> extends React.ComponentProps<typeof FlashList<T>> {
  isLoading: boolean;
  isFetching: boolean;
  hasNextPage: boolean;
  listEmptyText: string;
  shouldRenderFooter?: boolean;
  trigger: () => void;
}

const InfiniteListInner = <T extends { key: string }>(
  {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    listEmptyText,
    shouldRenderFooter = true,
    trigger,
    ...flashListProps
  }: Props<T>,
  ref: React.ForwardedRef<FlashList<T>>,
) => {
  const styles = useStyles();
  const { colors } = useAppTheme();

  const isListEmpty = !isLoading && !isFetching && data?.length === 0;

  const renderFooter = React.useCallback(() => {
    if (!hasNextPage || isListEmpty) {
      return <></>;
    }

    if (isFetching && !isLoading) {
      return (
        <Box justifyContent={'center'} alignItems="center" width="100%">
          <ActivityIndicator color={colors.primary} size="large" />
        </Box>
      );
    }

    if (hasNextPage) {
      return (
        <Box justifyContent={'center'} alignItems="center" width="100%">
          <ListLoadMoreButton testID="load-more-button" onPress={trigger} />
        </Box>
      );
    }

    return <></>;
  }, [
    colors.primary,
    hasNextPage,
    isListEmpty,
    isFetching,
    isLoading,
    trigger,
  ]);

  const getKeyExtractor = (item: T) => {
    return item.key;
  };

  const renderItemSeparator = React.useCallback(() => {
    return <Box borderBottomWidth={1} borderColor="border" />;
  }, []);

  const renderListEmptyComponent = () => {
    return (
      <AppText variant={'subtitle'} textAlign={'center'} color="bodyText">
        {listEmptyText}
      </AppText>
    );
  };

  return (
    <Box flex={1} width={getWindowWidth(100)}>
      <FlashList<T>
        ref={ref}
        data={data}
        showsVerticalScrollIndicator
        ListFooterComponent={shouldRenderFooter ? renderFooter : undefined}
        ListEmptyComponent={renderListEmptyComponent}
        ItemSeparatorComponent={renderItemSeparator}
        onEndReachedThreshold={0.5}
        keyExtractor={getKeyExtractor}
        contentContainerStyle={styles.contentContainer}
        {...flashListProps}
      />
    </Box>
  );
};

// https://fettblog.eu/typescript-react-generic-forward-refs/#option-1%3A-type-assertion
// small hack in order to be able to use generic component with typed forward ref
export const InfiniteList = React.forwardRef(InfiniteListInner) as <T>(
  props: Props<T> & { ref?: React.ForwardedRef<FlashList<T>> },
) => ReturnType<typeof InfiniteListInner>;

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    paddingHorizontal: theme.spacing.m,
  },
}));
