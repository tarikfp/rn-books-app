import { useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~store/hooks';
import { setIsDarkTheme as _setIsDarkThemePersisted } from '~store/user-settings-slice';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from './combine-navigation-theme';

export function useSetupThemePreference() {
  const persistedIsDarkTheme = useAppSelector(
    (state) => state.userSettings.isDarkTheme,
  );
  const dispatch = useAppDispatch();

  const setIsDarkThemePersisted = useCallback(
    (isDarkTheme: boolean) => {
      dispatch(_setIsDarkThemePersisted(isDarkTheme));
    },
    [dispatch],
  );

  const [isDarkTheme, setIsDarkTheme] = useState(persistedIsDarkTheme);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = useCallback(() => {
    setIsDarkThemePersisted(!isDarkTheme);

    return setIsDarkTheme(!isDarkTheme);
  }, [isDarkTheme, setIsDarkThemePersisted]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isDarkTheme,
    }),
    [toggleTheme, isDarkTheme],
  );

  return {
    theme,
    toggleTheme: preferences.toggleTheme,
    isDarkTheme: preferences.isDarkTheme,
  };
}
