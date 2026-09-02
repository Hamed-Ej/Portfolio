"use client";
import GitHubTracker from "@/components/GitHubTracker";
import { useEffect, useState } from "react";

interface Project {
  name: string;
  desc: string;
  url: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="py-20 font-mono">
      <h1 className="text-4xl font-black tracking-tighter mb-12 uppercase">// PROJECTS_ARCHIVE</h1>

      <GitHubTracker />

      {loading ? (
        <p className="animate-pulse tracking-widest text-gray-500 uppercase">// FETCHING_DATA...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              className="block border border-gray-900 p-6 hover:bg-gray-900 hover:text-white transition-colors"
            >
              <h2 className="text-xl font-bold mb-2">{project.name}</h2>
              <p className="text-sm text-gray-500 hover:text-gray-300">{project.desc}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
