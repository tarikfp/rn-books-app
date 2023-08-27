import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SearchBookResultScreen,
  SearchBookScreen,
  SearchResultDetailScreen,
} from '~screens/SearchBook';
import { useAppTheme } from '~theme/core';
import { RouteNames } from './RouteNames';
import { getCommonNativeStackNavigatorOptions } from './helpers';
import { BookStackParamList } from './types';

const BookStack = createNativeStackNavigator<BookStackParamList>();

const bookStackRoutes: Array<React.ComponentProps<typeof BookStack.Screen>> = [
  {
    name: RouteNames.SearchBook,
    component: SearchBookScreen as React.ComponentType,
    options: {
      headerTitle: 'Search book',
    },
  },
  {
    name: RouteNames.SearchBookResult,
    component: SearchBookResultScreen as React.ComponentType,
    options: {
      headerTitle: 'Search results',
    },
  },
  {
    name: RouteNames.SearchResultDetail,
    component: SearchResultDetailScreen as React.ComponentType,
    options: {
      presentation: 'card',
      animation: 'slide_from_bottom',
    },
  },
];

export const BookStackNavigator: React.FC = () => {
  const theme = useAppTheme();

  return (
    <BookStack.Navigator
      initialRouteName={RouteNames.SearchBook}
      screenOptions={getCommonNativeStackNavigatorOptions<BookStackParamList>(
        theme,
      )}
    >
      {bookStackRoutes.map((routeConfig) => (
        <BookStack.Screen key={routeConfig.name} {...routeConfig} />
      ))}
    </BookStack.Navigator>
  );
};
