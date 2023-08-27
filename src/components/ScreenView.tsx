import omit from 'lodash/omit';
import * as React from 'react';
import {
  Animated as RNAnimated,
  Keyboard,
  ScrollView,
  ScrollViewProps,
  StatusBar,
  StatusBarProps,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { s } from '~theme/common-styles';
import { AppTheme, useAppTheme, useThemePreference } from '~theme/core';
import { Box } from './Box';

type Props = {
  withSafeArea?: boolean;
  withStatusBar?: boolean;
  withTouchableWithoutFeedback?: boolean;
  withScrollView?: boolean;
  shouldDismissKeyboardOnPressOutside?: boolean;
  statusBarProps?: StatusBarProps;
  backgroundColor?: keyof AppTheme['colors'];
  rootViewProps?: React.ComponentProps<typeof Box>;
  touchableWithoutFeedbackProps?: TouchableWithoutFeedbackProps;
  safeAreaProps?: SafeAreaViewProps;
  scrollViewProps?: ScrollViewProps & {
    animatedScrollViewProps?: Animated.AnimateProps<ScrollViewProps>;
    rnAnimatedProps?: React.ComponentProps<typeof Animated.ScrollView>;
  };
  disableHorizontalPadding?: boolean;
  disableVerticalPadding?: boolean;
  padding?: keyof AppTheme['spacing'];
};

interface WithComponentPropsBase<P, T = undefined> {
  shouldRender: boolean;
  extraProps?: P;
  ref?: React.ForwardedRef<T>;
}

type WithScrollViewProps = WithComponentPropsBase<
  ScrollViewProps & {
    animatedScrollViewProps?: Animated.AnimateProps<ScrollViewProps>;
    rnAnimatedProps?: React.ComponentProps<typeof Animated.ScrollView>;
  },
  ScrollView
>;
type WithTouchableWithoutFeedbackProps = WithComponentPropsBase<
  React.ComponentProps<typeof TouchableWithoutFeedback>
>;
type WithSafeAreaProps = WithComponentPropsBase<SafeAreaViewProps>;
type WithStatusBarProps = WithComponentPropsBase<StatusBarProps>;

const WithTouchableWithoutFeedback: React.FC<
  React.PropsWithChildren<WithTouchableWithoutFeedbackProps>
> = ({ children, extraProps, shouldRender }) => {
  if (!shouldRender) {
    return children as React.ReactElement;
  }

  return (
    <TouchableWithoutFeedback
      style={[s.flex(), extraProps?.style]}
      {...omit(extraProps, 'style')}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};

const WithScrollView: React.FC<
  React.PropsWithChildren<WithScrollViewProps>
> = ({ extraProps, shouldRender, children, ref }) => {
  if (!shouldRender) {
    return children as React.ReactElement;
  }

  /** TODO: improve more on converting a component to a animated component, make it more generic for other components */

  if (typeof extraProps?.animatedScrollViewProps !== 'undefined') {
    return (
      <Animated.ScrollView
        ref={ref as React.ForwardedRef<Animated.ScrollView>}
        {...extraProps.animatedScrollViewProps}
      >
        {children}
      </Animated.ScrollView>
    );
  }

  if (typeof extraProps?.rnAnimatedProps !== 'undefined') {
    return (
      <RNAnimated.ScrollView
        ref={ref as React.ForwardedRef<Animated.ScrollView>}
        {...extraProps.rnAnimatedProps}
      >
        {children}
      </RNAnimated.ScrollView>
    );
  }

  return (
    <ScrollView ref={ref} {...omit(extraProps, 'animatedScrollViewProps')}>
      {children}
    </ScrollView>
  );
};

const WithSafeArea: React.FC<React.PropsWithChildren<WithSafeAreaProps>> = ({
  children,
  extraProps,
  shouldRender,
}) => {
  const { colors } = useAppTheme();
  if (!shouldRender) {
    return children as React.ReactElement;
  }

  return (
    <SafeAreaView
      style={[
        s.flex(),
        { backgroundColor: colors.background },
        extraProps?.style,
      ]}
      {...omit(extraProps, 'style')}
    >
      {children}
    </SafeAreaView>
  );
};

const WithAppStatusBar: React.FC<WithStatusBarProps> = ({
  shouldRender,
  extraProps,
}) => {
  const { isDarkTheme } = useThemePreference();

  if (!shouldRender) {
    return null;
  }

  return (
    <StatusBar
      barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      {...extraProps}
    />
  );
};

const WithRootView: React.FC<
  React.PropsWithChildren<React.ComponentProps<typeof Box>>
> = ({ children, ...props }) => {
  return <Box {...props}>{children}</Box>;
};

export const ScreenView: React.FC<React.PropsWithChildren<Props>> = ({
  backgroundColor,
  children,
  scrollViewProps,
  rootViewProps,
  statusBarProps,
  safeAreaProps,
  touchableWithoutFeedbackProps,
  shouldDismissKeyboardOnPressOutside = false,
  disableHorizontalPadding = false,
  disableVerticalPadding = false,
  withSafeArea = false,
  withTouchableWithoutFeedback = false,
  withStatusBar = false,
  withScrollView = false,
  padding,
}) => {
  const computedBgColor = backgroundColor ?? 'background';

  const computedPadding: keyof AppTheme['spacing'] = padding ?? 'm';

  return (
    <WithSafeArea shouldRender={withSafeArea} extraProps={safeAreaProps}>
      <WithAppStatusBar shouldRender={withStatusBar} {...statusBarProps} />
      <WithScrollView
        shouldRender={withScrollView}
        extraProps={scrollViewProps}
      >
        <WithRootView
          flex={1}
          backgroundColor={computedBgColor}
          paddingVertical={disableVerticalPadding ? undefined : computedPadding}
          paddingHorizontal={
            disableHorizontalPadding ? undefined : computedPadding
          }
          {...rootViewProps}
        >
          <WithTouchableWithoutFeedback
            extraProps={{
              onPress: shouldDismissKeyboardOnPressOutside
                ? Keyboard.dismiss
                : undefined,
              ...touchableWithoutFeedbackProps,
            }}
            shouldRender={
              withTouchableWithoutFeedback ||
              shouldDismissKeyboardOnPressOutside
            }
          >
            {children}
          </WithTouchableWithoutFeedback>
        </WithRootView>
      </WithScrollView>
    </WithSafeArea>
  );
};
