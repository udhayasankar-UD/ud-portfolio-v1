import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AlbumCase from "./AlbumCase";
import AlbumEndSlide from "./AlbumEndSlide";
import { useIsMobile } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "மொழியாம்",
    description: "A vibrant social hub for the Tamil literary world. Write, share, and discover stories and poems while connecting with fellow language lovers.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Dashboard"],
    image: "/Assets/Project_img/mozhiyaam.png",
    liveUrl: "https://mozhiyaam.vercel.app/",
    githubUrl: "https://github.com/udhayasankar0/mozhiyaam"
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
    title: "Civic Radar ",
    description: "A citizen-powered app that uses AI to deliver smarter and faster real-time alerts on local incidents like traffic, safety hazards, and civic issues.",
    tech: ["React", "TypeScript", "Twilio"],
    image: "/Assets/Project_img/Civic Radar.png",
    liveUrl: "https://civicradar.vercel.app/",
    githubUrl: "https://github.com/udhayasankar0/civicradar"
  },
  {
    id: 4,
    title: "Car-Park AI",
    description: "AI-powered parking solution with real-time dashboard and intelligent web UI for optimal space management",
    tech: ["React", "Python", "AI/ML", "Dashboard"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Luca Survival Rescue Mission (LSRM)",
    description: "A story-driven 2D adventure where a rescue mission uncovers a dark conspiracy. Navigate treacherous, handcrafted pixel-art landscapes, solving puzzles to save the one you love.",
    tech: ["Unity", "C#", "2D"],
    image: "/Assets/Project_img/lucas.png",
    liveUrl: "#",
    githubUrl: "#"
  }
];

export default function AlbumProjectsSection() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Mobile carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll functionality for mobile
  useEffect(() => {
    if (!isMobile) return; // Only for mobile

    if (isAutoPlaying && !isDragging) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }, 4000); // Auto-advance every 4 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMobile, isAutoPlaying, isDragging]);

  // Desktop GSAP horizontal scroll
  useEffect(() => {
    if (isMobile) return; // Skip GSAP on mobile

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
  }, [isMobile]);

  // Mobile touch handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isMobile) return;
    setIsDragging(true);
    setIsAutoPlaying(false); // Pause auto-scroll on interaction
    setDragStart(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isMobile || !isDragging) return;
    const offset = e.clientX - dragStart;
    setDragOffset(offset);
  };

  const handlePointerUp = () => {
    if (!isMobile) return;
    setIsDragging(false);

    // Determine if we should change slides
    const threshold = 50; // pixels
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (dragOffset < 0 && currentIndex < projects.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
    
    setDragOffset(0);
    
    // Resume auto-scroll after a delay
    setTimeout(() => setIsAutoPlaying(true), 2000);
  };

  // Calculate transform for mobile carousel
  const getTransform = () => {
    if (!isMobile) return 'translateX(0)';
    const cardWidth = typeof window !== 'undefined' ? window.innerWidth - 48 : 327; // calc(100vw - 48px)
    const gap = 24; // 1.5rem
    const baseTransform = -(currentIndex * (cardWidth + gap));
    return `translateX(${baseTransform + dragOffset}px)`;
  };

  if (isMobile) {
    // Mobile Layout - Vertical stacking with swipeable carousel
    return (
      <section
        id="projects"
        className="relative min-h-screen py-20 px-3 bg-gradient-to-br from-gray-800 via-gray-900 to-black overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.1),transparent_50%)]" />
        </div>

        {/* Section Title */}
        <div className="relative z-10 mb-8">
          <h2 className="gradient-text text-3xl font-bold text-center">
            Top Collection
          </h2>
        </div>

        {/* Mobile Swipeable Carousel */}
        <div className="relative z-10 overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-300 ease-out"
            style={{
              transform: getTransform(),
              touchAction: 'pan-y',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-[calc(100vw-48px)]"
              >
                {/* Project Card */}
                <div className="neu-card p-4 backdrop-blur-md bg-gray-800/90 h-auto flex flex-col">
                  {/* Project Case at the top */}
                  <div className="flex-shrink-0 mb-4 h-[280px] flex items-center justify-center">
                    <AlbumCase project={project} index={index} isMobile={true} />
                  </div>
                  
                  {/* Project Details */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="gradient-text text-xl font-bold mb-3 line-clamp-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-white/80 mb-4 leading-relaxed text-sm flex-1 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Bottom Content Wrapper - Groups Tech Stack and Buttons */}
                    <div className="flex-shrink-0 space-y-4">
                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-blue-glow font-semibold mb-2 text-xs">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="bg-blue-glow/20 text-blue-glow px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <a
                          href={project.liveUrl}
                          className="neu-btn bg-blue-glow hover:bg-blue-400 text-white font-semibold px-3 py-2 rounded-lg flex items-center gap-2 transition-all text-xs flex-1 justify-center touch-target"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </a>
                        <a
                          href={project.githubUrl}
                          className="neu-btn bg-gray-700 hover:bg-gray-600 text-white font-semibold px-3 py-2 rounded-lg flex items-center gap-2 transition-all text-xs flex-1 justify-center touch-target"
                          target="_blank"
                          rel="noopener noreferrer"
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
              </div>
            ))}
          </div>

          {/* Pagination with Cover Images */}
          <div className="flex justify-center gap-3 mt-6">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  // Resume auto-scroll after user interaction
                  setTimeout(() => setIsAutoPlaying(true), 3000);
                }}
                className={`relative w-12 h-12 rounded-full overflow-hidden transition-all touch-target border-2 ${
                  index === currentIndex
                    ? 'border-blue-glow scale-110 shadow-lg shadow-blue-glow/30'
                    : 'border-white/30 scale-100'
                }`}
                aria-label={`Go to project ${index + 1}: ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={`${project.title} thumbnail`}
                  className="w-full h-full object-cover"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-blue-glow/20 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop/Tablet Layout - Original GSAP horizontal scroll
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
      <div className="absolute top-24 left-12 z-20 pointer-events-none">
        <h2 className="gradient-text text-3xl md:text-5xl font-bold drop-shadow-2xl leading-tight">
          Top Collection
        </h2>
      </div>

      {/* Main Content */}
      <div className="relative h-full flex items-center pt-20">
        {/* Combined Project Cards Track */}
        <div
          ref={trackRef}
          className="flex items-stretch gap-12 px-12 min-w-max case-track"
        >
          {projects.map((project, index) => (
            <div key={project.id} className="flex-shrink-0">
              {/* Responsive Project Card */}
              <div className="neu-card p-6 backdrop-blur-md bg-gray-800/90 w-[380px] h-[580px] lg:w-[480px] lg:h-[680px] flex flex-col">
                {/* Project Case at the top - Fixed Height */}
                <div className="flex-shrink-0 mb-6 h-[280px] lg:h-[320px] flex items-center justify-center">
                  <AlbumCase project={project} index={index} isMobile={false} />
                </div>
                
                {/* Project Details - Flexible Height */}
                <div className="flex-1 flex flex-col">
                  <h3 className="gradient-text text-xl lg:text-2xl font-bold mb-4 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/80 mb-6 leading-relaxed text-sm lg:text-base flex-1 line-clamp-4">
                    {project.description}
                  </p>

                  {/* Bottom Content Wrapper - Groups Tech Stack and Buttons */}
                  <div className="flex-shrink-0 space-y-6">
                    {/* Tech Stack */}
                    <div>
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
                    <div className="flex gap-3">
                      <a
                        href={project.liveUrl}
                        className="neu-btn bg-blue-glow hover:bg-blue-400 text-white font-semibold px-4 py-3 rounded-lg flex items-center gap-2 transition-all text-sm flex-1 justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        className="neu-btn bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-3 rounded-lg flex items-center gap-2 transition-all text-sm flex-1 justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Code
                      </a>
                    </div>
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
