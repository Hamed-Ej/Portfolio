'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Write markdown...',
  dir = 'ltr',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dir?: 'ltr' | 'rtl';
}) {
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  return (
    <div className="border border-gray-200 dark:border-transparent">
      <div className="flex border-b border-gray-200 dark:border-transparent text-xs tracking-widest uppercase">
        <button
          type="button"
          onClick={() => setTab('write')}
          className={`px-4 py-2 ${tab === 'write' ? 'bg-foreground text-background' : 'text-gray-500 hover:text-foreground'}`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setTab('preview')}
          className={`px-4 py-2 ${tab === 'preview' ? 'bg-foreground text-background' : 'text-gray-500 hover:text-foreground'}`}
        >
          Preview
        </button>
        <span className="ml-auto px-4 py-2 text-gray-400 hidden sm:block">// markdown + gfm + code highlight</span>
      </div>
      {tab === 'write' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          dir={dir}
          lang={dir === 'rtl' ? 'fa' : 'en'}
          className={`w-full min-h-[420px] p-4 text-sm bg-background text-foreground outline-none resize-y ${dir === 'rtl' ? 'font-lalezar text-right leading-8 text-[15px]' : 'font-mono text-left'}`}
          spellCheck={false}
        />
      ) : (
        <div dir={dir} className={`p-6 min-h-[420px] prose max-w-none text-sm ${dir === 'rtl' ? 'font-lalezar text-right' : ''}`}>
          {value.trim() ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {value}
            </ReactMarkdown>
          ) : (
            <span className="text-gray-400">Nothing to preview.</span>
          )}
        </div>
      )}
      <div className="border-t border-gray-200 dark:border-transparent px-4 py-2 text-[11px] tracking-widest uppercase text-gray-400 flex gap-4 flex-wrap">
        <span>H1-H3, **bold**, *italic*, `code`, ```fence```, - list, &gt; quote, [link](url), ![img](url)</span>
      </div>
    </div>
  );
}
