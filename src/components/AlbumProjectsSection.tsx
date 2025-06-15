
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
    title: "AI-Powered Task Manager",
    description: "Intelligent task management system with natural language processing and smart prioritization",
    tech: ["React", "TypeScript", "OpenAI API", "Supabase"],
    image: "/placeholder.svg",
    liveUrl: "https://ai-task-manager.demo.com",
    githubUrl: "https://github.com/yourusername/ai-task-manager"
  },
  {
    id: 2,
    title: "Real-Time Collaboration Platform",
    description: "Multi-user workspace with live editing, video calls, and project management features",
    tech: ["React", "Socket.io", "Node.js", "MongoDB"],
    image: "/placeholder.svg",
    liveUrl: "https://collab-platform.demo.com",
    githubUrl: "https://github.com/yourusername/collab-platform"
  },
  {
    id: 3,
    title: "3D Portfolio Website",
    description: "Interactive portfolio with Three.js animations and immersive user experience",
    tech: ["React", "Three.js", "GSAP", "Tailwind CSS"],
    image: "/placeholder.svg",
    liveUrl: "https://3d-portfolio.demo.com",
    githubUrl: "https://github.com/yourusername/3d-portfolio"
  },
  {
    id: 4,
    title: "E-Commerce Analytics Dashboard",
    description: "Comprehensive analytics platform with real-time data visualization and reporting",
    tech: ["React", "Chart.js", "Firebase", "Stripe API"],
    image: "/placeholder.svg",
    liveUrl: "https://ecommerce-analytics.demo.com",
    githubUrl: "https://github.com/yourusername/ecommerce-analytics"
  },
  {
    id: 5,
    title: "Mobile-First Social App",
    description: "Social networking platform optimized for mobile with PWA capabilities",
    tech: ["React", "PWA", "WebRTC", "PostgreSQL"],
    image: "/placeholder.svg",
    liveUrl: "https://social-app.demo.com",
    githubUrl: "https://github.com/yourusername/social-app"
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
          Top Collection
        </h2>
        <p className="text-white/60 text-lg mt-2">
          Scroll to explore my featured projects
        </p>
      </div>
    </section>
  );
}
