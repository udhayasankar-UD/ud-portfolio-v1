
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      className="fixed top-6 right-8 z-50 neu-btn p-2 flex items-center justify-center transition-all"
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
