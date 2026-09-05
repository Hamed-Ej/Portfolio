'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // effect-free swap: CSS handles show/hide to avoid mounted placeholder flash
  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      title={mounted ? `Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode` : 'Toggle theme'}
      className="inline-flex items-center justify-center h-7 px-2 text-[11px] tracking-widest uppercase border border-gray-200 dark:border-transparent bg-background text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-colors"
    >
      {/* CSS-driven to avoid hydration mismatch */}
      <span className="block dark:hidden">DARK</span>
      <span className="hidden dark:block">LIGHT</span>
    </button>
  );
}
