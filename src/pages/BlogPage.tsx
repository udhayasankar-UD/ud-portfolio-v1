import { Link } from 'react-router-dom';
import { mockBlogPosts } from '../data/blog-data';

export default function BlogPage() {
  const heroPost = mockBlogPosts.find(post => post.layout === 'hero');
  const recentPosts = mockBlogPosts.filter(post => post.layout === 'recent');
  const topPosts = mockBlogPosts.filter(post => post.layout === 'top-list');
  const aiPosts = mockBlogPosts.filter(post => post.layout === 'ai-dispatch');

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button className="text-zinc-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button className="text-zinc-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-4xl font-serif font-bold tracking-wider">EVERY</h1>
          </Link>

          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-white text-sm">Sign in</button>
            <button className="bg-teal-400 hover:bg-teal-500 text-black font-semibold px-4 py-2 rounded text-sm transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Recent Posts */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold tracking-wider text-zinc-400">RECENT ESSAYS</h2>
              <Link to="/blog" className="text-zinc-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {recentPosts.map(post => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="flex gap-3">
                  <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold mb-1 group-hover:text-zinc-300 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    {post.author && (
                      <p className="text-xs text-zinc-500 uppercase tracking-wide">{post.author}</p>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Center Column - Hero Post */}
          <div className="lg:col-span-6">
            {heroPost && (
              <Link to={`/blog/${heroPost.slug}`} className="block group">
                <article>
                  <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
                    <img 
                      src={heroPost.image} 
                      alt={heroPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {heroPost.category && (
                    <p className="text-xs font-semibold text-zinc-500 mb-3 tracking-wider uppercase">
                      {heroPost.category}
                    </p>
                  )}
                  
                  <h2 className="text-4xl font-serif font-bold mb-4 group-hover:text-zinc-300 transition-colors leading-tight">
                    {heroPost.title}
                  </h2>
                  
                  {heroPost.description && (
                    <p className="text-zinc-400 mb-6 text-lg leading-relaxed">
                      {heroPost.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-3">
                    {heroPost.authorImage && (
                      <img 
                        src={heroPost.authorImage} 
                        alt={heroPost.author}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    {heroPost.author && (
                      <p className="text-sm font-medium uppercase tracking-wide text-zinc-400">
                        {heroPost.author}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            )}
          </div>

          {/* Right Column - Top Essays */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-wider text-zinc-400 mb-6">TOP ESSAYS</h2>
            
            <div className="space-y-6">
              {topPosts.map((post, index) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="flex gap-3">
                    <span className="text-2xl font-bold text-zinc-700 flex-shrink-0 w-8">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold mb-1 group-hover:text-zinc-300 transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      {post.author && (
                        <p className="text-xs text-zinc-500 uppercase tracking-wide">{post.author}</p>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Get the latest essays delivered to your inbox
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm mb-3 focus:outline-none focus:border-zinc-600 text-white placeholder-zinc-500"
              />
              <button className="w-full bg-teal-400 hover:bg-teal-500 text-black font-semibold py-2 rounded transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* AI Dispatches Section */}
        <div className="mt-16 border-t border-zinc-800 pt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">DISPATCHES FROM THE FRONTIERS OF AI</h2>
              <p className="text-zinc-400">The latest models, capabilities, products, and use cases.</p>
            </div>
            <Link to="/blog" className="text-zinc-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiPosts.map(post => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className="block group"
              >
                <article className={`${post.imageBg || 'bg-zinc-900'} rounded-lg overflow-hidden h-full flex flex-col`}>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="aspect-square mb-4 overflow-hidden rounded flex items-center justify-center">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-zinc-300 transition-colors flex-1">
                      {post.title}
                    </h3>
                    
                    {post.description && (
                      <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                        {post.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 mt-auto">
                      {post.authorImage && (
                        <img 
                          src={post.authorImage} 
                          alt={post.author}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      {post.author && (
                        <span className="text-xs text-zinc-300 uppercase tracking-wide">{post.author}</span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
