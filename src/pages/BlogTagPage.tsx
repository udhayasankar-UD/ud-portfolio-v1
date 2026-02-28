import { useParams, Link } from 'react-router-dom';
import { BlogPosts } from '../data/blog-data';
import StyledTitle from '../components/blog/StyledTitle';

// Map tags to readable titles
const tagTitles: Record<string, string> = {
    'hero': 'Featured Hero',
    'recent': 'Recent Posts',
    'top-list': 'Recent Essays',
    'ai-dispatch': 'Dispatches from the Frontiers of AI',
    'featured-essay': 'Featured Essays',
    'chain-of-thought': 'Chain of Thought',
    'podcast': 'Podcast Highlights',
    'product-pick': 'Product Picks'
};

export default function BlogTagPage() {
    const { tag } = useParams<{ tag: string }>();

    const sortPostsByDate = (posts: typeof BlogPosts) => {
        return [...posts].sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
        });
    };

    const tagPosts = sortPostsByDate(BlogPosts.filter(post => post.tag === tag));
    const displayTitle = tag ? tagTitles[tag] || tag.replace('-', ' ') : 'Category';

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-400/30 flex flex-col">
            <header className="border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center justify-center relative">
                    <Link to="/blog" className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>

                    <h1 className="text-3xl md:text-5xl font-serif italic text-teal-300 leading-none">
                        {displayTitle}
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex-1 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tagPosts.map(post => (
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
                {tagPosts.length === 0 && (
                    <p className="text-center text-zinc-500 mt-20">No articles found for this section.</p>
                )}
            </main>

            <footer className="border-t border-dashed border-zinc-700 py-16 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-serif italic tracking-[0.15em] text-teal-300 mb-3">
                        EVERY DAY
                    </h2>
                    <p className="text-zinc-600 text-sm">What Comes Next.</p>
                </div>
            </footer>
        </div>
    );
}
