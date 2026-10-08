"use client";

import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/lib/theme";

export function ThemeToggle() {
  return (
    <button type="button" onClick={toggleTheme} className="icon-btn" aria-label="Toggle light and dark theme">
      <Sun className="h-4 w-4 [.light_&]:hidden" aria-hidden="true" />
      <Moon className="hidden h-4 w-4 [.light_&]:block" aria-hidden="true" />
    </button>
  );
}
