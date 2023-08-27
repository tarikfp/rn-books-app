import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { InfiniteList } from '~components/InfiniteList';
import { render } from '~utils/test-utils';

const renderItem = ({ item }: { item: { key: string; name: string } }) => (
  <Text>{item.name}</Text>
);

describe('InfiniteList', () => {
  const mockData = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
  ];

  it('renders empty list message when data is empty', () => {
    const { getByText } = render(
      <InfiniteList
        isLoading={false}
        isFetching={false}
        hasNextPage={true}
        listEmptyText="No items found"
        trigger={() => {}}
        data={[]}
        renderItem={renderItem}
      />,
    );

    expect(getByText('No items found')).toBeTruthy();
  });

  it('renders items correctly', () => {
    const { getByText } = render(
      <InfiniteList
        isLoading={false}
        isFetching={false}
        hasNextPage={true}
        listEmptyText="No items found"
        renderItem={renderItem}
        trigger={() => {}}
        data={mockData}
      />,
    );

    mockData.forEach((item) => {
      expect(getByText(item.name)).toBeTruthy();
    });
  });

  it('renders load more button when hasNextPage is true', () => {
    const triggerMock = jest.fn();
    const { getByTestId } = render(
      <InfiniteList
        isLoading={false}
        isFetching={false}
        hasNextPage={true}
        listEmptyText="No items found"
        trigger={triggerMock}
        renderItem={renderItem}
        data={mockData}
      />,
    );

    const loadMoreButton = getByTestId('load-more-button');
    fireEvent.press(loadMoreButton);

    expect(triggerMock).toHaveBeenCalled();
  });

  it('does not render load more button when hasNextPage is false', () => {
    const { queryByTestId } = render(
      <InfiniteList
        isLoading={false}
        renderItem={renderItem}
        isFetching={false}
        hasNextPage={false}
        listEmptyText="No items found"
        trigger={() => {}}
        data={mockData}
      />,
    );

    const loadMoreButton = queryByTestId('load-more-button');
    expect(loadMoreButton).toBeNull();
  });
});
