import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const useBounceButtonProps = (scaleValue: number = 0.95) => {
  const scaleAnim = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleAnim.value,
        },
      ],
    };
    // must use dependency array otherwise tests will fail
    // https://github.com/react-navigation/react-navigation/pull/11496
    // https://github.com/software-mansion/react-native-reanimated/issues/4522#issuecomment-1653799061
  }, []);

  const onPressIn = () => {
    scaleAnim.value = withSpring(scaleValue);
  };

  const onPressOut = () => {
    scaleAnim.value = withSpring(1);
  };

  return {
    style: animStyle,
    onPressIn,
    onPressOut,
  };
};
