"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import {
  getNextThemeTransition,
  getTimeBasedTheme,
  isTheme,
  THEME_STORAGE_KEY,
  THEME_TRANSITION_DURATION_MS,
  type Theme
} from "@/lib/theme";

let themeTransitionTimer: number | undefined;

function applyTheme(theme: Theme, source: "stored" | "time") {
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
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme;
    const resolvedTheme = isTheme(currentTheme)
      ? currentTheme
      : getTimeBasedTheme();

    applyTheme(
      resolvedTheme,
      document.documentElement.dataset.themeSource === "stored"
        ? "stored"
        : "time"
    );
    setTheme(resolvedTheme);

    let transitionTimer: number | undefined;

    const scheduleTimeTheme = () => {
      window.clearTimeout(transitionTimer);

      let storedTheme: string | null = null;
      try {
        storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      } catch (error) {
        storedTheme = null;
      }

      if (isTheme(storedTheme)) return;

      const nextTransition = getNextThemeTransition();
      const delay = Math.max(nextTransition.getTime() - Date.now(), 1_000);

      transitionTimer = window.setTimeout(() => {
        const nextTheme = getTimeBasedTheme();
        applyTheme(nextTheme, "time");
        setTheme(nextTheme);
        scheduleTimeTheme();
      }, delay);
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;

      const nextTheme = isTheme(event.newValue)
        ? event.newValue
        : getTimeBasedTheme();
      applyTheme(nextTheme, isTheme(event.newValue) ? "stored" : "time");
      setTheme(nextTheme);
      scheduleTimeTheme();
    };

    scheduleTimeTheme();
    window.addEventListener("storage", handleStorage);

    return () => {
      window.clearTimeout(transitionTimer);
      window.clearTimeout(themeTransitionTimer);
      document.documentElement.classList.remove("theme-is-changing");
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const isLight = theme === "light";
  const nextTheme: Theme = isLight ? "dark" : "light";

  const handleToggle = () => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
      // The toggle still works when storage is unavailable.
    }

    applyTheme(nextTheme, "stored");
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      onClick={handleToggle}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <FaSun className="theme-toggle__sun" />
        <FaMoon className="theme-toggle__moon" />
        <span className="theme-toggle__thumb" />
      </span>
      <span className="theme-toggle__label theme-toggle__label--light">Light</span>
      <span className="theme-toggle__label theme-toggle__label--dark">Dark</span>
    </button>
  );
};

export default ThemeToggle;
