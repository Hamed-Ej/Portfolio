'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  status: string;
  lang?: string;
  published_at?: string | null;
  updated_at?: string | null;
}

function getCsrf() {
  const m = document.cookie.match(/(?:^|; )csrf_token=([^;]*)/);
  return m ? decodeURIComponent(m[1]) : '';
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const router = useRouter();

  async function load() {
    setLoading(true);
    setErr('');
    try {
      const res = await fetch('/api/admin/posts', { credentials: 'include' });
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok) throw new Error('Failed to load');
      setPosts(await res.json());
    } catch (e: any) {
      setErr(e.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function del(id: number) {
    if (!confirm('Delete this post?')) return;
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'X-CSRF-Token': getCsrf() },
    });
    if (res.ok) load();
    else alert('Delete failed');
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include', headers: { 'X-CSRF-Token': getCsrf() } });
    router.push('/admin/login');
  }

  return (
    <div className="py-16">
      <div className="flex justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">// ADMIN_DASHBOARD</h1>
          <p className="text-xs tracking-widest uppercase text-gray-400 mt-2">Simple publisher — drafts are private, published are public</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/new" className="bg-foreground text-background px-4 py-2 text-xs tracking-widest uppercase hover:opacity-90">
            + New Post
          </Link>
          <button onClick={logout} className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-xs tracking-widest uppercase hover:border-foreground">
            Logout
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 text-xs tracking-widest uppercase">
        <Link href="/blog" className="border px-3 py-1 hover:bg-foreground hover:text-background">View Blog →</Link>
        <Link href="/" className="border px-3 py-1 hover:bg-foreground hover:text-background">View Site →</Link>
      </div>

      {loading ? <div className="text-sm text-gray-500">Loading…</div> : null}
      {err ? <div className="text-sm text-red-600 border border-red-200 p-3 mb-4">{err}</div> : null}

      {!loading && posts.length === 0 ? <div className="border border-dashed p-8 text-center text-sm text-gray-500">No posts yet. Create one.</div> : null}

      <div className="border border-gray-200 dark:border-transparent divide-y divide-gray-200 dark:divide-transparent">
        {posts.map((p) => (
          <div key={p.id} className={`p-4 flex justify-between items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-900 ${p.lang === 'fa' ? 'font-lalezar' : ''}`} dir={p.lang === 'fa' ? 'rtl' : 'ltr'}>
            <div className="min-w-0">
              <div className={`font-bold truncate ${p.lang === 'fa' ? 'font-lalezar font-normal text-[15px]' : ''}`}>{p.title}</div>
              <div className="text-xs tracking-widest uppercase text-gray-500 truncate">/{p.slug} — {p.status} {p.lang === 'fa' ? '• FA • RTL' : '• EN'} {p.published_at ? `• ${new Date(p.published_at).toLocaleDateString()}` : ''}</div>
              <div className="text-sm text-gray-500 line-clamp-1">{p.excerpt}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href={`/admin/edit/${p.id}`} className="border px-3 py-1 text-xs tracking-widest uppercase hover:bg-foreground hover:text-background">Edit</Link>
              <Link href={`/blog/${p.slug}`} target="_blank" className="border px-3 py-1 text-xs tracking-widest uppercase hover:bg-foreground hover:text-background">View</Link>
              <button onClick={() => del(p.id)} className="border border-red-300 text-red-600 px-3 py-1 text-xs tracking-widest uppercase hover:bg-red-600 hover:text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
