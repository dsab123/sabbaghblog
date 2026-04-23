import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  DEFAULT_THEME,
  isThemeName,
  THEME_COOKIE,
  ThemeName,
} from './themes';

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (next: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function writeCookie(name: string, value: string) {
  if (typeof document === 'undefined') return;
  const secure =
    typeof window !== 'undefined' && window.location.protocol === 'https:'
      ? '; Secure'
      : '';
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax${secure}`;
}

type ThemeProviderProps = {
  initialTheme: ThemeName;
  children: ReactNode;
};

export const ThemeProvider = ({
  initialTheme,
  children,
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<ThemeName>(initialTheme);

  // Keep the <html data-theme> attribute in sync client-side on hydration
  // and on any change. The server already wrote the correct attribute so
  // there is no flash on first paint.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    if (current !== theme) {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const setTheme = useCallback((next: ThemeName) => {
    if (!isThemeName(next)) return;
    setThemeState(next);
    writeCookie(THEME_COOKIE, next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
