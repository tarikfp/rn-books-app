import LottieView from 'lottie-react-native';
import * as React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { NativeBorderlessButton } from '~components/Button';
import { ScreenView } from '~components/ScreenView';
import { Spacing } from '~components/Spacing';
import { AppText } from '~components/Text';
import { ErrorService } from '~lib/error/error-utils';
import { s } from '~theme/common-styles';

export const FallbackScreen: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <ScreenView withSafeArea>
      <AppText textAlign={'center'} variant={'title1'} color="bodyText">
        {ErrorService.isNetworkError(error)
          ? 'Network error occurred'
          : ErrorService.isServerError(error)
          ? 'Server error'
          : 'Unknown error'}
      </AppText>

      <LottieView
        style={s.flex()}
        autoPlay
        loop={false}
        source={require('~assets/error-animation.json')}
      />

      <Spacing marginTop="m" />

      <NativeBorderlessButton
        label="Go back home"
        onPress={resetErrorBoundary}
      />
    </ScreenView>
  );
};
