import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogPosts, blogLayoutConfig } from '../data/blog-data';
import StyledTitle from '../components/blog/StyledTitle';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const sortPostsByDate = (posts: typeof BlogPosts) => {
    return [...posts].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  };

  const getPostsByTag = (tag: string, limit: number) => {
    return sortPostsByDate(BlogPosts.filter(post => post.tag === tag)).slice(0, limit);
  };

  const getPostsByIds = (ids: string[], limit: number) => {
    return ids.map(id => BlogPosts.find(p => p.id === id)).filter(Boolean).slice(0, limit) as typeof BlogPosts;
  };

  const heroPost = BlogPosts.find(post => post.id === blogLayoutConfig.hero);
  const recentPosts = getPostsByIds(blogLayoutConfig.recent, 2);
  const topPosts = getPostsByIds(blogLayoutConfig.topList, 5);
  const aiPosts = getPostsByTag('ai-dispatch', 4);
  const featuredEssays = getPostsByTag('featured-essay', 4);
  const chainOfThought = getPostsByTag('chain-of-thought', 4);
  const podcasts = getPostsByTag('podcast', 2);
  const productPicks = getPostsByTag('product-pick', 4);

  const filteredPosts = searchQuery
    ? BlogPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.description && post.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : [];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-400/30">
      {/* ─── HEADER ─── */}
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between relative gap-6 md:gap-0">
          <div className="flex items-center gap-5 z-10 w-full md:w-auto justify-start">
            <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              Main Portfolio
            </Link>
          </div>

          <Link to="/" className="md:absolute md:left-1/2 md:-translate-x-1/2">
            <h1 className="text-4xl md:text-[4.5rem] font-serif italic tracking-[0.10em] text-teal-300 leading-none">
              EVERY DAY
            </h1>
          </Link>

          <div className="z-10 w-full md:w-auto relative group">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-56 bg-zinc-900/50 border border-zinc-800 focus:border-teal-500 rounded-full px-4 py-2 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:ring-1 focus:ring-teal-500 pl-10"
            />
            <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-teal-400 transition-colors pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {searchQuery ? (
          <section className="py-10 md:py-14 min-h-[50vh]">
            <h2 className="text-2xl font-serif mb-8 border-b border-dashed border-zinc-800 pb-4">
              Search Results for <span className="text-teal-400 italic">"{searchQuery}"</span>
            </h2>
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="block group">
                    <article>
                      <div className="aspect-[4/3] overflow-hidden mb-4 border border-zinc-800 rounded-sm">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      {post.category && (
                        <p className="text-[11px] font-medium text-zinc-500 tracking-widest uppercase mb-1">
                          {post.date} · {post.category}
                        </p>
                      )}
                      <h3 className="text-xl font-serif font-bold leading-snug group-hover:text-zinc-300 transition-colors mb-2">
                        <StyledTitle title={post.title} />
                      </h3>
                      {post.description && (
                        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">{post.description}</p>
                      )}
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-zinc-500 text-lg">No articles found matching your query.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-teal-400 hover:text-teal-300 transition-colors font-medium border-b border-teal-400/30 hover:border-teal-300 pb-0.5"
                >
                  Clear search
                </button>
              </div>
            )}
          </section>
        ) : (
          <>
            {/* ─── HERO 3-COLUMN GRID ─── */}
            <section className="py-10 md:py-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                {/* Left Column — Recent Posts */}
                <div className="lg:col-span-3 lg:border-r lg:border-dashed lg:border-zinc-700 lg:pr-8">
                  {recentPosts.map((post, idx) => (
                    <Link key={post.id} to={`/blog/${post.slug}`} className="block group">
                      <article className={`pb-5 ${idx < recentPosts.length - 1 ? 'mb-5 border-b border-dashed border-zinc-700' : ''}`}>
                        <div className="aspect-[3/2] overflow-hidden mb-3">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        {post.category && (
                          <p className="text-[11px] font-medium text-zinc-500 tracking-widest uppercase mb-1">
                            {post.date} · {post.category}
                          </p>
                        )}
                        <h3 className="text-lg font-serif font-bold leading-snug group-hover:text-zinc-300 transition-colors mb-1">
                          <StyledTitle title={post.title} />
                        </h3>
                        {post.description && (
                          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-2">{post.description}</p>
                        )}
                        <div className="flex items-center gap-2">
                          {post.authorImage && (
                            <img src={post.authorImage} alt={post.author} className="w-5 h-5 rounded-full" loading="lazy" />
                          )}
                          {post.author && (
                            <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">{post.author}</p>
                          )}
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

                {/* Center Column — Hero Post */}
                <div className="lg:col-span-6">
                  {heroPost && (
                    <Link to={`/blog/${heroPost.slug}`} className="block group">
                      <article>
                        <div className="aspect-[4/3] overflow-hidden mb-5">
                          <img
                            src={heroPost.image}
                            alt={heroPost.title}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                          />
                        </div>
                        <div className="text-center">
                          {heroPost.category && (
                            <p className="text-xs font-medium text-zinc-500 tracking-widest uppercase mb-3">
                              {heroPost.date}
                            </p>
                          )}
                          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-[1.1] group-hover:text-zinc-300 transition-colors mb-3">
                            <StyledTitle title={heroPost.title} />
                          </h2>
                          {heroPost.description && (
                            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-5">
                              {heroPost.description}
                            </p>
                          )}
                          <div className="flex items-center justify-center gap-3">
                            {heroPost.authorImage && (
                              <img
                                src={heroPost.authorImage}
                                alt={heroPost.author}
                                className="w-7 h-7 rounded-full"
                              />
                            )}
                            {heroPost.author && (
                              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                                {heroPost.author}
                              </p>
                            )}
                          </div>
                        </div>
                      </article>
                    </Link>
                  )}
                </div>

                {/* Right Column — Recent Essays */}
                <div className="lg:col-span-3 lg:border-l lg:border-dashed lg:border-zinc-700 lg:pl-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold tracking-[0.15em] text-zinc-400 uppercase">Recent Essays</h2>
                    <Link to="/blog/tag/top-list" className="text-zinc-500 hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  <div>
                    {topPosts.map((post, idx) => (
                      <Link key={post.id} to={`/blog/${post.slug}`} className="block group">
                        <article className={`flex gap-3 py-3 ${idx < topPosts.length - 1 ? 'border-b border-dashed border-zinc-700' : ''}`}>
                          <div className="w-[68px] h-[68px] flex-shrink-0 overflow-hidden rounded-sm">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <h3 className="text-sm font-bold leading-tight group-hover:text-zinc-300 transition-colors line-clamp-2 mb-1">
                              <StyledTitle title={post.title} />
                            </h3>
                            {post.author && (
                              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{post.author}</p>
                            )}
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ─── DOTTED DIVIDER ─── */}
            <div className="border-t border-dashed border-zinc-700" />

            {/* ─── DISPATCHES FROM THE FRONTIERS OF AI ─── */}
            <section className="py-10">
              <div className="flex items-center justify-between border-b border-dashed border-zinc-700 pb-4 mb-8">
                <div>
                  <h2 className="text-sm font-semibold tracking-[0.15em] text-zinc-400 uppercase mb-1">
                    Dispatches from the Frontiers of AI
                  </h2>
                  <p className="text-zinc-600 text-sm">The latest models, capabilities, products, and use cases.</p>
                </div>
                <Link to="/blog/tag/ai-dispatch" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {aiPosts.map((post, idx) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className={`block group ${idx < aiPosts.length - 1 ? 'lg:border-r lg:border-dashed lg:border-zinc-700 lg:pr-5' : ''}`}>
                    <article className={`${post.imageBg || 'bg-zinc-900'} rounded-lg overflow-hidden h-full flex flex-col`}>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="aspect-square mb-4 overflow-hidden rounded-md flex items-center justify-center">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="text-xl font-serif font-bold leading-snug mb-1 group-hover:text-zinc-300 transition-colors flex-1">
                          <StyledTitle title={post.title} />
                        </h3>
                        {post.description && (
                          <p className="text-zinc-300/70 text-sm leading-relaxed mb-3">{post.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-auto">
                          {post.authorImage && (
                            <img src={post.authorImage} alt={post.author} className="w-6 h-6 rounded-full" loading="lazy" />
                          )}
                          {post.author && (
                            <span className="text-[11px] text-zinc-400 uppercase tracking-wider">{post.author}</span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>

            {/* ─── DOTTED DIVIDER ─── */}
            <div className="border-t border-dashed border-zinc-700" />

            {/* ─── BRAND BANNER ─── */}
            <section className="py-16 text-center">
              <h2 className="text-4xl md:text-5xl font-serif italic tracking-[0.15em] text-teal-300 mb-4">
                EVERY DAY
              </h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                Stories, software, podcasts, and courses to help you build the future.
              </p>
            </section>

            {/* ─── DOTTED DIVIDER ─── */}
            <div className="border-t border-dashed border-zinc-700" />

            {/* ─── FEATURED ESSAYS ─── */}
            <section className="py-10">
              <div className="flex items-center justify-between border-b border-dashed border-zinc-700 pb-4 mb-8">
                <h2 className="text-sm font-semibold tracking-[0.15em] text-zinc-400 uppercase">Featured Essays</h2>
                <Link to="/blog/tag/featured-essay" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredEssays.map((post, idx) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className={`block group ${idx < featuredEssays.length - 1 ? 'lg:border-r lg:border-dashed lg:border-zinc-700 lg:pr-6' : ''}`}>
                    <article>
                      <div className="aspect-[3/4] overflow-hidden mb-4">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-xl font-serif font-bold leading-snug group-hover:text-zinc-300 transition-colors mb-2">
                        <StyledTitle title={post.title} />
                      </h3>
                      {post.description && (
                        <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed mb-3">{post.description}</p>
                      )}
                      <div className="flex items-center gap-2">
                        {post.authorImage && (
                          <img src={post.authorImage} alt={post.author} className="w-6 h-6 rounded-full" loading="lazy" />
                        )}
                        {post.author && (
                          <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">{post.author}</span>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>

            {/* ─── DOTTED DIVIDER ─── */}
            <div className="border-t border-dashed border-zinc-700" />

            {/* ─── CHAIN OF THOUGHT ─── */}
            <section className="py-10">
              <div className="flex items-center justify-between border-b border-dashed border-zinc-700 pb-4 mb-8">
                <h2 className="text-sm font-semibold tracking-[0.15em] text-zinc-400 uppercase">Chain of Thought</h2>
                <Link to="/blog/tag/chain-of-thought" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {chainOfThought.map((post, idx) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className={`block group ${idx < chainOfThought.length - 1 ? 'lg:border-r lg:border-dashed lg:border-zinc-700 lg:pr-6' : ''}`}>
                    <article>
                      <div className="aspect-[3/4] overflow-hidden mb-4">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-xl font-serif font-bold leading-snug group-hover:text-zinc-300 transition-colors mb-2">
                        <StyledTitle title={post.title} />
                      </h3>
                      {post.description && (
                        <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed mb-3">{post.description}</p>
                      )}
                      <div className="flex items-center gap-2">
                        {post.authorImage && (
                          <img src={post.authorImage} alt={post.author} className="w-6 h-6 rounded-full" loading="lazy" />
                        )}
                        {post.author && (
                          <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">{post.author}</span>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>

            {/* ─── DOTTED DIVIDER ─── */}
            <div className="border-t border-dashed border-zinc-700" />

            {/* ─── PODCAST HIGHLIGHTS ─── */}
            <section className="py-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-semibold tracking-[0.15em] text-zinc-400 uppercase">Podcast Highlights</h2>
                <Link to="/blog/tag/podcast" className="text-zinc-600 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {podcasts.map((post, idx) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className={`block group ${idx < podcasts.length - 1 ? 'md:border-r md:border-dashed md:border-zinc-700 md:pr-6' : ''}`}>
                    <article className="flex gap-5">
                      <div className="w-32 h-32 flex-shrink-0 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        {post.category && (
                          <p className="text-[11px] font-medium text-zinc-600 tracking-widest uppercase mb-1">
                            {post.category}
                          </p>
                        )}
                        <h3 className="text-xl font-serif font-bold leading-snug group-hover:text-zinc-300 transition-colors mb-2">
                          <StyledTitle title={post.title} />
                        </h3>
                        {post.description && (
                          <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed mb-3">{post.description}</p>
                        )}
                        <div className="flex items-center gap-2">
                          {post.authorImage && (
                            <img src={post.authorImage} alt={post.author} className="w-6 h-6 rounded-full" loading="lazy" />
                          )}
                          {post.author && (
                            <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">{post.author}</span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>

          </>
        )}
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-dashed border-zinc-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif italic tracking-[0.15em] text-teal-300 mb-3">
            EVERY DAY
          </h2>
          <p className="text-zinc-600 text-sm mb-8">What Comes Next.</p>
        </div>
      </footer>
    </div >
  );
}
