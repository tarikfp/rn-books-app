import React from 'react';
import ModalLoader from '~components/ModalLoader';
import { render } from '~utils/test-utils';

jest.mock('lottie-react-native', () => 'LottieView');

describe('ModalLoader Component', () => {
  it('matches snapshot when visible', () => {
    const { toJSON } = render(<ModalLoader isVisible={true} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot when not visible', () => {
    const { toJSON } = render(<ModalLoader isVisible={false} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
