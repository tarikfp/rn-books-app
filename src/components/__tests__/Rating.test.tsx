import React from 'react';
import { StarRating } from '~components/Rating';
import { render } from '~utils/test-utils';

describe('StarRating Component', () => {
  it('matches snapshot', () => {
    const { toJSON } = render(<StarRating rating={3.5} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders the correct number of stars', () => {
    const { getByTestId } = render(<StarRating testID="star" rating={4} />);

    for (const star of ['star1', 'star2', 'star3', 'star4', 'star5']) {
      expect(getByTestId(star)).toBeTruthy();
    }
  });
});
