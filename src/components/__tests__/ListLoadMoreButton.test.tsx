import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { ListLoadMoreButton } from '~components/ListLoadMoreButton';
import { render } from '~utils/test-utils';

describe('ListLoadMoreButton Component', () => {
  it('matches snapshot', () => {
    const onPressMock = jest.fn();
    const { toJSON } = render(<ListLoadMoreButton onPress={onPressMock} />);

    expect(toJSON()).toMatchSnapshot();
  });
  it('triggers onPress mock when clicked', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <ListLoadMoreButton
        testID="list-load-more-button"
        onPress={onPressMock}
      />,
    );

    const button = getByTestId('list-load-more-button');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });
});
