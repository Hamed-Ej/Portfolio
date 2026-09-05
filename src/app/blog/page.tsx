import type { Metadata } from "next";
import Link from "next/link";
import { fetchPosts, isRTL } from "@/lib/blog";
import { AnimatedStagger, AnimatedItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writings on health, systems, and infrastructure by Hamed Ejbari.",
};

export default async function BlogPage() {
  const posts = await fetchPosts();
  return (
    <AnimatedStagger className="py-24">
      <AnimatedItem>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">Blog</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl border-l-2 border-foreground pl-6 mb-12">Notes on health, engineering and everyday systems.</p>
      </AnimatedItem>
      {posts.length === 0 ? (
        <AnimatedItem>
          <div className="border border-dashed border-gray-300 dark:border-transparent p-8 text-center text-sm text-gray-500">
            No posts published yet — check back soon.
            <div className="mt-4">
              <Link href="/admin" className="underline underline-offset-4">Go to publisher</Link>
            </div>
          </div>
        </AnimatedItem>
      ) : (
        <AnimatedStagger className="grid md:grid-cols-2 gap-6">
          {posts.map((p) => {
            const rtl = isRTL(p);
            return (
              <AnimatedItem key={p.slug}>
                <Link href={`/blog/${p.slug}`} dir={rtl ? 'rtl' : 'ltr'} className="group block border border-gray-200 dark:border-transparent p-6 hover:border-foreground hover:bg-foreground hover:text-background transition-colors h-full">
                  {p.cover_image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={p.cover_image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="mb-4 aspect-[16/9] w-full object-cover border border-gray-200 dark:border-transparent grayscale group-hover:grayscale-0 transition"
                    />
                  ) : null}
                  <div className="text-[11px] tracking-widest uppercase text-gray-400 group-hover:text-gray-300 mb-2">{p.published_at ? new Date(p.published_at).toLocaleDateString(rtl ? 'fa-IR' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''} // {p.status} {rtl ? '• فارسی' : ''}</div>
                  <h2 className={`text-lg font-bold mb-2 ${rtl ? 'font-lalezar font-normal text-xl leading-relaxed' : ''}`}>{p.title}</h2>
                  <p className={`text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-300 line-clamp-3 ${rtl ? 'font-lalezar text-[15px] leading-7' : ''}`}>{p.excerpt}</p>
                </Link>
              </AnimatedItem>
            );
          })}
        </AnimatedStagger>
      )}
    </AnimatedStagger>
  );
}
