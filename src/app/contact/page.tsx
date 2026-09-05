import type { Metadata } from "next";
import { AnimatedStagger, AnimatedItem } from "@/components/AnimatedSection";
import { GithubIcon, TelegramIcon, InstagramIcon, XFilledIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Hamed Ejbari — systems architecture, health physiology, collaborations.",
};

const socials = [
  { name: "GITHUB", url: "https://github.com/Hamed-Ej", Icon: GithubIcon },
  { name: "TELEGRAM", url: "https://t.me/hamedejbari", Icon: TelegramIcon },
  { name: "INSTAGRAM", url: "https://instagram.com/hamedejbary", Icon: InstagramIcon },
  { name: "X (TWITTER)", url: "https://x.com/hamed138282", Icon: XFilledIcon },
];

export default function Contact() {
  return (
    <AnimatedStagger className="py-24">
      <AnimatedItem>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-16">Contact</h1>
      </AnimatedItem>

      <div className="max-w-xl">
        <AnimatedItem>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-16 border-l-2 border-foreground pl-6">
            Questions about health, systems or collaboration — feel free to reach out.
          </p>
        </AnimatedItem>

        <AnimatedItem className="space-y-10">
          <div>
            <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-2">Email</h2>
            <a href="mailto:hamed@ejbari.me" aria-label="Email Hamed Ejbari" className="text-2xl md:text-3xl font-bold text-foreground hover:underline underline-offset-4 decoration-2 break-all">
              hamed@ejbari.me
            </a>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-transparent">
            <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-6">Social</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {socials.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="group flex items-center gap-2.5 text-gray-500 hover:text-foreground transition-colors">
                  <span className="inline-flex items-center justify-center w-7 h-7 border border-gray-200 dark:border-transparent bg-background group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-colors">
                    <s.Icon size={14} />
                  </span>
                  <span className="tracking-widest text-xs uppercase">{s.name}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </AnimatedItem>
      </div>
    </AnimatedStagger>
  );
}
