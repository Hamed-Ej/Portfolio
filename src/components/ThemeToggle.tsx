'use client';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // CSS-driven label swap avoids hydration mismatch with zero extra renders
  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="inline-flex items-center justify-center h-7 px-2 text-[11px] tracking-widest uppercase border border-gray-200 dark:border-transparent bg-background text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-colors"
    >
      <span className="block dark:hidden">DARK</span>
      <span className="hidden dark:block">LIGHT</span>
    </button>
  );
}
