import type { Metadata } from "next";
import GitHubTracker from "@/components/GitHubTracker";
import { AnimatedStagger, AnimatedItem } from "@/components/AnimatedSection";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Hamed Ejbari — Password Generator, Currency Converter, Drawpad, ai-agent.",
};

export default async function Projects() {
  const projects = await getProjects();
  return (
    <AnimatedStagger className="py-24">
      <AnimatedItem>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-16">Projects</h1>
      </AnimatedItem>

      <AnimatedItem>
        <GitHubTracker />
      </AnimatedItem>

      <AnimatedStagger className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <AnimatedItem key={project.name}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-gray-200 dark:border-transparent p-6 hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 h-full"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-bold">{project.name}</h2>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm">&rarr;</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-400">{project.desc}</p>
            </a>
          </AnimatedItem>
        ))}
      </AnimatedStagger>
    </AnimatedStagger>
  );
}
