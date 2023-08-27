import React from 'react';
import { Box } from '~components/Box';
import { render } from '~utils/test-utils';

describe('Box Component', () => {
  it('matches snapshot', () => {
    const { toJSON } = render(<Box />);
    expect(toJSON()).toMatchSnapshot();
  });
});
