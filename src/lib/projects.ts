export interface Project {
  name: string;
  desc: string;
  url: string;
}

export const fallbackProjects: Project[] = [
  { name: "Password-Generator", desc: "Flexible, user-friendly password generator with multiple modes, built with Python.", url: "https://github.com/Hamed-Ej/Password-Generator" },
  { name: "Currency-Converter", desc: "A simple, well-documented currency converter built with Python and Streamlit.", url: "https://github.com/Hamed-Ej/Currency-Converter" },
  { name: "Drawpad", desc: "A really simple and minimal app that works like a whiteboard developed using PowerShell.", url: "https://github.com/Hamed-Ej/Drawpad" },
  { name: "ai-agent", desc: "A small chat-based function-calling agent with a tiny calculator utility.", url: "https://github.com/Hamed-Ej/ai-agent" },
];

export async function getProjects(): Promise<Project[]> {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${backendUrl}/api/projects`, { next: { revalidate: 3600 } });
    if (!res.ok) return fallbackProjects;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data as Project[];
    return fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}
