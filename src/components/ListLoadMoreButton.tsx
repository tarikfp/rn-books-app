import * as React from 'react';
import { BaseButton } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAppTheme } from '~theme/core';

type Props = {
  onPress: () => void;
  testID?: string;
};

export const ListLoadMoreButton: React.FC<Props> = ({ onPress, testID }) => {
  const { colors } = useAppTheme();
  return (
    <BaseButton testID={testID} onPress={onPress}>
      <AntDesign disabled name="pluscircleo" size={35} color={colors.primary} />
    </BaseButton>
  );
};
