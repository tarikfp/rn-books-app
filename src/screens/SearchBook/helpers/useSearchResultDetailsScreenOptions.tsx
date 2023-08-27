import React from 'react';
import { Platform } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Box } from '~components/Box';
import { Spacing } from '~components/Spacing';
import { AppText } from '~components/Text';
import { RouteNames } from '~navigation/RouteNames';
import { BookStackScreenProps } from '~navigation/types';
import { useAppTheme } from '~theme/core';
import { getWindowWidth } from '~utils/layout';
import { SearchBookResultActionItem } from '../components/SearchBookResultActionItem';
import { useBookItemActions } from './useBookItemActions';

type NativeHeaderTitle =
  | string
  | ((props: {
      /**
       * The title text of the header.
       */
      children: string;
      /**
       * Tint color for the header.
       */
      tintColor?: string;
    }) => React.ReactNode);

type Params = {
  navigation: BookStackScreenProps<RouteNames.SearchResultDetail>['navigation'];
  title: string;
  bookKey: string;
};

export function useSearchResultDetailsScreenOptions({
  navigation,
  bookKey,
  title,
}: Params) {
  const { colors, spacing } = useAppTheme();
  const [headerRightNativeWidth, setHeaderRightNativeWidth] = React.useState<
    number | undefined
  >(undefined);
  const [headerLeftNativeWidth, setHeaderLeftNativeWidth] = React.useState<
    number | undefined
  >(undefined);

  const {
    handleToggleCurrentlyReadingItem,
    handleToggleWishlistItem,
    getIsAddedToList,
  } = useBookItemActions();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      /**
       * The 'headerTitle' element in Android doesn't consider the items in the header on its right.
       * As a result, text overflows to the right, overlapping with these items.
       * To prevent this issue, a solution in Android involves calculating the combined width of 'headerLeft' and 'headerRight',
       * and then assigning a custom width to the title to ensure proper display.
       *
       * Note that we do not have to deal with it in iOS platform.
       */
      headerTitle: Platform.select<NativeHeaderTitle>({
        android: () => (
          <AppText
            style={{
              width:
                getWindowWidth(100) -
                ((headerLeftNativeWidth ?? 0) +
                  (headerRightNativeWidth ?? 0) +
                  spacing.m * 2),
            }}
            numberOfLines={1}
            textAlign={'center'}
            color="bodyText"
            variant={'title3'}
          >
            {title}
          </AppText>
        ),
        ios: title,
      }),
      headerBackVisible: false,
      headerLeft: () => {
        // since the screen transition animation is slider_from_bottom for this screen
        // we will want to use `close` icon instead of `arrow-left`
        return (
          <Box
            onLayout={(e) =>
              setHeaderLeftNativeWidth(e.nativeEvent.layout.width)
            }
          >
            <BorderlessButton onPress={navigation.goBack}>
              <MaterialCommunityIcons
                disabled
                name="window-close"
                size={25}
                color={colors.bodyText}
              />
            </BorderlessButton>
          </Box>
        );
      },

      headerRight: () => {
        return (
          <Box
            onLayout={(e) =>
              setHeaderRightNativeWidth(e.nativeEvent.layout.width)
            }
            justifyContent={'flex-end'}
            flexDirection={'row'}
            alignItems="center"
          >
            <SearchBookResultActionItem
              withBadge={false}
              onPress={handleToggleWishlistItem(bookKey)}
              iconColor={
                getIsAddedToList(bookKey, 'wishlist')
                  ? colors.gold
                  : colors.bodyText
              }
              iconName={
                getIsAddedToList(bookKey, 'wishlist') ? 'star' : 'star-outline'
              }
            />

            <Spacing marginLeft="sm" />

            <SearchBookResultActionItem
              onPress={handleToggleCurrentlyReadingItem(bookKey)}
              withBadge={false}
              iconColor={
                getIsAddedToList(bookKey, 'currentlyReading')
                  ? colors.primary
                  : colors.bodyText
              }
              iconName={
                getIsAddedToList(bookKey, 'currentlyReading')
                  ? 'book-remove'
                  : 'book-plus-outline'
              }
            />
          </Box>
        );
      },
    });
  }, [
    bookKey,
    colors.bodyText,
    colors.gold,
    colors.primary,
    getIsAddedToList,
    handleToggleCurrentlyReadingItem,
    handleToggleWishlistItem,
    headerLeftNativeWidth,
    headerRightNativeWidth,
    navigation,
    spacing.m,
    title,
  ]);
}
