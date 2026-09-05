export default function GitHubTracker() {
  return (
    <div className="mb-12 border border-gray-200 dark:border-transparent p-4 bg-background grayscale contrast-125 dark:grayscale dark:contrast-100">
      <h2 className="text-xs tracking-widest text-gray-500 uppercase mb-4">// CONTRIBUTIONS_CALENDAR</h2>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src="https://ghchart.rshah.org/Hamed-Ej"
        alt="Hamed Ejbari's GitHub contributions"
        className="w-full h-auto aspect-[800/150] dark:invert dark:hue-rotate-180 dark:brightness-90 dark:contrast-125"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
