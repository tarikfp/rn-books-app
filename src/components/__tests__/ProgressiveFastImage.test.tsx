import { render } from '@testing-library/react-native';
import React from 'react';
import ProgressiveImage from '~components/ProgressiveFastImage';

describe('ProgressiveImage Component', () => {
  it('matches snapshot', () => {
    const mockSource = { uri: 'mock-image-uri' };
    const { toJSON } = render(
      <ProgressiveImage
        source={mockSource}
        blurRadius={10}
        thumbnailSource={mockSource}
        resizeMode="cover"
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
