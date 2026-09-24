export const THEME_STORAGE_KEY = "portfolio-theme";
export const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";
export const THEME_TRANSITION_DURATION_MS = 440;

export type Theme = "light" | "dark";
export type ThemePreference = Theme | "system";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "system" || isTheme(value);
}

export function resolveThemePreference(
  preference: ThemePreference,
  systemTheme: Theme
): Theme {
  return preference === "system" ? systemTheme : preference;
}

export function getNextThemePreference(
  preference: ThemePreference
): ThemePreference {
  if (preference === "system") return "light";
  if (preference === "light") return "dark";
  return "system";
}

export const themeBootstrapScript = `(() => {
  const storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
  const systemThemeQuery = ${JSON.stringify(SYSTEM_THEME_QUERY)};
  let storedTheme = null;

  try {
    storedTheme = window.localStorage.getItem(storageKey);
  } catch (error) {
    storedTheme = null;
  }

  const systemTheme = window.matchMedia(systemThemeQuery).matches
    ? "dark"
    : "light";
  const hasStoredTheme =
    storedTheme === "system" ||
    storedTheme === "light" ||
    storedTheme === "dark";
  const theme = hasStoredTheme && storedTheme !== "system"
    ? storedTheme
    : systemTheme;

  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themeSource =
    hasStoredTheme && storedTheme !== "system" ? "stored" : "system";
})();`;
