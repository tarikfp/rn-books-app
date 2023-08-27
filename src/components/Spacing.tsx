import { createBox } from '@shopify/restyle';
import * as React from 'react';
import { AppTheme } from '~theme/core';

const Box = createBox<AppTheme>();
type Props = React.ComponentProps<typeof Box>;

export const Spacing: React.FC<Props> = (props) => {
  return <Box {...props} />;
};
