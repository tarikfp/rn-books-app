import { createText } from '@shopify/restyle';
import React from 'react';
import { AppTheme } from '~theme/core';

const Text = createText<AppTheme>();

type TextProps = React.ComponentProps<typeof Text>;

const AppTextInner: React.ForwardRefRenderFunction<
  React.ComponentProps<typeof Text>['ref'],
  React.PropsWithChildren<TextProps>
> = ({ children, ...props }, ref) => {
  return (
    <Text ref={ref} {...props}>
      {children}
    </Text>
  );
};

export const AppText = React.forwardRef(AppTextInner);
