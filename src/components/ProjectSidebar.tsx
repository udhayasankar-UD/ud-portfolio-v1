
interface Project {
  id: number;
  title: string;
  category: string;
}

interface ProjectSidebarProps {
  projects: Project[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function ProjectSidebar({ projects, activeIndex, onSelect }: ProjectSidebarProps) {
  return (
    <div className="w-[30%] min-w-[260px] max-w-[360px] glass-card backdrop-blur-lg border-r border-white/10 flex flex-col py-10 px-6 md:flex hidden">
      <div className="mb-8">
        <h2 className="text-2xl font-bold gradient-text mb-2">Projects</h2>
        <p className="text-gray-300 text-sm font-medium">Scroll to explore each project</p>
      </div>
      
      <div className="flex-1 space-y-3">
        {projects.map((project, index) => (
          <div
            key={project.id}
            onClick={() => onSelect(index)}
            className={`
              px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 relative
              ${activeIndex === index 
                ? 'bg-blue-glow/20 ring-2 ring-blue-glow font-bold text-white before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-glow' 
                : 'hover:bg-white/5 text-gray-300 hover:text-white'
              }
            `}
          >
            <div className="text-sm font-medium">{project.title}</div>
            <div className="text-xs text-blue-glow/70 mt-1">{project.category}</div>
          </div>
        ))}
        
        <div
          onClick={() => onSelect(projects.length)}
          className={`
            px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 relative
            ${activeIndex === projects.length 
              ? 'bg-blue-glow/20 ring-2 ring-blue-glow font-bold text-white before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-glow' 
              : 'hover:bg-white/5 text-gray-300 hover:text-white'
            }
          `}
        >
          <div className="text-sm font-medium">View All Projects</div>
          <div className="text-xs text-blue-glow/70 mt-1">Portfolio Summary</div>
        </div>
      </div>
      
      {/* Mobile horizontal sidebar */}
      <div className="md:hidden flex overflow-x-auto space-x-4 py-4 px-4 bg-gray-900/80 backdrop-blur-lg">
        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => onSelect(index)}
            className={`
              flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${activeIndex === index 
                ? 'bg-blue-glow text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }
            `}
          >
            {project.title}
          </button>
        ))}
      </div>
    </div>
  );
}
