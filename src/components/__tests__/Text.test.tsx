import React from 'react';
import { AppText } from '~components/Text';
import { render } from '~utils/test-utils';

describe('AppText', () => {
  it('renders correctly with default props', () => {
    const { toJSON } = render(<AppText>Test Text</AppText>);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders children text correctly', () => {
    const { getByText } = render(<AppText>Test Text</AppText>);
    const textElement = getByText('Test Text');
    expect(textElement).toBeTruthy();
  });
});
