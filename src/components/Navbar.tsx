'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
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
  return (
    <motion.nav
      aria-label="Primary"
      initial={reduce ? false : { y: -12, opacity: 0, filter: 'blur(6px)' }}
      animate={reduce ? {} : { y: 0, opacity: 1, filter: 'blur(0px)' }}
      transition={reduce ? {} : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-gray-200 dark:border-transparent"
    >
      <div className="flex justify-between items-center max-w-5xl mx-auto px-6 py-4 gap-4">
        <Link href="/" className="inline-flex items-center hover:opacity-70 shrink-0" aria-label="Home">
          <Logo size={28} />
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 text-xs tracking-widest uppercase flex-wrap justify-end">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={active ? 'text-foreground underline underline-offset-4 decoration-1' : 'text-gray-500 hover:text-foreground transition-colors'}
              >
                {l.label}
              </Link>
            );
          })}
          <span aria-hidden className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-transparent" />
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
