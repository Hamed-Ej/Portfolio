import type { Metadata } from "next";
import { AnimatedStagger, AnimatedItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "About",
  description: "About Hamed Ejbari — health teacher and systems engineer from Zahedan.",
};

const skills = [
  { id: "01", name: "Linux", detail: "Servers, networking and self-hosting." },
  { id: "02", name: "Python", detail: "Automation, backends and tooling." },
  { id: "03", name: "Hardware", detail: "From components to operating systems." },
];

export default function About() {
  return (
    <AnimatedStagger className="py-24">
      <AnimatedItem>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-16">About</h1>
      </AnimatedItem>

      <div className="grid md:grid-cols-2 gap-16">
        <AnimatedItem>
          <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-6">About</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed border-l-2 border-foreground pl-6">
            I&apos;m a health teacher and systems engineer based in Zahedan. I work on human health and on reliable tech — teaching, coaching and building infrastructure that is simple and maintainable.
          </p>
        </AnimatedItem>

        <AnimatedItem>
          <h2 className="text-xs tracking-widest text-gray-400 uppercase mb-6">Focus</h2>
          <ul className="space-y-6">
            {skills.map((skill) => (
              <li key={skill.id} className="group flex items-start gap-4">
                <span className="font-bold text-3xl text-gray-200 dark:text-gray-700 group-hover:text-foreground transition-colors">{skill.id}</span>
                <div>
                  <span className="block font-bold text-foreground">{skill.name}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{skill.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </AnimatedItem>
      </div>
    </AnimatedStagger>
  );
}
