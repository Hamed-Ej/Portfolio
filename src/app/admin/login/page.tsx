'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data.error || 'Login failed');
        setLoading(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch (e: any) {
      setErr(e.message || 'Network error');
      setLoading(false);
    }
  }

  return (
    <div className="py-24 max-w-md mx-auto">
      <h1 className="text-3xl font-black tracking-tighter mb-8">// ADMIN_LOGIN</h1>
      <form onSubmit={submit} className="border border-foreground p-6 space-y-4 bg-background">
        <div>
          <label className="text-xs tracking-widest uppercase text-gray-500 block mb-1">Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm outline-none focus:border-foreground" placeholder="admin" />
        </div>
        <div>
          <label className="text-xs tracking-widest uppercase text-gray-500 block mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm outline-none focus:border-foreground" placeholder="••••••••" />
        </div>
        {err ? <div className="text-sm text-red-600 border border-red-200 bg-red-50 p-2">{err}</div> : null}
        <button disabled={loading} className="w-full bg-foreground text-background py-2 text-xs tracking-widest uppercase hover:opacity-90 disabled:opacity-50">
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
