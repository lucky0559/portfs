import { describe, expect, it } from "vitest";
import {
  getNextThemeTransition,
  getTimeBasedTheme,
  isTheme,
  themeBootstrapScript
} from "./theme";

const localDate = (hour: number, minute = 0) =>
  new Date(2026, 7, 30, hour, minute, 0, 0);

describe("getTimeBasedTheme", () => {
  it("uses dark mode before 07:00", () => {
    expect(getTimeBasedTheme(localDate(6, 59))).toBe("dark");
  });

  it("uses light mode from 07:00 through 18:59", () => {
    expect(getTimeBasedTheme(localDate(7))).toBe("light");
    expect(getTimeBasedTheme(localDate(18, 59))).toBe("light");
  });

  it("uses dark mode from 19:00", () => {
    expect(getTimeBasedTheme(localDate(19))).toBe("dark");
  });
});

describe("getNextThemeTransition", () => {
  it("targets the same-day morning boundary overnight", () => {
    expect(getNextThemeTransition(localDate(2))).toEqual(localDate(7));
  });

  it("targets the same-day evening boundary during daytime", () => {
    expect(getNextThemeTransition(localDate(12))).toEqual(localDate(19));
  });

  it("targets the next morning after the evening boundary", () => {
    expect(getNextThemeTransition(localDate(22))).toEqual(
      new Date(2026, 7, 31, 7, 0, 0, 0)
    );
  });
});

describe("isTheme", () => {
  it("accepts only supported theme names", () => {
    expect(isTheme("light")).toBe(true);
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("system")).toBe(false);
    expect(isTheme(null)).toBe(false);
  });
});

describe("themeBootstrapScript", () => {
  const runBootstrap = (hour: number, storedTheme: string | null) => {
    const dataset: Record<string, string> = {};
    const windowStub = {
      localStorage: {
        getItem: () => storedTheme
      }
    };
    const documentStub = {
      documentElement: { dataset }
    };
    class DateStub extends Date {
      constructor() {
        super(2026, 7, 30, hour, 0, 0, 0);
      }
    }

    const bootstrap = new Function(
      "window",
      "document",
      "Date",
      themeBootstrapScript
    );
    bootstrap(windowStub, documentStub, DateStub);
    return dataset;
  };

  it("sets the daytime default before hydration", () => {
    expect(runBootstrap(12, null)).toEqual({
      theme: "light",
      themeSource: "time"
    });
  });

  it("sets the overnight default before hydration", () => {
    expect(runBootstrap(22, null)).toEqual({
      theme: "dark",
      themeSource: "time"
    });
  });

  it("gives a valid stored preference precedence over local time", () => {
    expect(runBootstrap(12, "dark")).toEqual({
      theme: "dark",
      themeSource: "stored"
    });
  });

  it("ignores unsupported stored values", () => {
    expect(runBootstrap(22, "system")).toEqual({
      theme: "dark",
      themeSource: "time"
    });
  });
});
