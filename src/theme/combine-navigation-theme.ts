import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import {
  darkTheme as CustomizedDarkTheme,
  theme as CustomizedDefaultTheme,
} from './core';

export const CombinedDefaultTheme = merge(
  NavigationDefaultTheme,
  CustomizedDefaultTheme,
);

export const CombinedDarkTheme = merge(
  NavigationDarkTheme,
  CustomizedDarkTheme,
);
