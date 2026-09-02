import GitHubTracker from "@/components/GitHubTracker";

export default function Projects() {
  const projects = [
    {
      name: "Password-Generator",
      desc: "Flexible, user-friendly password generator with multiple modes, built with Python.",
      url: "https://github.com/Hamed-Ej/Password-Generator",
    },
    {
      name: "Currency-Converter",
      desc: "A simple, well-documented currency converter built with Python and Streamlit.",
      url: "https://github.com/Hamed-Ej/Currency-Converter",
    },
    {
      name: "Drawpad",
      desc: "A really simple and minimal app that works like a whiteboard developed using PowerShell.",
      url: "https://github.com/Hamed-Ej/Drawpad",
    },
    {
      name: "ai-agent",
      desc: "A small chat-based function-calling agent with a tiny calculator utility.",
      url: "https://github.com/Hamed-Ej/ai-agent",
    },
  ];

  return (
    <div className="py-20 font-mono">
      <h1 className="text-4xl font-black tracking-tighter mb-12 uppercase">// PROJECTS_ARCHIVE</h1>

      <GitHubTracker />

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
    </div>
  );
}
