import color from 'color';
import React from 'react';
import { Platform, TextInput, TextInputProps } from 'react-native';
import Animated, {
  Extrapolate,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '~theme/core';
import { FONTS } from '~theme/fonts';
import { makeStyles } from '~theme/make-styles';
import { Box } from './Box';

const DEFAULT_INPUT_HEIGHT = 44;

const ICON_SPACING = 8;

const ICON_SIZE = 20;

export const MULTILINE_TEXT_INPUT_HEIGHT = FONTS.body.lineHeight! * 2;

const INPUT_BORDER_WIDTH = 1;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type Props = TextInputProps & {
  startIconName?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  endIconName?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  startIconWrapperTestID?: string;
  endIconWrapperTestID?: string;
};

export type ExposedAppTextInputMethods = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  isFocused: () => boolean | undefined;
};

const AppTextInputInner = React.forwardRef<ExposedAppTextInputMethods, Props>(
  (
    {
      multiline,
      onKeyPress,
      value,
      style,
      startIconName,
      endIconName,
      startIconWrapperTestID,
      endIconWrapperTestID,
      ...props
    }: Props,
    ref,
  ) => {
    const animatedTextInputHeight = useSharedValue(
      multiline ? MULTILINE_TEXT_INPUT_HEIGHT : DEFAULT_INPUT_HEIGHT,
    );

    const { colors } = useAppTheme();

    const textInputRef = React.useRef<TextInput | null>(null);
    const isInputFocused = textInputRef.current?.isFocused();
    const hasStartIcon = typeof startIconName !== 'undefined';
    const hasEndIcon = typeof endIconName !== 'undefined';

    const styles = useStyles({
      isInputFocused,
      multiline,
      hasStartIcon,
      hasEndIcon,
    });

    const animatedTextInputHeightStyle = useAnimatedStyle(() => {
      return {
        width: '100%',
        height: withTiming(animatedTextInputHeight.value, { duration: 200 }),
        paddingTop: interpolate(
          animatedTextInputHeight.value,
          [50, 70, 100],
          [
            isInputFocused
              ? MULTILINE_TEXT_INPUT_HEIGHT / 4 - 2 - INPUT_BORDER_WIDTH
              : MULTILINE_TEXT_INPUT_HEIGHT / 4 - 2,
            16,
            16,
          ],
          Extrapolate.CLAMP,
        ),
        paddingBottom: interpolate(
          animatedTextInputHeight.value,
          [50, 70, 100],
          [0, 16, 16],
          Extrapolate.CLAMP,
        ),
      };
      // must use dependency array otherwise tests will fail
      // https://github.com/react-navigation/react-navigation/pull/11496
      // https://github.com/software-mansion/react-native-reanimated/issues/4522#issuecomment-1653799061
    }, []);

    React.useImperativeHandle(
      ref,
      () => {
        return {
          focus() {
            textInputRef.current?.focus();
          },
          clear() {
            textInputRef.current?.clear();
          },
          blur() {
            textInputRef.current?.blur();
          },
          isFocused() {
            return textInputRef.current?.isFocused();
          },
        };
      },
      [],
    );

    return (
      <Box alignItems={'center'} flexDirection="row">
        {hasStartIcon && (
          <Animated.View
            testID={startIconWrapperTestID}
            style={styles.startIcon}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <MaterialCommunityIcons
              disabled
              size={ICON_SIZE}
              name={startIconName}
              color={isInputFocused ? colors.primary : colors.bodyTextLight}
            />
          </Animated.View>
        )}
        <AnimatedTextInput
          // https://github.com/software-mansion/react-native-reanimated/issues/4840#issuecomment-1677092242
          // @ts-ignore
          ref={textInputRef}
          style={[
            styles.textInput,
            multiline && animatedTextInputHeightStyle,
            style,
          ]}
          placeholderTextColor={colors.placeholder}
          autoCapitalize="none"
          multiline={multiline}
          keyboardType="default"
          onKeyPress={onKeyPress}
          inputAccessoryViewID={undefined}
          autoComplete="off"
          autoCorrect={false}
          selectionColor={colors.primary}
          cursorColor={colors.primary}
          value={value}
          {...props}
        />
        {hasEndIcon && (
          <Animated.View
            testID={endIconWrapperTestID}
            style={styles.endIcon}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <MaterialCommunityIcons
              disabled
              name={endIconName}
              size={ICON_SIZE}
              color={isInputFocused ? colors.primary : colors.bodyTextDisabled}
            />
          </Animated.View>
        )}
      </Box>
    );
  },
);

export const AppTextInput = React.memo(AppTextInputInner);

AppTextInputInner.displayName = 'AppTextInput';

const useStyles = makeStyles(
  (theme, { isInputFocused, multiline, hasStartIcon, hasEndIcon }) => ({
    textInput: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlignVertical: 'center',
      height: DEFAULT_INPUT_HEIGHT,
      paddingHorizontal: isInputFocused
        ? theme.spacing.s - INPUT_BORDER_WIDTH
        : theme.spacing.s,
      paddingLeft: hasStartIcon
        ? isInputFocused
          ? theme.spacing.s + ICON_SIZE + ICON_SPACING / 2 - INPUT_BORDER_WIDTH
          : theme.spacing.s + ICON_SIZE + ICON_SPACING / 2
        : undefined,
      paddingRight: hasEndIcon
        ? isInputFocused
          ? theme.spacing.s + ICON_SIZE + ICON_SPACING / 2 - INPUT_BORDER_WIDTH
          : theme.spacing.s + ICON_SIZE + ICON_SPACING / 2
        : undefined,
      // !! Padding vertical does not work when used in input as a style
      // !! https://github.com/facebook/react-native/issues/21720
      // verticalAlign: "auto",
      borderWidth: isInputFocused ? INPUT_BORDER_WIDTH : 0,
      borderColor: isInputFocused ? theme.colors.primary : undefined,
      backgroundColor: isInputFocused
        ? color(theme.colors.primary).rgb().alpha(0.1).toString()
        : theme.colors.paper,
      borderRadius: 8,
      ...theme.textVariants.body,
      lineHeight: Platform.select({
        android: theme.textVariants.body.lineHeight,
        ios: multiline ? theme.textVariants.body.lineHeight : 0,
      }),
      letterSpacing: -0.01,
      color: theme.colors.bodyText,
    },
    startIcon: {
      height: '100%',
      position: 'absolute',
      justifyContent: 'center',
      alignSelf: 'center',
      zIndex: 99,
      left: ICON_SPACING,
    },
    endIcon: {
      height: '100%',
      position: 'absolute',
      justifyContent: 'center',
      alignSelf: 'center',
      zIndex: 99,
      right: !hasStartIcon ? ICON_SPACING * 2 : ICON_SPACING,
    },
  }),
);
