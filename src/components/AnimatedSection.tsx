'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

// 2026 modern: blur + scale + y, spring-ish ease, scroll-triggered
const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const reveal = {
  hidden: { opacity: 0, y: 18, filter: 'blur(10px)', scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const softReveal = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function AnimatedStagger({
  children,
  className,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({
  children,
  className,
  delay,
  variant = 'reveal',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'reveal' | 'soft';
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const v = variant === 'soft' ? softReveal : reveal;
  return (
    <motion.div
      variants={v}
      transition={delay ? { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hero word-by-word clip reveal
export function HeroReveal({ children, className }: { children: string; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const words = children.split(' ');
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={stagger}
      className={className}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 40, filter: 'blur(10px)', clipPath: 'inset(0 0 100% 0)' },
            show: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              clipPath: 'inset(0 0 0% 0)',
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.06 },
            },
          }}
          className="inline-block will-change-transform"
        >
          {w}
          {i !== words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.div>
  );
}

export { stagger as container, reveal as item };
