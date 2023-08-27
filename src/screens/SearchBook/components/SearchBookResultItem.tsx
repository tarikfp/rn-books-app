import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Box } from '~components/Box';
import ProgressiveImage from '~components/ProgressiveFastImage';
import { Spacing } from '~components/Spacing';
import { AppText } from '~components/Text';
import { PickedBookDocument } from '~store/search-books/search-books-slice-types';
import { useAppTheme } from '~theme/core';
import { makeStyles } from '~theme/make-styles';
import { getWindowHeight } from '~utils/layout';
import { getCoverImageUrl } from '../helpers/get-cover-image-url';
import { SearchBookResultActionItem } from './SearchBookResultActionItem';

export const ITEM_HEIGHT = getWindowHeight(12.5);
const IMAGE_HEIGHT = getWindowHeight(10);

interface SearchBookResultItemProps extends PickedBookDocument {
  onPress: () => void;
  onLayout?: React.ComponentProps<typeof Box>['onLayout'];
  onToggleWishlist: () => void;
  onToggleCurrentlyReading: () => void;
  isAddedToWishlist: boolean;
  isAddedToCurrentlyReading: boolean;
}

export const SearchBookResultItem: React.FC<SearchBookResultItemProps> =
  React.memo(
    ({
      onPress,
      onToggleCurrentlyReading,
      onToggleWishlist,
      isAddedToWishlist,
      isAddedToCurrentlyReading,
      onLayout,
      ...book
    }) => {
      const { title, author_name, first_publish_year, cover_edition_key } =
        book;

      const styles = useStyles();
      const { colors } = useAppTheme();

      return (
        <RectButton
          testID="search-book-result-item-button"
          style={styles.baseButton}
          onPress={onPress}
        >
          <Box
            onLayout={onLayout}
            height={ITEM_HEIGHT}
            width={'100%'}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            padding={'s'}
          >
            <Box alignItems={'center'} height={IMAGE_HEIGHT}>
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
              <Animated.View sharedTransitionTag={cover_edition_key}>
                <ProgressiveImage
                  resizeMode="cover"
                  testID="search-book-result-item-image"
                  style={{
                    height: IMAGE_HEIGHT,
                  }}
                  /**
                   * we could use below approach, however it will cause rerendering entire component which will significantly decrease performance.
                   * As long as we do not retrieve the image's dimensions from api, lets skip the image dimension calculation part for now
                   */

                  /*      onLoad={(evt) =>
              setImageDimensions({
                height: evt.nativeEvent.height,
                width: evt.nativeEvent.width,
              })
            } */
                  thumbnailImageStyle={{
                    height: IMAGE_HEIGHT,
                  }}
                  thumbnailSource={require('~assets/question-mark-50.png')}
                  blurRadius={
                    /** avoid using blurRadius when image is not available.  */
                    cover_edition_key ? 15 : undefined
                  }
                  source={{
                    uri: cover_edition_key
                      ? getCoverImageUrl('L', cover_edition_key)
                      : '',
                  }}
                />
              </Animated.View>
            </Box>

            <Spacing marginRight={'m'} />

            <Box justifyContent={'space-evenly'} height={ITEM_HEIGHT} flex={1}>
              <AppText color="bodyText" variant={'bodyBold'} numberOfLines={2}>
                {title}
              </AppText>
              <AppText color="bodyText" variant={'body'} numberOfLines={1}>
                Author name: {author_name?.[0] ?? 'Not found'}
              </AppText>
              <AppText color="bodyText" variant={'body'} numberOfLines={1}>
                Publish date: {first_publish_year}
              </AppText>
            </Box>

            <Box
              paddingBottom={'s'}
              flexDirection="row"
              height={ITEM_HEIGHT}
              alignItems={'flex-end'}
            >
              <SearchBookResultActionItem
                testID="wishlist-button"
                onPress={onToggleWishlist}
                iconColor={
                  isAddedToWishlist ? colors.gold : colors.bodyTextLight
                }
                iconName={isAddedToWishlist ? 'star' : 'star-outline'}
              />

              <Spacing marginLeft="s" />

              <SearchBookResultActionItem
                testID="currently-reading-button"
                onPress={onToggleCurrentlyReading}
                iconColor={
                  isAddedToCurrentlyReading
                    ? colors.primary
                    : colors.bodyTextLight
                }
                iconName={
                  isAddedToCurrentlyReading
                    ? 'book-remove'
                    : 'book-plus-outline'
                }
              />
            </Box>
          </Box>
        </RectButton>
      );
    },
  );

SearchBookResultItem.displayName = 'SearchBookResultItem';

const useStyles = makeStyles((theme) => ({
  baseButton: {
    backgroundColor: theme.colors.paper,
  },
}));
