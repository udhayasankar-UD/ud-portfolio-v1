import { useParams, Link, Navigate } from 'react-router-dom';
import { BlogPosts } from '../data/blog-data';
import StyledTitle from '../components/blog/StyledTitle';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BlogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const paragraphs = post.content.split('\n\n').filter(p => p.trim());

  // Get related posts (different from current, max 3)
  const relatedPosts = BlogPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-400/30">
      {/* ─── HEADER ─── */}
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between relative">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm z-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          <Link to="/blog" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-2xl md:text-3xl font-serif italic tracking-[0.15em] text-teal-300">
              EVERY DAY
            </h1>
          </Link>
        </div>
      </header>

      {/* ─── ARTICLE ─── */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Meta */}
        {post.category && (
          <p className="text-xs font-semibold text-zinc-500 tracking-widest uppercase mb-4">
            {post.category}
          </p>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[1.05] mb-5">
          <StyledTitle title={post.title} />
        </h1>

        {/* Description */}
        {post.description && (
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed mb-8">
            {post.description}
          </p>
        )}

        {/* Author row */}
        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-zinc-800">
          {post.authorImage && (
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-11 h-11 rounded-full"
            />
          )}
          <div>
            {post.author && (
              <p className="font-semibold text-sm">{post.author}</p>
            )}
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              {post.date && <span>{post.date}</span>}
              {post.date && post.readTime && <span>·</span>}
              {post.readTime && <span>{post.readTime}</span>}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[16/9] mb-12 rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-zinc-300 text-lg leading-[1.8]">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Author Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <div className="flex items-center gap-4">
            {post.authorImage && (
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-14 h-14 rounded-full"
              />
            )}
            <div>
              {post.author && (
                <p className="font-semibold text-lg">{post.author}</p>
              )}
              <p className="text-zinc-500 text-sm">Writer at Every</p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-16 pt-10 border-t border-zinc-800">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase mb-8">More from Every</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(related => (
              <Link
                key={related.id}
                to={`/blog/${related.slug}`}
                className="block group"
              >
                <article>
                  <div className="aspect-[4/3] overflow-hidden rounded-sm mb-3">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-base font-serif font-bold leading-snug group-hover:text-zinc-300 transition-colors mb-1">
                    <StyledTitle title={related.title} />
                  </h3>
                  {related.author && (
                    <p className="text-[10px] text-zinc-600 uppercase tracking-wider">{related.author}</p>
                  )}
                </article>
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-dashed border-zinc-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/blog">
            <h2 className="text-2xl font-serif italic tracking-[0.15em] text-teal-300 mb-2">
              EVERY DAY
            </h2>
          </Link>
          <p className="text-zinc-600 text-sm">What Comes Next.</p>
        </div>
      </footer>
    </div>
  );
}
