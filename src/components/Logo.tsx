export function Logo({ size = 28, withWordmark = false, className }: { size?: number; withWordmark?: boolean; className?: string }) {
  if (withWordmark) {
    return (
      <span className={`inline-flex items-center gap-3 ${className ?? ''}`} aria-label="Hamed Ejbari HE logo">
        <svg width={size} height={size} viewBox="0 0 512 512" role="img" aria-hidden className="shrink-0">
          <g fill="none" stroke="currentColor" strokeWidth="26" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M116 92 V420" />
            <path d="M236 92 V420" />
            <path d="M116 256 H236" />
            <path d="M236 110 H396" />
            <path d="M236 256 H370" />
            <path d="M236 402 H396" />
          </g>
        </svg>
        <span className="flex flex-col leading-none">
          <span className="font-black tracking-tighter text-[1.05rem]">HE.</span>
          <span className="text-[0.58rem] tracking-[0.18em] uppercase opacity-60 font-semibold">Hamed Ejbari</span>
        </span>
      </span>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" role="img" aria-label="HE logo" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="26" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M116 92 V420" />
        <path d="M236 92 V420" />
        <path d="M116 256 H236" />
        <path d="M236 110 H396" />
        <path d="M236 256 H370" />
        <path d="M236 402 H396" />
      </g>
    </svg>
  );
}
