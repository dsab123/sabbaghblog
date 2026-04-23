export type ThemeName = 'default' | 'syntax' | 'suave';

export const THEME_COOKIE = 'sb_theme';
export const DEFAULT_THEME: ThemeName = 'default';

export type ThemeMeta = {
  id: ThemeName;
  label: string;
  description: string;
  swatch: string;
};

export const THEMES: ThemeMeta[] = [
  {
    id: 'default',
    label: 'Default',
    description: 'The original, clean and understated.',
    swatch: '#2b6cb0',
  },
  {
    id: 'syntax',
    label: 'Syntax',
    description: 'Neon, loud, unhinged.',
    swatch: '#ff3ea5',
  },
  {
    id: 'suave',
    label: 'Suave',
    description: 'Warm paper, serifs, bronze.',
    swatch: '#8b6f3f',
  },
];

export function isThemeName(value: unknown): value is ThemeName {
  return value === 'default' || value === 'syntax' || value === 'suave';
}

export function parseThemeFromCookieHeader(
  cookieHeader: string | undefined | null,
): ThemeName {
  if (!cookieHeader) return DEFAULT_THEME;
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const [rawName, ...rawValue] = part.trim().split('=');
    if (rawName === THEME_COOKIE) {
      const value = decodeURIComponent(rawValue.join('='));
      if (isThemeName(value)) return value;
    }
  }
  return DEFAULT_THEME;
}
