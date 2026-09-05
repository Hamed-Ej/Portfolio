import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchPost, fetchAllSlugs, isRTL } from "@/lib/blog";

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();
  const rtl = isRTL(post);
  return (
    <article className="py-24 max-w-3xl" dir={rtl ? 'rtl' : 'ltr'} lang={rtl ? 'fa' : 'en'}>
      <Link href="/blog" className="text-xs tracking-widest uppercase text-gray-500 hover:text-foreground mb-8 inline-block">&larr; Back to blog</Link>
      <div className="text-xs tracking-widest uppercase text-gray-400 mb-3">{post.published_at ? new Date(post.published_at).toLocaleDateString(rtl ? 'fa-IR' : 'en-US', { dateStyle: 'long' }) : ''} {rtl ? '• فارسی' : ''}</div>
      <h1 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 ${rtl ? 'font-lalezar font-normal leading-tight' : ''}`}>{post.title}</h1>
      <p className={`text-gray-500 dark:text-gray-400 border-foreground mb-8 ${rtl ? 'font-lalezar text-xl leading-relaxed border-r-2 border-l-0 pr-6' : 'border-l-2 pl-6'}`}>{post.excerpt}</p>
      {post.cover_image ? (
        <div className="mb-8 border border-foreground overflow-hidden">
          {/* eslint-disable @next/next/no-img-element */}
          <img src={post.cover_image} alt={post.title} className="w-full" />
        </div>
      ) : null}
      <div dir={rtl ? 'rtl' : 'ltr'} className={`prose max-w-none ${rtl ? 'font-lalezar' : ''}`} dangerouslySetInnerHTML={{ __html: post.content_html || '' }} />
    </article>
  );
}
