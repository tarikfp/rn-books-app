import {
  BorderlessButton,
  BorderlessButtonProps,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useBounceButtonProps } from '~hooks/useBounceButtonProps';
import { Box } from './Box';
import { AppText } from './Text';

type NativeBorderlessButtonProps = BorderlessButtonProps & {
  label: string;
};

export const NativeBorderlessButton: React.FC<NativeBorderlessButtonProps> = ({
  label,
  testID,
  enabled,
  ...borderlessButtonProps
}) => {
  return (
    <BorderlessBounceButton
      testID={testID}
      rippleRadius={0}
      enabled={enabled}
      {...borderlessButtonProps}
    >
      <Box
        backgroundColor={enabled ? 'primary' : 'bodyTextDisabled'}
        borderWidth={1}
        paddingVertical={'sm'}
        borderRadius={'m'}
        borderColor="border"
        justifyContent={'center'}
        alignItems={'center'}
      >
        <AppText numberOfLines={1} color="white" variant={'bodyBold'}>
          {label}
        </AppText>
      </Box>
    </BorderlessBounceButton>
  );
};

const AnimatedBorderlessButton =
  Animated.createAnimatedComponent(BorderlessButton);

export const BorderlessBounceButton: React.FC<
  React.ComponentProps<typeof AnimatedBorderlessButton> & {
    bounceValue?: number;
  }
> = ({ children, bounceValue = 0.95, testID, enabled = true, ...props }) => {
  const {
    onPressIn,
    onPressOut,
    style: animStyle,
  } = useBounceButtonProps(bounceValue);

  return (
    <AnimatedBorderlessButton
      testID={testID}
      style={animStyle}
      onActivated={onPressIn}
      onEnded={onPressOut}
      enabled={enabled}
      {...props}
    >
      {children}
    </AnimatedBorderlessButton>
  );
};
