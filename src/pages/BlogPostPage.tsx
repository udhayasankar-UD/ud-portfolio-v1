import { useParams, Link, Navigate } from 'react-router-dom';
import { mockBlogPosts } from '../data/blog-data';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = mockBlogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  // Split content by double newlines to create paragraphs
  const paragraphs = post.content.split('\n\n').filter(p => p.trim());

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Article Header */}
        <article>
          {post.category && (
            <p className="text-sm font-semibold text-zinc-500 mb-4 tracking-wider">
              {post.category}
            </p>
          )}
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
              {post.description}
            </p>
          )}

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-800">
            {post.authorImage && (
              <img 
                src={post.authorImage} 
                alt={post.author}
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              {post.author && (
                <p className="font-semibold">{post.author}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                {post.date && <span>{post.date}</span>}
                {post.date && post.readTime && <span>•</span>}
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

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-6 text-zinc-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {post.authorImage && (
                  <img 
                    src={post.authorImage} 
                    alt={post.author}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  {post.author && (
                    <p className="font-semibold text-lg">{post.author}</p>
                  )}
                  <p className="text-zinc-500 text-sm">Writer at Every</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">More from Every</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockBlogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map(relatedPost => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="block group"
                  >
                    <article className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 group-hover:text-zinc-300 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        {relatedPost.author && (
                          <p className="text-sm text-zinc-500">{relatedPost.author}</p>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
