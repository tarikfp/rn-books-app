import React from 'react';
import { Text } from 'react-native';
import { AppScrollView } from '~components/ScrollView';
import { render } from '~utils/test-utils';

describe('AppScrollView', () => {
  it('renders correctly with default props', () => {
    const { toJSON } = render(
      <AppScrollView>
        <Text>Test Content</Text>
      </AppScrollView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
