import React from 'react';
import {
  BorderlessBounceButton,
  NativeBorderlessButton,
} from '~components/Button';
import { fireEvent, render } from '~utils/test-utils';

describe('NativeBorderlessButton Component', () => {
  it('matches snapshot with default props', () => {
    const { toJSON } = render(<NativeBorderlessButton label="Button Label" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot when disabled', () => {
    const { toJSON } = render(
      <NativeBorderlessButton label="Button Label" enabled={false} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('triggers onPress mock when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <NativeBorderlessButton
        testID="button"
        label="Button Label"
        onPress={onPressMock}
      />,
    );

    fireEvent.press(getByTestId('button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('triggers onPress mock when pressed and not disabled', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <NativeBorderlessButton
        testID="button"
        label="Button Label"
        onPress={onPressMock}
      />,
    );

    fireEvent.press(getByTestId('button'));
    expect(onPressMock).toHaveBeenCalled();
  });
});

describe('BorderlessBounceButton Component', () => {
  it('matches snapshot with default props', () => {
    const { toJSON } = render(
      <BorderlessBounceButton>
        <NativeBorderlessButton label="Button Label" />
      </BorderlessBounceButton>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot with custom bounceValue', () => {
    const { toJSON } = render(
      <BorderlessBounceButton bounceValue={0.8}>
        <NativeBorderlessButton label="Button Label" />
      </BorderlessBounceButton>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  const onPressMock = jest.fn();

  const { getByTestId } = render(
    <BorderlessBounceButton onPress={onPressMock}>
      <NativeBorderlessButton testID="button" label="Button Label" />
    </BorderlessBounceButton>,
  );

  fireEvent.press(getByTestId('button'));

  expect(onPressMock).toHaveBeenCalled();
});
