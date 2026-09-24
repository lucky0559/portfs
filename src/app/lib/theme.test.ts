import { describe, expect, it } from "vitest";
import {
  getNextThemePreference,
  isThemePreference,
  resolveThemePreference,
  isTheme,
  themeBootstrapScript
} from "./theme";

describe("theme preferences", () => {
  it("resolves system to the current operating system theme", () => {
    expect(resolveThemePreference("system", "dark")).toBe("dark");
    expect(resolveThemePreference("system", "light")).toBe("light");
  });

  it("preserves explicit light and dark preferences", () => {
    expect(resolveThemePreference("light", "dark")).toBe("light");
    expect(resolveThemePreference("dark", "light")).toBe("dark");
  });

  it("cycles from system to light to dark and back to system", () => {
    expect(getNextThemePreference("system")).toBe("light");
    expect(getNextThemePreference("light")).toBe("dark");
    expect(getNextThemePreference("dark")).toBe("system");
  });
});

describe("isTheme", () => {
  it("accepts only supported theme names", () => {
    expect(isTheme("light")).toBe(true);
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("system")).toBe(false);
    expect(isTheme(null)).toBe(false);
  });

  it("accepts system alongside explicit theme names", () => {
    expect(isThemePreference("system")).toBe(true);
    expect(isThemePreference("light")).toBe(true);
    expect(isThemePreference("dark")).toBe(true);
    expect(isThemePreference("time")).toBe(false);
  });
});

describe("themeBootstrapScript", () => {
  const runBootstrap = (systemPrefersDark: boolean, storedTheme: string | null) => {
    const dataset: Record<string, string> = {};
    const windowStub = {
      localStorage: {
        getItem: () => storedTheme
      },
      matchMedia: (_query: string) => ({ matches: systemPrefersDark })
    };
    const documentStub = {
      documentElement: { dataset }
    };

    const bootstrap = new Function(
      "window",
      "document",
      themeBootstrapScript
    );
    bootstrap(windowStub, documentStub);
    return dataset;
  };

  it("uses the system dark preference before hydration", () => {
    expect(runBootstrap(true, null)).toEqual({
      theme: "dark",
      themeSource: "system"
    });
  });

  it("uses the system light preference before hydration", () => {
    expect(runBootstrap(false, null)).toEqual({
      theme: "light",
      themeSource: "system"
    });
  });

  it("gives a valid stored preference precedence over the system theme", () => {
    expect(runBootstrap(true, "light")).toEqual({
      theme: "light",
      themeSource: "stored"
    });
  });

  it("lets a stored system preference follow the system theme", () => {
    expect(runBootstrap(false, "system")).toEqual({
      theme: "light",
      themeSource: "system"
    });
  });

  it("ignores unsupported stored values and uses the system theme", () => {
    expect(runBootstrap(true, "time")).toEqual({
      theme: "dark",
      themeSource: "system"
    });
  });
});
