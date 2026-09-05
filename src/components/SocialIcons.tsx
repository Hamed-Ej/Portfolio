// Monochrome brutalist social icons — stroke/mono matching HE logo
// No external deps, currentColor, square caps, works in light/dark

export function GithubIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square" strokeLinejoin="miter" aria-hidden className={className}>
      <path d="M9 19c-4.3 1.4-4.3-2.2-5-2.6" />
      <path d="M16 22V18a3 3 0 0 0-.9-2.1c3.1-.3 6.4-1.6 6.4-7.2 0-1.6-.6-2.9-1.5-4 0 0 1.2-.4 4 1.5A6.8 6.8 0 0 1 16 7.3a6.8 6.8 0 0 1-8 0C10.5 6.2 11.7 6.6 11.7 6.6c-.9 1.1-1.5 2.4-1.5 4 0 5.6 3.3 6.9 6.4 7.2A3 3 0 0 0 15 18v4" />
      <path d="M9 18c-1.2.8-2.1.9-2.7.9" strokeWidth="1.5" />
    </svg>
  );
}

export function TelegramIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square" strokeLinejoin="miter" aria-hidden className={className}>
      <path d="M21 5L3 11.3l6.2 2.1" />
      <path d="M9.2 13.4L21 5 14.8 19.3l-5.6-5.9" />
      <path d="M9.2 13.4v5.2L14.8 13.4" />
    </svg>
  );
}

export function InstagramIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square" strokeLinejoin="miter" aria-hidden className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
      <path d="M8 12h8" opacity="0" />
    </svg>
  );
}

export function XIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" aria-hidden className={className}>
      <path d="M4 4L20 20" />
      <path d="M20 4L4 20" />
    </svg>
  );
}

// Alternative filled X for more recognition (use if stroke X too minimal)
export function XFilledIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.9 3H21.7L14.4 11.1L22 21H15.4L10.5 14.7L4.9 21H2.1L9.9 12.1L2.6 3H9.4L13.7 8.7L18.9 3ZM16.9 19H18.4L8.1 4.9H6.5L16.9 19Z" />
    </svg>
  );
}

export const socialMeta = {
  github: { label: "GitHub", Icon: GithubIcon },
  telegram: { label: "Telegram", Icon: TelegramIcon },
  instagram: { label: "Instagram", Icon: InstagramIcon },
  x: { label: "X", Icon: XFilledIcon },
} as const;
