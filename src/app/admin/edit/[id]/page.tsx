'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PostForm } from '@/components/admin/PostForm';

export default function EditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/posts/${params.id}`, { credentials: 'include' });
      if (res.status === 401) { router.push('/admin/login'); return; }
      if (!res.ok) { setErr('Failed to load post'); return; }
      setData(await res.json());
    }
    load();
  }, [params.id, router]);

  if (err) return <div className="py-24 text-sm text-red-600">{err}</div>;
  if (!data) return <div className="py-24 text-sm text-gray-500">Loading…</div>;
  return <PostForm initial={data} mode="edit" />;
}
