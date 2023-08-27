import { createTheme, useTheme } from '@shopify/restyle';
import { FONTS } from './fonts';
import { PALETTE } from './palette';

export { useThemePreference } from './useThemePreference';
export { darkTheme, theme };

const theme = createTheme({
  spacing: {
    xs: 4,
    s: 8,
    sm: 12,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: 768,
    largeTablet: 1024,
  },
  borderRadii: {
    s: 4,
    m: 8,
    l: 16,
    xl: 20,
    rounded: 999,
  },
  zIndices: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    20: 20,
    999: 999,
  },
  opacity: {
    0.1: 0.1,
    0.2: 0.2,
    0.3: 0.3,
    0.4: 0.4,
    0.5: 0.5,
    0.6: 0.6,
    0.7: 0.7,
    0.8: 0.8,
    0.9: 0.9,
    1: 1,
  },
  colors: {
    white: PALETTE.white,
    gold: PALETTE.gold,
    primary: PALETTE.primaryNormal,
    primaryDark: PALETTE.primaryDark,
    primaryLight: PALETTE.primaryLight,
    primaryBright: PALETTE.primaryBright,
    background: PALETTE.neutral100,
    paper: PALETTE.white,
    title: PALETTE.neutral900,
    icon: PALETTE.neutral900,
    badgeBackground: PALETTE.neutral200,
    borderLight: PALETTE.neutral200,
    paperBadgeBackground: PALETTE.neutral100,
    placeholder: PALETTE.neutral300,
    transparent: PALETTE.transparent,
    danger: PALETTE.redNormal,
    dangerLight: PALETTE.redBright,
    border: PALETTE.neutral200,
    bodyText: PALETTE.neutral900,
    bodyTextLight: PALETTE.neutral400,
    bodyTextDisabled: PALETTE.neutral300,
    chatActionTint: PALETTE.neutral600,
    tabbarIconDisabled: PALETTE.neutral300,
    tabbarIconActive: PALETTE.primaryNormal,
  },
  textVariants: FONTS,
  buttonVariants: {
    defaults: {
      height: 45,
      width: '100%',
      backgroundColor: 'primary',
      justifyContent: 'center',
      alignIte: 'center',
      borderRadius: 'm',
    },
    secondary: {
      backgroundColor: 'paper',
      borderWidth: 1,
      borderColor: 'border',
    },
    small: {
      height: 34,
      maxWidth: '20%',
      borderRadius: 'xl',
    },
    disabled: {
      opacity: 0.5,
    },
    rounded: {
      borderWidth: 1,
      borderRadius: 'rounded',
      borderColor: 'primary',
    },
    transparent: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'border',
    },
  },
  cardVariants: {
    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
    },
    regular: {
      // We can refer to other values in the theme here, and use responsive props
      padding: {
        phone: 's',
        tablet: 'm',
      },
    },
    elevated: {
      padding: {
        phone: 's',
        tablet: 'm',
      },
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 15,
      elevation: 5,
    },
  },
});

const DARK_THEME_COLORS = {
  primary: PALETTE.primaryNormal,
  paperBadgeBackground: PALETTE.neutral600,
  badgeBackground: PALETTE.neutral700,
  border: PALETTE.neutral700,
  background: PALETTE.neutral900,
  bodyText: PALETTE.white,
  icon: PALETTE.white,
  bodyTextLight: PALETTE.neutral400,
  bodyTextDisabled: PALETTE.neutral500,
  chatActionTint: PALETTE.neutral100,
  paper: PALETTE.neutral800,
  textDanger: PALETTE.redNormal,
};

const darkTheme = createTheme({
  ...theme,
  colors: {
    ...theme.colors,
    ...DARK_THEME_COLORS,
  },
});

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();
