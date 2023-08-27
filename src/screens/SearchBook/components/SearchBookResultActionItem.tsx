import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Box } from '~components/Box';
import { BorderlessBounceButton } from '~components/Button';

type Props = {
  onPress: () => void;
  iconName: string;
  iconColor: string;
  iconSize?: number;
  withBadge?: boolean;
  testID?: string;
};

export const SearchBookResultActionItem: React.FC<Props> = React.memo(
  ({
    iconName,
    iconColor,
    withBadge = true,
    iconSize = 25,
    onPress,
    testID,
  }) => {
    return (
      <BorderlessBounceButton
        testID={testID ?? 'SearchBookResultActionItemButton'}
        activeOpacity={0.65}
        bounceValue={0.85}
        onPress={onPress}
      >
        {withBadge ? (
          <Box borderRadius={'rounded'} padding="xs" backgroundColor={'border'}>
            <MaterialCommunityIcons
              disabled
              name={iconName}
              size={iconSize}
              color={iconColor}
            />
          </Box>
        ) : (
          <MaterialCommunityIcons
            disabled
            name={iconName}
            size={iconSize}
            color={iconColor}
          />
        )}
      </BorderlessBounceButton>
    );
  },
);

SearchBookResultActionItem.displayName = 'SearchBookResultActionItem';
