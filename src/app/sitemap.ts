import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://ejbari.me";
  const now = new Date();
  const routes = ["", "/about", "/projects", "/blog", "/contact"];
  return routes.map((r) => ({
    url: `${base}${r || "/"}`,
    lastModified: now,
    changeFrequency: r === "/blog" ? "daily" : "monthly",
    priority: r === "" ? 1 : r === "/blog" ? 0.9 : 0.7,
  }));
}
