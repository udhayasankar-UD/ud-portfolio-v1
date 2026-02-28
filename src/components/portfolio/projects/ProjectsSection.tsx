
import { useState } from "react";

const projects = [
  {
    title: "Your Wellbeing",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
    category: "Apps",
    desc: "A modern React-driven app for wellness and self-care.",
    href: "#"
  },
  {
    title: "Unsung Empires: The Cholas II",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    category: "Games",
    desc: "Epic historical strategy game – contributions in 3D, AI & gameplay!",
    href: "#"
  },
  {
    title: "Car-Park AI",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    category: "Apps",
    desc: "AI-powered parking solution, real-time dashboard, web UI.",
    href: "#"
  },
  {
    title: "Game Portfolio",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    category: "Games",
    desc: "Thumbnails, demo builds & playtest videos for my indie projects.",
    href: "#"
  },
  {
    title: "AURA e-Commerce Revamp",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=600&q=80",
    category: "Apps",
    desc: "UI/UX overhaul for efficient online shopping. Lightning-fast SPA.",
    href: "#"
  },
  {
    title: "Interion Workshop",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    category: "Open Source",
    desc: "API-driven interior design playground. Open source!",
    href: "#"
  }
];

const categories = ["All", "Apps", "Games", "Open Source"];

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 py-20 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        <h2 className="gradient-text text-3xl md:text-4xl font-bold mb-8 text-center">Projects</h2>
        <div className="flex gap-4 flex-wrap justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`neu-btn px-5 py-2 text-base font-semibold ${filter === cat
                  ? "bg-blue-glow text-white shadow-soft-glow"
                  : "bg-gray-800 text-blue-glow"
                }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((proj, idx) => (
            <div
              key={proj.title}
              className="relative group rounded-2xl overflow-hidden glass-card shadow-glass hover:scale-105 transition-transform duration-300"
              style={{ minHeight: "320px" }}
            >
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition"></div>
              <div className="absolute bottom-0 left-0 w-full px-6 py-6 glass-card border-none backdrop-blur-xl z-10">
                <h3 className="text-xl font-bold text-white mb-1">{proj.title}</h3>
                <div className="text-blue-glow text-sm font-semibold mb-2">{proj.category}</div>
                <div className="text-gray-100 text-sm mb-1">{proj.desc}</div>
                <a
                  href={proj.href}
                  className="block mt-2 text-blue-glow underline underline-offset-2 hover:text-blue-400 transition"
                  target="_blank" rel="noopener noreferrer"
                >
                  See Details &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
