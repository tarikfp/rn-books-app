import React from 'react';
import { Text } from 'react-native';
import { render } from '~utils/test-utils';
import { ScreenView } from '../ScreenView';

describe('ScreenView', () => {
  it('renders correctly with default props', () => {
    const { toJSON } = render(
      <ScreenView>
        <Text>Test Content</Text>
      </ScreenView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with custom background color', () => {
    const { toJSON } = render(
      <ScreenView backgroundColor="primary">
        <Text>Test Content</Text>
      </ScreenView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with safe area enabled', () => {
    const { toJSON } = render(
      <ScreenView withSafeArea>
        <Text>Test Content</Text>
      </ScreenView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with status bar enabled', () => {
    const { toJSON } = render(
      <ScreenView withStatusBar>
        <Text>Test Content</Text>
      </ScreenView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with touchable without feedback enabled', () => {
    const { toJSON } = render(
      <ScreenView withTouchableWithoutFeedback>
        <Text>Test Content</Text>
      </ScreenView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with scroll view enabled', () => {
    const { toJSON } = render(
      <ScreenView withScrollView>
        <Text>Test Content</Text>
      </ScreenView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with custom padding', () => {
    const { toJSON } = render(
      <ScreenView padding="l">
        <Text>Test Content</Text>
      </ScreenView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with all custom props enabled', () => {
    const { toJSON } = render(
      <ScreenView
        backgroundColor="primary"
        withSafeArea
        withStatusBar
        withTouchableWithoutFeedback
        withScrollView
        padding="l"
      >
        <Text>Test Content</Text>
      </ScreenView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with shouldDismissKeyboardOnPressOutside prop', () => {
    const { toJSON } = render(
      <ScreenView shouldDismissKeyboardOnPressOutside>
        <Text>Test Content</Text>
      </ScreenView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with disableHorizontalPadding prop', () => {
    const { toJSON } = render(
      <ScreenView disableHorizontalPadding>
        <Text>Test Content</Text>
      </ScreenView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with disableVerticalPadding prop', () => {
    const { toJSON } = render(
      <ScreenView disableVerticalPadding>
        <Text>Test Content</Text>
      </ScreenView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with all custom props and edge cases', () => {
    const { toJSON } = render(
      <ScreenView
        backgroundColor="primary"
        withSafeArea
        withStatusBar
        withTouchableWithoutFeedback
        withScrollView
        padding="l"
        shouldDismissKeyboardOnPressOutside
        disableHorizontalPadding
        disableVerticalPadding
      >
        <Text>Test Content</Text>
      </ScreenView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with all props disabled', () => {
    const { toJSON } = render(
      <ScreenView>
        <Text>Test Content</Text>
      </ScreenView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
