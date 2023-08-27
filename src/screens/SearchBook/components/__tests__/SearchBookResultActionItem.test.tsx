import { fireEvent } from '@testing-library/react-native';
import { createRenderer, render } from '~utils/test-utils';
import { SearchBookResultActionItem } from '../SearchBookResultActionItem';

describe('SearchBookResultActionItem', () => {
  it('renders correctly with badge', () => {
    const tree = createRenderer(
      <SearchBookResultActionItem
        iconName="bookmark"
        iconColor="blue"
        onPress={() => {}}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly without badge', () => {
    const tree = createRenderer(
      <SearchBookResultActionItem
        iconName="bookmark"
        iconColor="blue"
        withBadge={false}
        onPress={() => {}}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <SearchBookResultActionItem
        iconName="bookmark"
        iconColor="blue"
        onPress={onPressMock}
      />,
    );

    const button = getByTestId('SearchBookResultActionItemButton');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });
});
