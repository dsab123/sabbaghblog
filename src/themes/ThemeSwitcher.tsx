import { useEffect, useRef, useState } from 'react';

import { useTheme } from './ThemeProvider';
import { THEMES, ThemeName } from './themes';

const ChevronUpDown = () => (
  <svg
    className="themeSwitcherChevron"
    width="14"
    height="14"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden
  >
    <path
      d="M7 8l3-3 3 3M7 12l3 3 3-3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Check = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden
  >
    <path
      d="M5 10.5l3 3 7-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const active = THEMES.find((t) => t.id === theme) ?? THEMES[0]!;

  const pick = (next: ThemeName) => {
    setTheme(next);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="themeSwitcher">
      <button
        type="button"
        className="themeSwitcherButton"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Theme: ${active.label}. Click to change.`}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className="themeSwatch"
          style={{ background: active.swatch }}
          aria-hidden
        />
        <span className="themeSwitcherLabel">{active.label}</span>
        <ChevronUpDown />
      </button>

      {open && (
        <div className="themeSwitcherMenu" role="listbox">
          {THEMES.map((t) => {
            const isActive = t.id === theme;
            return (
              <button
                key={t.id}
                type="button"
                role="option"
                className="themeSwitcherOption"
                aria-current={isActive}
                aria-selected={isActive}
                onClick={() => pick(t.id)}
              >
                <span className="themeSwitcherOptionMain">
                  <span
                    className="themeSwatch"
                    style={{ background: t.swatch }}
                    aria-hidden
                  />
                  <span className="themeSwitcherOptionText">
                    <span className="themeSwitcherOptionLabel">{t.label}</span>
                    <span className="themeSwitcherOptionDesc">
                      {t.description}
                    </span>
                  </span>
                </span>
                <span className="themeSwitcherCheck" aria-hidden>
                  {isActive && <Check />}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
