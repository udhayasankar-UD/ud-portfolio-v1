
import { useState, useRef } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

interface AlbumCaseProps {
  project: Project;
  index: number;
}

export default function AlbumCase({ project, index }: AlbumCaseProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const moveX = (x - rect.width / 2) / 10;
    const moveY = (y - rect.height / 2) / 10;
    
    imageRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = 'translate(0px, 0px) scale(1)';
    setIsHovered(false);
  };

  return (
    <div
      className="flex-shrink-0 group cursor-pointer w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* CD Case Container - Larger size */}
      <div className="relative w-64 h-64 perspective-1000">
        {/* Case Shadow */}
        <div className="absolute inset-0 bg-black/20 rounded-lg transform translate-x-2 translate-y-2 blur-md" />
        
        {/* Main Case */}
        <div
          className={`
            relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 
            rounded-lg border border-white/10 overflow-hidden
            transform transition-all duration-500 ease-out
            ${isHovered 
              ? 'rotate-y-0 scale-110 shadow-2xl shadow-blue-glow/20' 
              : 'rotate-y-12 shadow-lg'
            }
          `}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Glossy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
          
          {/* Album Art */}
          <div className="relative w-full h-full p-4">
            <div className="w-full h-full bg-gradient-to-br from-blue-glow/30 to-purple-500/30 rounded border border-white/20 flex items-center justify-center overflow-hidden">
              <img
                ref={imageRef}
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-200 ease-out"
              />
              
              {/* Project Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-glow/60 to-purple-500/60">
                <div className="text-white text-4xl font-bold opacity-90">
                  {project.title.charAt(0)}
                </div>
              </div>
            </div>
          </div>

          {/* Case Spine */}
          <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-gray-700 to-gray-800 border-r border-white/10" />
          
          {/* Reflection */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
