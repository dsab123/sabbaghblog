import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import '../styles/main.css';
import '../styles/prism-a11y-dark.css';

import { ThemeProvider } from '../themes/ThemeProvider';
import {
  DEFAULT_THEME,
  isThemeName,
  parseThemeFromCookieHeader,
  THEME_COOKIE,
  ThemeName,
} from '../themes/themes';

type MyAppProps = AppProps & { initialTheme: ThemeName };

function readThemeFromDocumentCookie(): ThemeName {
  if (typeof document === 'undefined') return DEFAULT_THEME;
  const match = document.cookie
    .split(';')
    .map((s) => s.trim())
    .find((c) => c.startsWith(`${THEME_COOKIE}=`));
  if (!match) return DEFAULT_THEME;
  const value = decodeURIComponent(match.slice(THEME_COOKIE.length + 1));
  return isThemeName(value) ? value : DEFAULT_THEME;
}

const MyApp = ({ Component, pageProps, initialTheme }: MyAppProps) => {
  const router = useRouter();
  const theme =
    typeof initialTheme === 'string' && isThemeName(initialTheme)
      ? initialTheme
      : readThemeFromDocumentCookie();

  return (
    <ThemeProvider initialTheme={theme}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.asPath}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const cookieHeader = appContext.ctx.req?.headers?.cookie;
  const initialTheme = cookieHeader
    ? parseThemeFromCookieHeader(cookieHeader)
    : DEFAULT_THEME;
  return { ...appProps, initialTheme };
};

export default MyApp;
