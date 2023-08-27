import { ThemeProvider } from '@shopify/restyle';
import { render, RenderOptions } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { theme } from '~theme/core';
import { ThemePreferenceContext } from '~theme/useThemePreference';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemePreferenceContext.Provider
      value={{
        isDarkTheme: false,
        toggleTheme: () => {},
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemePreferenceContext.Provider>
  );
};

const withAllTheProviders = (ui: React.ReactNode) => (
  <AllTheProviders children={ui} />
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const customRenderer = (ui: React.ReactElement) =>
  renderer.create(withAllTheProviders(ui));

// re-export everything
export * from '@testing-library/react-native';
// override render method
export { customRender as render };
// override renderer method
export { customRenderer as createRenderer };
