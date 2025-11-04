import React from 'react';
import { BookOpen, TrendingUp } from 'lucide-react';
import BlogCard from './BlogCard';
import { mockBlogPosts } from '../data/blog-data';

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="w-full min-h-screen py-12 sm:py-16 lg:py-20 bg-black leading-normal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-600/20">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Latest <span className="text-blue-400">Insights</span>
            </h2>
            <div className="p-2 rounded-lg bg-blue-600/20">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-normal">
            Explore thoughts on design, development, and the future of technology
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
          {mockBlogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a 
            href="/blog"
            className="group inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-900/50"
          >
            <span>View All Articles</span>
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Stay Updated
          </h3>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto leading-normal">
            Get the latest articles and insights delivered straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}