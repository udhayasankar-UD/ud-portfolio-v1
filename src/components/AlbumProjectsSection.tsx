
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
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/placeholder.svg",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    tech: ["React", "Firebase", "Tailwind CSS"],
    image: "/placeholder.svg",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Real-time weather data visualization with interactive charts",
    tech: ["React", "Chart.js", "Weather API"],
    image: "/placeholder.svg",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Personal portfolio with 3D animations and modern design",
    tech: ["React", "Three.js", "GSAP", "Tailwind"],
    image: "/placeholder.svg",
    liveUrl: "#",
    githubUrl: "#"
  }
];

export default function AlbumProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const details = detailsRef.current;

    if (!container || !track || !details) return;

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
        onUpdate: (self) => {
          // Update active project based on scroll progress
          const progress = self.progress;
          const activeIndex = Math.floor(progress * projects.length);
          
          // Update details card
          const detailCards = details.querySelectorAll('.detail-card');
          detailCards.forEach((card, index) => {
            if (index === activeIndex) {
              gsap.to(card, { opacity: 1, y: 0, duration: 0.3 });
            } else {
              gsap.to(card, { opacity: 0, y: 20, duration: 0.3 });
            }
          });
        }
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

      {/* Main Content */}
      <div className="relative h-full flex items-center">
        {/* Cases Track */}
        <div
          ref={trackRef}
          className="flex items-center gap-8 px-20 min-w-max case-track"
        >
          {projects.map((project, index) => (
            <AlbumCase
              key={project.id}
              project={project}
              index={index}
            />
          ))}
          <AlbumEndSlide />
        </div>
      </div>

      {/* Details Panel */}
      <div
        ref={detailsRef}
        className="absolute bottom-8 left-8 right-8 md:right-auto md:w-96"
      >
        {projects.map((project, index) => (
          <AlbumDetailsCard
            key={project.id}
            project={project}
            className={`detail-card ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      {/* Section Title */}
      <div className="absolute top-8 left-8">
        <h2 className="gradient-text text-4xl md:text-6xl font-bold">
          My Collection
        </h2>
        <p className="text-white/60 text-lg mt-2">
          Scroll to explore my projects
        </p>
      </div>
    </section>
  );
}
