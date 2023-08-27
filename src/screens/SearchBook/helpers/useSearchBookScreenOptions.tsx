import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RouteNames } from '~navigation/RouteNames';
import { BookStackScreenProps } from '~navigation/types';
import { useAppTheme } from '~theme/core';
import { useThemePreference } from '~theme/useThemePreference';
import { getRandomCaption } from './get-random-caption';

type Params = {
  navigation: BookStackScreenProps<RouteNames.SearchBook>['navigation'];
};

export function useSearchBookScreenOptions({ navigation }: Params) {
  const lightThemeIconAnim = useSharedValue(1);
  const darkThemeIconAnim = useSharedValue(0);
  const { colors } = useAppTheme();
  const { isDarkTheme, toggleTheme } = useThemePreference();

  const darkThemeIconAnimStyle = useAnimatedStyle(() => {
    return {
      justifyContent: 'center',
      alignItems: 'center',
      transform: [
        {
          scale: darkThemeIconAnim.value,
        },
      ],
    };
  });

  const lightThemeIconAnimStyle = useAnimatedStyle(() => {
    return {
      justifyContent: 'center',
      alignItems: 'center',
      transform: [
        {
          scale: lightThemeIconAnim.value,
        },
      ],
    };
  });

  React.useEffect(() => {
    if (isDarkTheme) {
      darkThemeIconAnim.value = withTiming(1, {}, (finished) => {
        if (finished) {
          lightThemeIconAnim.value = 0;
        }
      });
    } else {
      lightThemeIconAnim.value = withTiming(1, {}, (finished) => {
        if (finished) {
          darkThemeIconAnim.value = 0;
        }
      });
    }
  }, [darkThemeIconAnim, isDarkTheme, lightThemeIconAnim]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return isDarkTheme ? (
          <Animated.View style={darkThemeIconAnimStyle}>
            <BorderlessButton onPress={toggleTheme}>
              <MaterialIcons
                color={colors.white}
                disabled
                size={25}
                name={'dark-mode'}
              />
            </BorderlessButton>
          </Animated.View>
        ) : (
          <Animated.View style={lightThemeIconAnimStyle}>
            <BorderlessButton onPress={toggleTheme}>
              <MaterialIcons
                color={colors.bodyText}
                disabled
                size={25}
                name={'light-mode'}
              />
            </BorderlessButton>
          </Animated.View>
        );
      },
    });
  }, [
    colors.bodyText,
    colors.white,
    darkThemeIconAnimStyle,
    isDarkTheme,
    lightThemeIconAnimStyle,
    navigation,
    toggleTheme,
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: getRandomCaption(),
    });
  }, [navigation]);
}
