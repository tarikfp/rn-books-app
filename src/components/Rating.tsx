import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppTheme } from '~theme/core';
import { Box } from './Box';

const ICON_SIZE = 20;

interface RatingProps {
  rating: number;
  iconSize?: number;
  testID?: string;
}

export const StarRating: React.FC<RatingProps> = ({
  rating,
  testID,
  iconSize = ICON_SIZE,
}) => {
  const { colors } = useAppTheme();
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    for (let i = 1; i <= 5; i++) {
      let iconName = 'star';
      let iconColor = colors.bodyTextDisabled;

      if (i <= fullStars) {
        iconName = 'star';
        iconColor = colors.gold;
      } else if (i === fullStars + 1 && halfStar) {
        iconName = 'star-half-o';
        iconColor = colors.gold;
      }

      stars.push(
        <Icon
          testID={(testID ?? '') + i}
          key={i}
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={styles.star}
        />,
      );
    }

    return stars;
  };

  return (
    <Box flexDirection={'row'} alignItems={'center'}>
      {renderStars()}
    </Box>
  );
};

const styles = StyleSheet.create({
  star: {
    marginHorizontal: 2,
  },
});
