
import { useState } from "react";
import { ExternalLink, Github, Play } from "lucide-react";

interface Project {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
  techStack: string[];
  highlights: string[];
  links: {
    demo: string;
    github: string;
    live: string;
  };
}

interface ProjectDetailProps {
  project: Project;
  animateDirection: 'up' | 'down';
  isActive: boolean;
}

export default function ProjectDetail({ project, animateDirection, isActive }: ProjectDetailProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`
      w-full max-w-4xl mx-auto glass-card neu-card p-8 md:p-10 rounded-2xl shadow-soft-glow 
      transition-all duration-700 transform
      ${isActive ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-4'}
      ${animateDirection === 'up' ? 'animate-slide-up' : 'animate-slide-down'}
    `}>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Project Image */}
        <div className="relative group">
          <img
            src={project.image}
            alt={project.title}
            className={`
              w-full h-64 md:h-80 object-cover rounded-xl shadow-glass 
              transition-all duration-700 transform
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-lg
            `}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Project Info */}
        <div className="space-y-6">
          <div>
            <div className="text-blue-glow text-sm font-semibold mb-2">{project.category}</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h3>
            <p className="text-gray-200 text-lg leading-relaxed">{project.description}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-white font-semibold mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-blue-glow text-sm rounded-lg font-mono border border-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-white font-semibold mb-3">Key Features</h4>
            <ul className="space-y-2">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center text-gray-200">
                  <div className="w-2 h-2 bg-blue-glow rounded-full mr-3 animate-pulse" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-4">
            <a
              href={project.links.live}
              className="flex items-center gap-2 px-4 py-2 bg-blue-glow text-white rounded-lg font-semibold hover:bg-blue-500 transition-all hover:scale-105"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
            <a
              href={project.links.github}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all hover:scale-105"
            >
              <Github size={16} />
              Code
            </a>
            <a
              href={project.links.demo}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all hover:scale-105"
            >
              <Play size={16} />
              Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
