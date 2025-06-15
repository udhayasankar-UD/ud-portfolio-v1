
import React, { useRef } from "react";

const posts = [{
  id: 1,
  slug: "styling-neumorphism-tailwind",
  title: "Styling Neumorphism with Tailwind CSS",
  date: "2024-06-12",
  excerpt: "Neumorphic design brings soft, tactile UIs – let's learn how to pull it off with custom box-shadow, gradients, and Tailwind utilities for beautiful cards."
}, {
  id: 2,
  slug: "threejs-react-intro",
  title: "Getting Started with Three.js in React",
  date: "2024-05-27",
  excerpt: "3D scenes? Yes, please! A quickstart on integrating Three.js and @react-three/fiber for stunning hero sections and interactive graphics."
}, {
  id: 3,
  slug: "unity-to-webgl-portfolio",
  title: "Showcasing Unity Games on Your Portfolio",
  date: "2024-04-18",
  excerpt: "Your Unity game is WebGL-ready – now embed it beautifully in your dev portfolio and wow recruiters with live demos!"
}];

export default function BlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll left/right by the width of one card
  const scrollByCard = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector(".blog-card");
    const cardWidth = card ? (card as HTMLElement).offsetWidth : 320;
    container.scrollBy({
      left: direction === "left" ? -cardWidth - 16 : cardWidth + 16, // 16 = gap
      behavior: "smooth"
    });
  };

  return (
    <section id="blog" className="min-h-screen w-full px-4 bg-gradient-to-b from-gray-900 to-gray-800 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="gradient-text text-4xl md:text-5xl font-bold text-left">Blog</h2>
          <div className="flex gap-2">
            <button aria-label="Scroll left" onClick={() => scrollByCard("left")} className="neu-btn px-3 py-2 text-blue-glow hover:text-white transition hidden sm:inline">
              &larr;
            </button>
            <button aria-label="Scroll right" onClick={() => scrollByCard("right")} className="neu-btn px-3 py-2 text-blue-glow hover:text-white transition hidden sm:inline">
              &rarr;
            </button>
          </div>
        </div>
        {/* Carousel/scrollable row of cards */}
        <div
          className="flex overflow-x-auto snap-x gap-8 scrollbar-thin pb-4 hide-scrollbar sm:pb-0"
          ref={scrollRef}
          tabIndex={0}
        >
          {posts.map(post => (
            <div
              key={post.id}
              className="blog-card glass-card p-6 rounded-xl min-w-[320px] max-w-sm snap-start hover:shadow-soft-glow transition cursor-pointer flex-shrink-0"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-semibold text-blue-glow mb-3">{post.title}</h3>
                <p className="text-gray-300 mb-4 text-base leading-relaxed flex-grow">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-sm text-gray-400">
                    {post.date}
                  </div>
                  <div className="flex gap-3">
                    <button className="neu-btn text-sm px-4 py-2 text-blue-glow hover:text-white transition">
                      Share
                    </button>
                    <a href={`/blog/${post.slug}`} className="neu-btn text-sm px-4 py-2 text-blue-glow hover:text-white transition">
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Mobile-only nav buttons */}
        <div className="flex gap-4 justify-center mt-8 sm:hidden">
          <button aria-label="Scroll left" onClick={() => scrollByCard("left")} className="neu-btn px-6 py-2 text-blue-glow hover:text-white rounded-lg">
            &larr; Prev
          </button>
          <button aria-label="Scroll right" onClick={() => scrollByCard("right")} className="neu-btn px-6 py-2 text-blue-glow hover:text-white rounded-lg">
            Next &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
