import { BlurView } from '@react-native-community/blur';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useThemePreference } from '~theme/useThemePreference';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
type Props = React.ComponentProps<typeof BlurView> & {
  isAnimatedComponent?: boolean;
};

export const AppBlurView: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  style,
  blurType,
  blurAmount,
  isAnimatedComponent = false,
  ...props
}) => {
  const { isDarkTheme } = useThemePreference();

  if (isAnimatedComponent) {
    return (
      <AnimatedBlurView
        style={[StyleSheet.absoluteFill, style]}
        blurType={blurType ?? isDarkTheme ? 'dark' : 'light'}
        blurAmount={blurAmount ?? 50}
        {...props}
      >
        {children}
      </AnimatedBlurView>
    );
  }

  return (
    <BlurView
      style={[StyleSheet.absoluteFill, style]}
      blurType={blurType ?? isDarkTheme ? 'dark' : 'light'}
      blurAmount={blurAmount ?? 50}
      {...props}
    >
      {children}
    </BlurView>
  );
};
