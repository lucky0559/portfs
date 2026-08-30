export const THEME_STORAGE_KEY = "portfolio-theme";
export const DAY_THEME_START_HOUR = 7;
export const DAY_THEME_END_HOUR = 19;
export const THEME_TRANSITION_DURATION_MS = 440;

export type Theme = "light" | "dark";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function getTimeBasedTheme(date = new Date()): Theme {
  const hour = date.getHours();
  return hour >= DAY_THEME_START_HOUR && hour < DAY_THEME_END_HOUR
    ? "light"
    : "dark";
}

export function getNextThemeTransition(date = new Date()): Date {
  const next = new Date(date);
  const hour = date.getHours();

  if (hour < DAY_THEME_START_HOUR) {
    next.setHours(DAY_THEME_START_HOUR, 0, 0, 0);
    return next;
  }

  if (hour < DAY_THEME_END_HOUR) {
    next.setHours(DAY_THEME_END_HOUR, 0, 0, 0);
    return next;
  }

  next.setDate(next.getDate() + 1);
  next.setHours(DAY_THEME_START_HOUR, 0, 0, 0);
  return next;
}

export const themeBootstrapScript = `(() => {
  const storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
  const dayStart = ${DAY_THEME_START_HOUR};
  const dayEnd = ${DAY_THEME_END_HOUR};
  let storedTheme = null;

  try {
    storedTheme = window.localStorage.getItem(storageKey);
  } catch (error) {
    storedTheme = null;
  }

  const hour = new Date().getHours();
  const timeTheme = hour >= dayStart && hour < dayEnd ? "light" : "dark";
  const hasStoredTheme = storedTheme === "light" || storedTheme === "dark";
  const theme = hasStoredTheme ? storedTheme : timeTheme;

  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themeSource = hasStoredTheme ? "stored" : "time";
})();`;
