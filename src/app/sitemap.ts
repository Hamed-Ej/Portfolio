import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://ejbari.me";
  const now = new Date();
  const routes: MetadataRoute.Sitemap = ["", "/about", "/projects", "/blog", "/contact"].map((r) => ({
    url: `${base}${r || "/"}`,
    lastModified: now,
    changeFrequency: r === "/blog" ? "daily" : "monthly",
    priority: r === "" ? 1 : r === "/blog" ? 0.9 : 0.7,
  }));

  // Include published blog posts (best-effort; falls back to static routes if backend is down)
  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/api/posts-all-slugs`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const slugs = (await res.json()) as { slug: string; updated_at?: string | null }[];
      for (const { slug, updated_at } of slugs) {
        routes.push({
          url: `${base}/blog/${slug}`,
          lastModified: updated_at ? new Date(updated_at) : now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  } catch {
    // backend unavailable at build time — static routes still emitted
  }

  return routes;
}
