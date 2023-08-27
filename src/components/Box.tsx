import { createBox } from '@shopify/restyle';
import * as React from 'react';
import { AppTheme } from '~theme/core';

const ThemedBox = createBox<AppTheme>();
type BoxProps = React.ComponentProps<typeof ThemedBox>;
export const Box: React.FC<BoxProps> = (props) => {
  return <ThemedBox {...props} />;
};
