'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="py-24">
      <h1 className="text-4xl font-black tracking-tighter mb-4">// SYSTEM_ERROR</h1>
      <p className="text-gray-500 mb-2 border-l-2 border-foreground pl-6">{error.message || "Unexpected error"}</p>
      <button onClick={reset} className="mt-6 border border-foreground px-4 py-2 text-xs tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors">
        Retry
      </button>
    </div>
  );
}
