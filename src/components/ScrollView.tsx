/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { ScrollView } from 'react-native';
import { s } from '~theme/common-styles';
import { makeStyles } from '~theme/make-styles';

/**
 * Reusable custom scroll view component that can be used throughout the app
 * For the sake of this example, it will be used only in SearchResultDetailScreen
 */
interface Props extends React.ComponentProps<typeof ScrollView> {
  backgroundColor?: string;
}

const AppScrollViewInner: React.ForwardRefRenderFunction<
  any,
  React.PropsWithChildren<Props>
> = ({ backgroundColor, testID, children, ...props }, scrollViewRef) => {
  const styles = useStyles();

  return (
    <ScrollView
      ref={scrollViewRef}
      keyboardShouldPersistTaps="handled"
      style={styles.base}
      scrollEventThrottle={16}
      contentContainerStyle={styles.contentContainer}
      testID={testID}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export const AppScrollView = React.forwardRef(AppScrollViewInner);

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    ...s.flexGrow,
    backgroundColor: theme.colors.background,
  },
  base: {
    ...s.flex,
    backgroundColor: theme.colors.background,
  },
}));
