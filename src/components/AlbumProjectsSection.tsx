
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AlbumCase from "./AlbumCase";
import AlbumDetailsCard from "./AlbumDetailsCard";
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

      {/* Section Title - Positioned to not overlap with projects */}
      <div className="absolute top-16 left-8 z-10 pointer-events-none">
        <h2 className="gradient-text text-3xl md:text-5xl font-bold drop-shadow-2xl">
          Top Collection
        </h2>
        <p className="text-white/90 text-base mt-1 drop-shadow-lg">
          Scroll to explore my featured projects
        </p>
      </div>

      {/* Main Content */}
      <div className="relative h-full flex items-center pt-24">
        {/* Cases Track with project details below each case */}
        <div
          ref={trackRef}
          className="flex items-start gap-16 px-32 min-w-max case-track"
        >
          {projects.map((project, index) => (
            <div key={project.id} className="flex flex-col items-center gap-6">
              <AlbumCase
                project={project}
                index={index}
              />
              
              {/* Details Card positioned below each case */}
              <div className="w-[420px] flex-shrink-0">
                <AlbumDetailsCard
                  project={project}
                  className="opacity-100"
                />
              </div>
            </div>
          ))}
          <AlbumEndSlide />
        </div>
      </div>
    </section>
  );
}
