import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { AppTheme } from '~theme/core';

type NativeNavigatorParams<T extends ParamListBase> = React.ComponentProps<
  ReturnType<typeof createNativeStackNavigator<T>>['Navigator']
>;

export const getCommonNativeStackNavigatorOptions = <T extends ParamListBase>({
  colors,
  textVariants,
}: AppTheme): NativeNavigatorParams<T>['screenOptions'] => ({
  headerShown: true,
  headerBackButtonMenuEnabled: true,
  headerTintColor: Platform.select({
    android: colors.bodyText,
    ios: colors.bodyText,
  }),
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerTitleStyle: {
    ...textVariants.title3,
    color: colors.bodyText,
  },
});
