'use client';

import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onThemeChange: (isDark: boolean) => void;
}

export function ThemeToggle({ isDark, onThemeChange }: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onThemeChange(!isDark)}
      className="flex items-center gap-2 text-[#4F97FF] hover:text-[#1ABC9C] transition-all duration-300 hover-scale p-2 rounded-lg hover:bg-[#4F97FF]/10"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}