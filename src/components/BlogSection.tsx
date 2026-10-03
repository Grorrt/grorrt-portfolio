import { useState } from 'react';
import { BookOpen, ArrowUpRight, Clock, Calendar, X, Sparkles, Code2 } from 'lucide-react';
import blogData from '../data/blog-posts.json';
import { BlogPost } from '../types';

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts = blogData as BlogPost[];

  return (
    <section id="writing" className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400 tracking-wider">
              TECHNICAL INSIGHTS & ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 font-display mt-1">
              Engineering Notes & Writeups
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mt-2">
              Deep dives into AI agent protocols, deterministic test pipelines, and distributed system trade-offs.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-400">
            Optimized for technical depth & SEO
          </div>
        </div>

        {/* Articles Grid (2 Published + 1 Coming Soon) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-2xs hover:shadow-xs group"
            >
              <div className="space-y-4">
                
                {/* Unboxed Metadata Header (Zero pills) */}
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Article Title */}
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 font-display group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags - unboxed typography with bullet separators */}
                <div className="pt-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 flex flex-wrap items-center gap-1.5">
                  {post.tags.map((tag, idx) => (
                    <span key={tag}>
                      #{tag}
                      {idx < post.tags.length - 1 && <span className="ml-1.5 text-neutral-300 dark:text-neutral-700">·</span>}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom Read More action */}
              <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">
                  slug: /{post.slug.slice(0, 18)}...
                </span>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 hover:underline inline-flex items-center gap-1 group/btn"
                >
                  <span>Read more</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </article>
          ))}

          {/* Card 3: Coming Soon Placeholder as requested */}
          <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>UPCOMING PUBLICATION</span>
              </div>

              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 font-display">
                Dissecting PE Binaries: Shannon Entropy & Forensic YARA Triage
              </h3>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                A hands-on breakdown of automated static analysis heuristics for identifying packed and obfuscated executables with Python.
              </p>

              <div className="pt-2 text-xs font-mono text-neutral-400">
                #ReverseEngineering · #Python · #MalwareAnalysis
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>Status: In draft</span>
              <span className="italic">Coming soon</span>
            </div>
          </div>

        </div>

        {/* Full Article Reader Modal */}
        {selectedPost && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
            className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          >
            <div
              className="relative w-full max-w-3xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b border-neutral-100 dark:border-neutral-800 flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedPost.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-600 dark:text-emerald-400">Technical Walkthrough</span>
                  </div>
                  <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-50 font-display leading-tight">
                    {selectedPost.title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedPost(null)}
                  aria-label="Close article modal"
                  className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Rich Article Content */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
                
                {/* SEO Meta Box for technical recruiters to review SEO compliance */}
                <div className="p-3.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400 space-y-1">
                  <div className="font-semibold text-neutral-900 dark:text-neutral-200">SEO Meta Description:</div>
                  <p className="italic">{selectedPost.metaDescription}</p>
                </div>

                {selectedPost.content.map((block, index) => {
                  if (block.type === 'heading') {
                    return (
                      <h3
                        key={index}
                        className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 font-display pt-2"
                      >
                        {block.text}
                      </h3>
                    );
                  }
                  if (block.type === 'paragraph') {
                    return (
                      <p
                        key={index}
                        className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed"
                      >
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === 'list' && block.items) {
                    return (
                      <ul key={index} className="space-y-2 pl-4 border-l-2 border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                        {block.items.map((item, i) => (
                          <li key={i} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.type === 'code' && block.code) {
                    return (
                      <div key={index} className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-neutral-200">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-[11px] text-neutral-500">
                          <span className="flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{block.language || 'code'}</span>
                          </span>
                        </div>
                        <pre className="overflow-x-auto leading-relaxed">
                          <code>{block.code}</code>
                        </pre>
                      </div>
                    );
                  }
                  return null;
                })}

                {/* Article Footer */}
                <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 font-mono">
                  <span>Author: Grorrt</span>
                  <span>github.com/Grorrt</span>
                </div>

              </div>

              {/* Modal Bottom CTA */}
              <div className="p-4 sm:p-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Close Article
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
