import React from 'react';
import { AppBlurView } from '~components/BlurView';
import { render } from '~utils/test-utils';

describe('AppBlurView Component', () => {
  it('matches snapshot', () => {
    const { toJSON } = render(<AppBlurView />);
    expect(toJSON()).toMatchSnapshot();
  });
});
