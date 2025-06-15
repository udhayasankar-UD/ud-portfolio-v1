
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Helper to get initial theme
function getInitialTheme() {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("theme");
  if (stored === "light") return false;
  if (stored === "dark") return true;
  // System preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function DarkModeToggle() {
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Listen system change (optional)
  useEffect(() => {
    function onSysTheme(e: MediaQueryListEvent) {
      if (!localStorage.getItem("theme")) setDark(e.matches);
    }
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", onSysTheme);
    return () =>
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", onSysTheme);
  }, []);

  return (
    <button
      className="fixed top-3 right-4 z-50 neu-btn p-2 flex items-center justify-center transition-all
       bg-white/70 dark:bg-gray-900/80 text-gray-900 dark:text-blue-glow shadow-neu
       md:top-6 md:right-8"
      aria-label="Toggle dark mode"
      onClick={() => setDark((d) => !d)}
    >
      {dark ? (
        <Sun className="h-6 w-6 text-blue-glow animate-fade-in-up" />
      ) : (
        <Moon className="h-6 w-6 text-gray-900 animate-fade-in-up" />
      )}
    </button>
  );
}
