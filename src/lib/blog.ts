export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cover_image?: string | null;
  lang?: string;
  status: string;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  content_md?: string;
  content_html?: string;
}

export function isRTL(post: Pick<Post, 'lang' | 'title'> & { content_md?: string }) {
  if (post.lang === 'fa') return true;
  if (post.lang === 'en') return false;
  // fallback detect
  const text = `${post.title} ${post.content_md || ''}`;
  return /[\u0600-\u06FF]/.test(text);
}

const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function fetchPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${backendUrl}/api/posts`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return (await res.json()) as Post[];
  } catch {
    return [];
  }
}

export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${backendUrl}/api/posts/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as Post;
  } catch {
    return null;
  }
}

export async function fetchAllSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${backendUrl}/api/posts-all-slugs`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = (await res.json()) as { slug: string }[];
    return data.map((d) => d.slug);
  } catch {
    return [];
  }
}
