
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AlbumCase from "./AlbumCase";
import AlbumEndSlide from "./AlbumEndSlide";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Car-Park AI",
    description: "AI-powered parking solution with real-time dashboard and intelligent web UI for optimal space management",
    tech: ["React", "Python", "AI/ML", "Dashboard"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Game Portfolio",
    description: "Comprehensive showcase with thumbnails, demo builds & playtest videos for indie game projects",
    tech: ["Unity", "Game Design", "Video Editing", "Portfolio"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "AURA e-Commerce Revamp",
    description: "Complete UI/UX overhaul for efficient online shopping experience with lightning-fast SPA performance",
    tech: ["React", "UI/UX", "E-Commerce", "SPA"],
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=600&q=80",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Interion Workshop",
    description: "API-driven interior design playground with collaborative features. Open source community project",
    tech: ["React", "API", "Interior Design", "Open Source"],
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Your Wellbeing",
    description: "A modern React-driven app for wellness and self-care with intuitive interface design",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 6,
    title: "Unsung Empires: The Cholas II",
    description: "Epic historical strategy game – contributions in 3D modeling, AI systems & gameplay mechanics",
    tech: ["Unity", "C#", "3D Modeling", "AI Systems"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    liveUrl: "#",
    githubUrl: "#"
  }
];

export default function AlbumProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    const totalWidth = track.scrollWidth - window.innerWidth;
    
    // Create the horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth + window.innerHeight}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    tl.to(track, {
      x: -totalWidth,
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.1),transparent_50%)]" />
      </div>

      {/* Section Title */}
      <div className="absolute top-12 left-12 z-10 pointer-events-none">
        <h2 className="gradient-text text-4xl md:text-6xl font-bold drop-shadow-2xl">
          Top Collection
        </h2>
        <p className="text-white/90 text-lg mt-2 drop-shadow-lg">
          Scroll to explore my featured projects
        </p>
      </div>

      {/* Main Content */}
      <div className="relative h-full flex items-center pt-32">
        {/* Combined Project Cards Track */}
        <div
          ref={trackRef}
          className="flex items-stretch gap-12 px-20 min-w-max case-track"
        >
          {projects.map((project, index) => (
            <div key={project.id} className="flex-shrink-0">
              {/* Unified Project Card with Larger Size */}
              <div className="neu-card p-8 backdrop-blur-md bg-gray-800/90 w-[500px] h-[700px] flex flex-col">
                {/* Project Case at the top - Fixed Height */}
                <div className="flex-shrink-0 mb-8 h-[320px] flex items-center justify-center">
                  <AlbumCase project={project} index={index} />
                </div>
                
                {/* Project Details - Flexible Height */}
                <div className="flex-1 flex flex-col">
                  <h3 className="gradient-text text-2xl font-bold mb-4 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/80 mb-6 leading-relaxed text-base flex-1 line-clamp-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6 flex-shrink-0">
                    <h4 className="text-blue-glow font-semibold mb-3 text-sm">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="bg-blue-glow/20 text-blue-glow px-3 py-2 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 flex-shrink-0">
                    <a
                      href={project.liveUrl}
                      className="neu-btn bg-blue-glow hover:bg-blue-400 text-white font-semibold px-4 py-3 rounded-lg flex items-center gap-2 transition-all text-sm flex-1 justify-center"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="neu-btn bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-3 rounded-lg flex items-center gap-2 transition-all text-sm flex-1 justify-center"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <AlbumEndSlide />
        </div>
      </div>
    </section>
  );
}
