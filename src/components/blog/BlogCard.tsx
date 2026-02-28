import { Link } from 'react-router-dom';
import { BlogPost } from '../data/blog-data';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Dynamic grid classes based on layout
  const getGridClasses = () => {
    const baseClasses = 'col-span-1 row-span-1';
    
    switch (post.layout) {
      case 'large-width':
        return `${baseClasses} md:col-span-2`;
      case 'large-height':
        return `${baseClasses} md:row-span-2`;
      default:
        return baseClasses;
    }
  };

  // Dynamic height classes for the image
  const getImageClasses = () => {
    if (post.layout === 'large-height') {
      return 'w-full h-32 md:h-64 object-cover';
    }
    return 'w-full h-32 md:h-48 object-cover';
  };

  return (
    <Link to={`/blog/${post.slug}`} className={`${getGridClasses()} group cursor-pointer`}>
      <article className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden h-full flex flex-col hover:border-zinc-600 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-900/50">
        {/* Image Container */}
        <div className="relative overflow-hidden flex-shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className={`${getImageClasses()} group-hover:scale-105 transition-transform duration-300`}
            loading="lazy"
          />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
              {post.category}
            </span>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-white font-bold text-lg leading-relaxed mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
          </div>
          
          {/* Metadata */}
          <div className="flex items-center justify-between text-zinc-400 text-sm mt-auto">
            <span className="font-medium">{post.author}</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-blue-500/30 transition-colors duration-300 pointer-events-none" />
      </article>
    </Link>
  );
}