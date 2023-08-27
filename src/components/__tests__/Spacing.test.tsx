import React from 'react';
import { Spacing } from '~components/Spacing';
import { render } from '~utils/test-utils';

describe('Spacing Component', () => {
  it('matches snapshot', () => {
    const { toJSON } = render(<Spacing />);
    expect(toJSON()).toMatchSnapshot();
  });
});
