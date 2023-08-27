import LottieView from 'lottie-react-native';
import * as React from 'react';
import Modal from 'react-native-modal';
import { useAppTheme } from '~theme/core';
import { makeStyles } from '~theme/make-styles';
import { useThemePreference } from '~theme/useThemePreference';
import { getWindowHeight, getWindowWidth } from '~utils/layout';
import { Box } from './Box';

interface Props {
  readonly isVisible: boolean;
}

export default function ModalLoader({ isVisible }: Props) {
  const styles = useStyles();
  const { colors } = useAppTheme();
  const { isDarkTheme } = useThemePreference();

  return (
    <Modal
      hasBackdrop
      animationInTiming={500}
      animationIn="fadeInUp"
      // https://github.com/react-native-modal/react-native-modal/issues/268
      backdropTransitionOutTiming={0}
      style={styles.modal}
      backdropColor={isDarkTheme ? colors.bodyTextDisabled : undefined}
      animationOut="fadeOutDown"
      animationOutTiming={600}
      backdropOpacity={0.45}
      isVisible={isVisible}
    >
      <Box
        backgroundColor="paper"
        justifyContent="center"
        alignItems="center"
        borderRadius="m"
        height={getWindowHeight(15)}
        width={getWindowWidth(50)}
        padding="m"
      >
        <LottieView
          autoPlay
          loop
          style={styles.lottie}
          source={require('~assets/book-loader-animation.json')}
        />
      </Box>
    </Modal>
  );
}

const useStyles = makeStyles((_theme) => ({
  modal: {
    alignSelf: 'center',
  },
  lottie: {
    width: getWindowWidth(50),
    height: getWindowHeight(50),
    alignSelf: 'center',
  },
}));
