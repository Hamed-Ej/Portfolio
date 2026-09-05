import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24">
      <h1 className="text-5xl font-black tracking-tighter mb-4">// 404_NOT_FOUND</h1>
      <p className="text-gray-500 mb-8 border-l-2 border-foreground pl-6 max-w-xl">The route you requested does not exist in this system.</p>
      <Link href="/" className="inline-flex border border-foreground px-4 py-2 text-xs tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors">
        Return Home
      </Link>
    </div>
  );
}
