'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MarkdownEditor } from './MarkdownEditor';
import { slugify } from '@/lib/utils';

function getCsrf() {
  const m = document.cookie.match(/(?:^|; )csrf_token=([^;]*)/);
  return m ? decodeURIComponent(m[1]) : '';
}

export interface PostFormInitial {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content_md: string;
  cover_image?: string | null;
  status: string;
  lang?: string;
}

export function PostForm({ initial, mode }: { initial: PostFormInitial; mode: 'new' | 'edit' }) {
  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [autoSlug, setAutoSlug] = useState(!initial.slug);
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [content, setContent] = useState(initial.content_md);
  const [cover, setCover] = useState(initial.cover_image || '');
  const [status, setStatus] = useState(initial.status || 'draft');
  const [lang, setLang] = useState(initial.lang || 'en');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  function onTitleChange(v: string) {
    setTitle(v);
    if (autoSlug) setSlug(slugify(v));
  }

  async function uploadFile(file: File) {
    setUploading(true);
    setErr('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        credentials: 'include',
        headers: { 'X-CSRF-Token': getCsrf() },
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setCover(data.url);
    } catch (e: any) {
      setErr(e.message || 'Upload error');
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    setErr('');
    setSaving(true);
    try {
      const payload = { title, slug, excerpt, content_md: content, cover_image: cover || null, status, lang };
      const url = mode === 'new' ? '/api/admin/posts' : `/api/admin/posts/${initial.id}`;
      const method = mode === 'new' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': getCsrf() },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Save failed (${res.status})`);
      router.push('/admin');
      router.refresh();
    } catch (e: any) {
      setErr(e.message || 'Save error');
      setSaving(false);
    }
  }

  return (
    <div className="py-12 max-w-3xl">
      <h1 className="text-3xl font-black tracking-tighter mb-6 uppercase">{mode === 'new' ? '// NEW_POST' : '// EDIT_POST'}</h1>

      <div className="space-y-6 border border-foreground p-6 bg-background">
        <div>
          <label className="text-xs tracking-widest uppercase text-gray-500 block mb-1">Title</label>
          <input value={title} onChange={(e) => onTitleChange(e.target.value)} placeholder="My first post about systems" className="w-full border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm outline-none focus:border-foreground" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs tracking-widest uppercase text-gray-500 block mb-1">Slug {autoSlug ? '(auto)' : ''}</label>
            <div className="flex gap-2">
              <input value={slug} onChange={(e) => { setSlug(e.target.value); setAutoSlug(false); }} placeholder="my-first-post" className="flex-1 border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm outline-none focus:border-foreground font-mono" />
              <button type="button" onClick={() => setAutoSlug(!autoSlug)} className="border px-2 text-xs tracking-widest uppercase hover:bg-foreground hover:text-background">{autoSlug ? 'Auto' : 'Manual'}</button>
            </div>
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-gray-500 block mb-1">Language</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm outline-none">
              <option value="en">English — LTR</option>
              <option value="fa">فارسی — RTL (Lalezar)</option>
            </select>
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-gray-500 block mb-1">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm outline-none">
              <option value="draft">Draft — private</option>
              <option value="published">Published — public</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs tracking-widest uppercase text-gray-500 block mb-1">Excerpt (140 chars, auto if empty)</label>
          <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="One-line summary…" className="w-full border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm outline-none focus:border-foreground" maxLength={300} />
        </div>

        <div>
          <label className="text-xs tracking-widest uppercase text-gray-500 block mb-1">Cover Image</label>
          <div className="flex gap-2">
            <input value={cover} onChange={(e) => setCover(e.target.value)} placeholder="https://... or /uploads/xxx.webp" className="flex-1 border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm outline-none focus:border-foreground" />
            <label className="border px-3 py-2 text-xs tracking-widest uppercase hover:bg-foreground hover:text-background cursor-pointer">
              {uploading ? 'Uploading…' : 'Upload'}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])} disabled={uploading} />
            </label>
          </div>
          {cover ? <div className="mt-2 text-xs text-gray-500 break-all">Preview: <a href={cover} target="_blank" className="underline">{cover}</a></div> : null}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs tracking-widest uppercase text-gray-500">Content (Markdown)</label>
            <span className={`text-[11px] px-2 py-0.5 border ${lang === 'fa' ? 'bg-foreground text-background border-foreground' : 'border-gray-200 text-gray-400'}`}>{lang === 'fa' ? 'RTL • فارسی — Lalezar' : 'LTR • English'}</span>
          </div>
          <MarkdownEditor value={content} onChange={setContent} placeholder={lang === 'fa' ? '# سلام&#10;&#10;اینجا بنویسید...' : '# Hello&#10;&#10;Start writing...'} dir={lang === 'fa' ? 'rtl' : 'ltr'} />
        </div>

        {err ? <div className="text-sm text-red-600 border border-red-200 bg-red-50 p-3">{err}</div> : null}

        <div className="flex gap-3">
          <button onClick={save} disabled={saving || !title.trim()} className="bg-foreground text-background px-6 py-2 text-xs tracking-widest uppercase hover:opacity-90 disabled:opacity-50">
            {saving ? 'Saving…' : mode === 'new' ? 'Publish' : 'Save'}
          </button>
          <button type="button" onClick={() => router.push('/admin')} className="border border-gray-300 dark:border-gray-700 px-6 py-2 text-xs tracking-widest uppercase hover:border-foreground">
            Cancel
          </button>
        </div>
        <div className="text-[11px] tracking-widest uppercase text-gray-400">Drafts are only visible in admin. Published posts appear at /blog and /blog/[slug].</div>
      </div>
    </div>
  );
}
