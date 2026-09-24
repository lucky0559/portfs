"use client";

import { useEffect, useRef, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import {
  getNextThemePreference,
  isTheme,
  isThemePreference,
  resolveThemePreference,
  SYSTEM_THEME_QUERY,
  THEME_STORAGE_KEY,
  THEME_TRANSITION_DURATION_MS,
  type Theme,
  type ThemePreference
} from "@/lib/theme";

let themeTransitionTimer: number | undefined;

const THEME_PREFERENCE_LABELS: Record<ThemePreference, string> = {
  system: "System",
  light: "Light",
  dark: "Dark"
};

function applyTheme(theme: Theme, source: "stored" | "system") {
  const root = document.documentElement;
  const shouldAnimate =
    isTheme(root.dataset.theme) &&
    root.dataset.theme !== theme &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.clearTimeout(themeTransitionTimer);

  if (shouldAnimate) {
    root.classList.add("theme-is-changing");
    void root.offsetWidth;
  } else {
    root.classList.remove("theme-is-changing");
  }

  root.dataset.theme = theme;
  root.dataset.themeSource = source;

  if (shouldAnimate) {
    themeTransitionTimer = window.setTimeout(() => {
      root.classList.remove("theme-is-changing");
    }, THEME_TRANSITION_DURATION_MS);
  }
}

const ThemeToggle = () => {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const preferenceRef = useRef<ThemePreference>("system");

  useEffect(() => {
    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY);

    const readStoredPreference = (): ThemePreference => {
      try {
        const storedPreference = window.localStorage.getItem(THEME_STORAGE_KEY);
        return isThemePreference(storedPreference) ? storedPreference : "system";
      } catch {
        return "system";
      }
    };

    const applyPreference = (nextPreference: ThemePreference) => {
      const nextTheme = resolveThemePreference(
        nextPreference,
        mediaQuery.matches ? "dark" : "light"
      );

      preferenceRef.current = nextPreference;
      applyTheme(nextTheme, nextPreference === "system" ? "system" : "stored");
      setPreference(nextPreference);
    };

    applyPreference(readStoredPreference());

    const handleSystemThemeChange = () => {
      if (preferenceRef.current !== "system") return;
      applyPreference("system");
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;

      applyPreference(
        isThemePreference(event.newValue) ? event.newValue : "system"
      );
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
    } else {
      mediaQuery.addListener(handleSystemThemeChange);
    }
    window.addEventListener("storage", handleStorage);

    return () => {
      window.clearTimeout(themeTransitionTimer);
      document.documentElement.classList.remove("theme-is-changing");
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const nextPreference = getNextThemePreference(preference);
  const preferenceLabel = THEME_PREFERENCE_LABELS[preference];
  const nextPreferenceLabel = THEME_PREFERENCE_LABELS[nextPreference];

  const handleToggle = () => {
    const nextTheme = resolveThemePreference(
      nextPreference,
      window.matchMedia(SYSTEM_THEME_QUERY).matches ? "dark" : "light"
    );

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextPreference);
    } catch {
      // The toggle still works when storage is unavailable.
    }

    preferenceRef.current = nextPreference;
    applyTheme(
      nextTheme,
      nextPreference === "system" ? "system" : "stored"
    );
    setPreference(nextPreference);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      data-theme-preference={preference}
      aria-label={`Theme: ${preferenceLabel}. Switch to ${nextPreferenceLabel} theme`}
      title={`Theme: ${preferenceLabel}. Switch to ${nextPreferenceLabel} theme`}
      onClick={handleToggle}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <FaSun className="theme-toggle__sun" />
        <FaMoon className="theme-toggle__moon" />
        <span className="theme-toggle__thumb" />
      </span>
      <span className="theme-toggle__label">{preferenceLabel}</span>
    </button>
  );
};

export default ThemeToggle;
