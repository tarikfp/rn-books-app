import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import { ErrorBoundary } from 'react-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { logBoundaryError } from '~lib/error/log-error';
import { BookStackNavigator } from '~navigation/BookStack';
import { FallbackScreen } from '~screens/FallbackScreen';
import { useSetupThemePreference } from '~theme/useSetupThemePreference';
import { persistor, store } from './store/configure-store';
import { s } from './theme/common-styles';
import { ThemePreferenceContext } from './theme/useThemePreference';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InnerApp />
      </PersistGate>
    </ReduxProvider>
  );
}

function InnerApp() {
  const { theme, ...preferences } = useSetupThemePreference();

  return (
    <ThemePreferenceContext.Provider value={preferences}>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView style={s.flex()}>
          <NavigationContainer theme={theme}>
            <SafeAreaProvider>
              <ErrorBoundary
                FallbackComponent={FallbackScreen}
                onError={logBoundaryError}
              >
                <BookStackNavigator />
              </ErrorBoundary>
            </SafeAreaProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </ThemeProvider>
    </ThemePreferenceContext.Provider>
  );
}
