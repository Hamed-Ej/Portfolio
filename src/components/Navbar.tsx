'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open ]);

  return (
    <motion.nav
      aria-label="Primary"
      initial={reduce ? false : { y: -12, opacity: 0, filter: 'blur(6px)' }}
      animate={reduce ? {} : { y: 0, opacity: 1, filter: 'blur(0px)' }}
      transition={reduce ? {} : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-gray-200 dark:border-transparent"
    >
      <div className="flex items-center justify-between max-w-5xl mx-auto px-4 sm:px-6 h-16 gap-4">
        <Link href="/" className="flex items-center h-16 shrink-0 hover:opacity-70" aria-label="Home">
          <Logo size={28} />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`leading-none py-2 ${active ? 'text-foreground underline underline-offset-4 decoration-1' : 'text-gray-500 hover:text-foreground transition-colors'}`}
              >
                {l.label}
              </Link>
            );
          })}
          <span aria-hidden className="w-px h-4 bg-gray-200 dark:bg-transparent" />
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex flex-col items-center justify-center gap-[5px] w-9 h-9 border border-gray-200 dark:border-transparent text-foreground"
          >
            <span className={`block h-px w-4 bg-current transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
            <span className={`block h-px w-4 bg-current transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, filter: 'blur(6px)' }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-gray-200 dark:border-transparent bg-background/95 backdrop-blur-md"
          >
            <div className="px-4 py-4 flex flex-col text-sm tracking-widest uppercase">
              {links.map((l, i) => {
                const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between py-3.5 ${i !== 0 ? 'border-t border-gray-200 dark:border-transparent' : ''} ${active ? 'text-foreground' : 'text-gray-500'}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[10px] text-gray-400">0{i + 1}</span>
                      {l.label}
                    </span>
                    <span aria-hidden>&rarr;</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
