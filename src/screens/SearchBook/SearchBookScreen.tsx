import LottieView from 'lottie-react-native';
import React from 'react';
import { Keyboard } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Box } from '~components/Box';
import { NativeBorderlessButton } from '~components/Button';
import { ScreenView } from '~components/ScreenView';
import { Spacing } from '~components/Spacing';
import { AppTextInput } from '~components/TextInput';
import { RouteNames } from '~navigation/RouteNames';
import { BookStackScreenProps } from '~navigation/types';
import { s } from '~theme/common-styles';
import { useSearchBookScreenOptions } from './helpers/useSearchBookScreenOptions';
type Props = BookStackScreenProps<RouteNames.SearchBook>;

export const SearchBookScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = React.useState<string>('');

  useSearchBookScreenOptions({ navigation });

  const handleNavigateToSearchResult = () => {
    Keyboard.dismiss();

    if (query.trim().length > 0) {
      navigation.navigate(RouteNames.SearchBookResult, { query });
    }
  };

  return (
    <ScreenView
      withStatusBar
      shouldDismissKeyboardOnPressOutside
      withSafeArea
      safeAreaProps={{ edges: ['bottom'] }}
    >
      <Box flex={1}>
        <Spacing marginTop="m" />

        <Animated.View sharedTransitionTag="search-bar">
          <AppTextInput
            onChangeText={setQuery}
            value={query}
            returnKeyType="search"
            placeholder="Search books with any keyword or ISBN..."
            startIconName="magnify"
            onEndEditing={handleNavigateToSearchResult}
            onSubmitEditing={handleNavigateToSearchResult}
          />
        </Animated.View>

        <Spacing marginTop="xl" />

        <Animated.View entering={FadeInUp.delay(500)}>
          <NativeBorderlessButton
            label="Search"
            enabled={query.trim().length > 0}
            onPress={handleNavigateToSearchResult}
          />
        </Animated.View>

        <LottieView
          loop={false}
          autoPlay
          style={s.flex()}
          source={require('~assets/books-collapsing.json')}
        />
      </Box>
    </ScreenView>
  );
};
