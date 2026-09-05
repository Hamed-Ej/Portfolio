import type { Metadata } from "next";
import ZahedanMap from "@/components/ZahedanMap";
import { AnimatedStagger, AnimatedItem } from "@/components/AnimatedSection";
import { GithubIcon, TelegramIcon, InstagramIcon, XFilledIcon } from "@/components/SocialIcons";

export const metadata: Metadata = { title: "Home" };

const socials = [
  { name: "GITHUB", url: "https://github.com/Hamed-Ej", Icon: GithubIcon },
  { name: "TELEGRAM", url: "https://t.me/hamedejbari", Icon: TelegramIcon },
  { name: "INSTAGRAM", url: "https://instagram.com/hamedejbary", Icon: InstagramIcon },
  { name: "X (TWITTER)", url: "https://x.com/hamed138282", Icon: XFilledIcon },
];

export default function Home() {
  return (
    <AnimatedStagger className="py-16 sm:py-24">
      <AnimatedItem className="mb-12 sm:mb-16">
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-none mb-6 text-foreground break-words">
          HAMED<br />EJBARI
        </h1>
        <div className="flex flex-wrap gap-4 text-xs tracking-widest text-gray-400 uppercase">
          <span>Health Teacher</span>
          <span className="opacity-30">—</span>
          <span>Systems Engineer</span>
          <span className="opacity-30">—</span>
          <span>Zahedan, Iran</span>
        </div>
      </AnimatedItem>

      <AnimatedItem>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mb-16 border-l-2 border-foreground pl-6">
          I teach human health and build reliable systems. Focused on clear explanations and infrastructure that stays up.
        </p>
      </AnimatedItem>

      <AnimatedItem className="mb-16">
        <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-4">Zahedan, Iran</h2>
        <ZahedanMap />
      </AnimatedItem>

      <AnimatedItem className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm border-t border-gray-200 dark:border-transparent pt-8">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            className="group flex items-center gap-2.5 min-w-0 text-gray-500 hover:text-foreground transition-colors"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 shrink-0 border border-gray-200 dark:border-transparent bg-background group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-colors">
              <s.Icon size={14} />
            </span>
            <span className="tracking-widest text-xs uppercase truncate">{s.name}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto sm:ml-0">&rarr;</span>
          </a>
        ))}
      </AnimatedItem>
    </AnimatedStagger>
  );
}
