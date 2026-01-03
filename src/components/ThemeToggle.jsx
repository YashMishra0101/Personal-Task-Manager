import React from "react";
import { useTasks } from "../context/TaskContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTasks();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary text-primary transition-all hover:scale-110 active:scale-95"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
