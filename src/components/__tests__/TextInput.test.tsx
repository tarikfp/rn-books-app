import React from 'react';
import { AppTextInput } from '~components/TextInput';
import { render } from '~utils/test-utils';

describe('AppTextInput', () => {
  it('displays the start icon when provided', () => {
    const { getByTestId } = render(
      <AppTextInput startIconName="eye" startIconWrapperTestID="start-icon" />,
    );
    const startIcon = getByTestId('start-icon');
    expect(startIcon).toBeTruthy();
  });

  it('displays the end icon when provided', () => {
    const { getByTestId } = render(
      <AppTextInput endIconName="eye" endIconWrapperTestID="end-icon" />,
    );
    const endIcon = getByTestId('end-icon');
    expect(endIcon).toBeTruthy();
  });

  it('displays both start and end icons when provided', () => {
    const { getByTestId } = render(
      <AppTextInput
        startIconName="eye"
        endIconName="eye"
        startIconWrapperTestID="start-icon"
        endIconWrapperTestID="end-icon"
      />,
    );
    const startIcon = getByTestId('start-icon');
    const endIcon = getByTestId('end-icon');
    expect(startIcon).toBeTruthy();
    expect(endIcon).toBeTruthy();
  });
});
