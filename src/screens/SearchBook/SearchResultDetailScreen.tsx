import React from 'react';
import { Animated as RNAnimated } from 'react-native';
import Animated from 'react-native-reanimated';
import { Box } from '~components/Box';
import ProgressiveImage from '~components/ProgressiveFastImage';
import { StarRating } from '~components/Rating';
import { ScreenView } from '~components/ScreenView';
import { Spacing } from '~components/Spacing';
import { AppText } from '~components/Text';
import { RouteNames } from '~navigation/RouteNames';
import { BookStackScreenProps } from '~navigation/types';
import { getWindowWidth } from '~utils/layout';
import { SearchBookResultDetailSection } from './components/SearchBookResultDetailSection';
import { getCoverImageUrl } from './helpers/get-cover-image-url';
import { useSearchResultDetailsScreenOptions } from './helpers/useSearchResultDetailsScreenOptions';

type Props = BookStackScreenProps<RouteNames.SearchResultDetail>;

export const SearchResultDetailScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const {
    bookDetail: {
      key,
      first_publish_year,
      title,
      author_name,
      cover_edition_key,
      first_sentence,
      publisher_facet,
      ratings_average,
      ratings_count,
      subject_facet,
    },
  } = route.params;

  const scrollY = React.useRef(new RNAnimated.Value(0)).current;

  const detailsToDisplay = [
    { key: 'first_sentence', title: 'About', content: first_sentence },
    { key: 'author_name', title: 'Authors', content: author_name },
    {
      key: 'subject_facet',
      title: 'Subjects',
      content: subject_facet,
    },
    {
      key: 'publisher_facet',
      title: 'Publishers',
      content: publisher_facet,
    },
  ];

  const imageAnimStyle = {
    aspectRatio: 1,
    width: getWindowWidth(80),
    transform: [
      {
        scale: scrollY.interpolate({
          inputRange: [-120, -30, 0, 30, 120],
          outputRange: [1.2, 1.05, 1, 0.95, 0.8],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const isRatingAvailable =
    typeof ratings_average === 'number' && typeof ratings_count === 'number';

  useSearchResultDetailsScreenOptions({
    bookKey: key,
    navigation,
    title,
  });

  return (
    <ScreenView
      withStatusBar
      withScrollView
      scrollViewProps={{
        rnAnimatedProps: {
          contentContainerStyle: {
            flexGrow: 1,
          },
          /**
           * We intend to utilize the Animated module from React Native instead of Reanimated.
           * This choice is due to the fact that the ProgressiveImage component is designed
           * to work with Animated from React Native, rather than Reanimated.
           */
          onScroll: RNAnimated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            { useNativeDriver: true },
          ),
          scrollEventThrottle: 1,
        },
      }}
    >
      <Box flex={1}>
        <Box alignItems={'center'}>
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
              resizeMode="contain"
              style={[
                imageAnimStyle,
                {
                  position: 'relative',
                },
              ]}
              source={
                cover_edition_key
                  ? {
                      uri: getCoverImageUrl('L', cover_edition_key),
                    }
                  : require('~assets/question-mark-50.png')
              }
            />
          </Animated.View>
          <Spacing marginTop="xl" />

          <AppText
            textAlign={'left'}
            numberOfLines={1}
            color="bodyText"
            variant={'title1'}
          >
            {title}
          </AppText>
          <Spacing marginTop="s" />

          <AppText
            textAlign={'left'}
            numberOfLines={1}
            color="bodyText"
            variant={'title3'}
          >
            Publish year: {first_publish_year}
          </AppText>

          {isRatingAvailable && (
            <>
              <Spacing marginTop="s" />

              <Box alignItems={'center'} flexDirection="row">
                <StarRating rating={ratings_average} />
                <AppText
                  marginLeft={'xs'}
                  textAlign={'center'}
                  numberOfLines={1}
                  variant={'body'}
                  color="bodyTextLight"
                >
                  ({Math.floor(ratings_count)})
                </AppText>
              </Box>
            </>
          )}
        </Box>

        <Spacing marginTop="l" />

        {detailsToDisplay.map(
          (detail) =>
            typeof detail.content !== 'undefined' && (
              <SearchBookResultDetailSection
                key={detail.key}
                title={detail.title}
                content={detail.content}
              />
            ),
        )}
      </Box>
    </ScreenView>
  );
};
