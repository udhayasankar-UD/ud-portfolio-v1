
import { useState, useEffect, useRef } from "react";
import ProjectSidebar from "./ProjectSidebar";
import ProjectDetail from "./ProjectDetail";
import ProjectFinalPanel from "./ProjectFinalPanel";

const projects = [
  {
    id: 1,
    title: "Your Wellbeing",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
    category: "Apps",
    description: "A modern React-driven app for wellness and self-care. Built with cutting-edge technology to help users track their mental health, meditation practices, and daily wellness routines.",
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    highlights: ["Real-time mood tracking", "AI-powered insights", "Community features"],
    links: { demo: "#", github: "#", live: "#" }
  },
  {
    id: 2,
    title: "Unsung Empires: The Cholas II",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    category: "Games",
    description: "Epic historical strategy game featuring the Chola dynasty. Contributed to 3D modeling, AI systems, and core gameplay mechanics in this immersive strategy experience.",
    techStack: ["Unity", "C#", "Blender", "AI Systems", "3D Modeling"],
    highlights: ["Advanced AI opponents", "Historical accuracy", "Stunning 3D visuals"],
    links: { demo: "#", github: "#", live: "#" }
  },
  {
    id: 3,
    title: "Car-Park AI",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    category: "Apps",
    description: "AI-powered parking solution with real-time dashboard and intuitive web interface. Uses computer vision to detect available parking spots and optimize traffic flow.",
    techStack: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL"],
    highlights: ["Computer vision detection", "Real-time analytics", "Smart routing"],
    links: { demo: "#", github: "#", live: "#" }
  },
  {
    id: 4,
    title: "Game Portfolio",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    category: "Games",
    description: "Comprehensive showcase of indie game projects including thumbnails, demo builds, and playtest videos. Features interactive galleries and gameplay highlights.",
    techStack: ["Unity", "JavaScript", "WebGL", "Video Editing", "UI/UX"],
    highlights: ["Interactive demos", "Video showcases", "Playable prototypes"],
    links: { demo: "#", github: "#", live: "#" }
  },
  {
    id: 5,
    title: "AURA e-Commerce Revamp",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=600&q=80",
    category: "Apps",
    description: "Complete UI/UX overhaul for efficient online shopping experience. Lightning-fast single-page application with modern design principles and seamless user interactions.",
    techStack: ["React", "Redux", "SCSS", "Webpack", "Node.js"],
    highlights: ["Performance optimization", "Modern UI design", "Mobile-first approach"],
    links: { demo: "#", github: "#", live: "#" }
  },
  {
    id: 6,
    title: "Interion Workshop",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    category: "Open Source",
    description: "API-driven interior design playground where users can experiment with different layouts, furniture, and color schemes. Open source project with active community contributions.",
    techStack: ["Vue.js", "Three.js", "Express.js", "Docker", "Open Source"],
    highlights: ["3D visualization", "API-driven", "Community contributions"],
    links: { demo: "#", github: "#", live: "#" }
  }
];

export default function ProjectsShowcase() {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animateDirection, setAnimateDirection] = useState<'up' | 'down'>('down');
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        const intersectionRatio = entry.intersectionRatio;
        
        if (isIntersecting && intersectionRatio > 0.5) {
          setIsActive(true);
          setIsExiting(false);
        } else if (isActive && intersectionRatio < 0.1) {
          setIsExiting(true);
          setTimeout(() => {
            setIsActive(false);
            setIsExiting(false);
          }, 300);
        }
      },
      { 
        threshold: [0, 0.1, 0.5, 0.9, 1],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isActive]);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    
    if (isActive && !isExiting) {
      body.style.overflow = "hidden";
      html.style.scrollBehavior = "smooth";
    } else {
      body.style.overflow = "";
      setTimeout(() => {
        html.style.scrollBehavior = "";
      }, 500);
    }
    
    return () => {
      body.style.overflow = "";
      html.style.scrollBehavior = "";
    };
  }, [isActive, isExiting]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Debounce scroll changes to make them less sensitive
    scrollTimeoutRef.current = setTimeout(() => {
      const scrollTop = containerRef.current!.scrollTop;
      const containerHeight = containerRef.current!.scrollHeight;
      const viewportHeight = containerRef.current!.clientHeight;
      const maxScroll = containerHeight - viewportHeight;
      
      // Add threshold to prevent small scroll changes
      const scrollThreshold = 100; // pixels
      const effectiveScroll = Math.max(0, scrollTop - scrollThreshold);
      const adjustedMaxScroll = Math.max(1, maxScroll - scrollThreshold);
      
      const newIndex = Math.round((effectiveScroll / adjustedMaxScroll) * projects.length);
      const clampedIndex = Math.min(newIndex, projects.length);
      
      if (clampedIndex !== currentIndex) {
        setAnimateDirection(clampedIndex > currentIndex ? 'down' : 'up');
        setCurrentIndex(clampedIndex);
      }
    }, 150); // 150ms debounce
  };

  const handleSidebarSelect = (index: number) => {
    if (!containerRef.current) return;
    
    const containerHeight = containerRef.current.scrollHeight;
    const viewportHeight = containerRef.current.clientHeight;
    const maxScroll = containerHeight - viewportHeight;
    const targetScroll = (index / projects.length) * maxScroll;
    
    containerRef.current.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section
      ref={sectionRef}
      id="projects-showcase"
      className="h-screen w-full relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-glow/10"
    >
      {isActive && (
        <div className={`
          fixed inset-0 z-30 flex w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-glow/10
          transition-all duration-500 ease-out
          ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        `}>
          <ProjectSidebar
            projects={projects}
            activeIndex={currentIndex}
            onSelect={handleSidebarSelect}
          />
          
          <div
            ref={containerRef}
            className="flex-1 h-full overflow-y-auto overflow-x-hidden scroll-smooth"
            onScroll={handleScroll}
            style={{ 
              scrollSnapType: 'y proximity',
              scrollBehavior: 'smooth'
            }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="h-screen flex items-center justify-center p-8"
                style={{ scrollSnapAlign: 'start' }}
              >
                <ProjectDetail 
                  project={project} 
                  animateDirection={animateDirection}
                  isActive={index === currentIndex}
                />
              </div>
            ))}
            
            <div 
              className="h-screen flex items-center justify-center"
              style={{ scrollSnapAlign: 'start' }}
            >
              <ProjectFinalPanel isActive={currentIndex === projects.length} />
            </div>
            
            {/* Add extra space after the final panel to allow scrolling past it */}
            <div className="h-20"></div>
          </div>
        </div>
      )}
    </section>
  );
}
