
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

interface AlbumDetailsCardProps {
  project: Project;
  className?: string;
}

export default function AlbumDetailsCard({ project, className = "" }: AlbumDetailsCardProps) {
  return (
    <div className={`neu-card p-6 backdrop-blur-md bg-gray-800/90 ${className}`}>
      <h3 className="gradient-text text-2xl font-bold mb-3">
        {project.title}
      </h3>
      
      <p className="text-white/80 mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="mb-6">
        <h4 className="text-blue-glow font-semibold mb-2 text-sm">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="bg-blue-glow/20 text-blue-glow px-3 py-1 rounded-full text-sm font-medium"
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
          className="neu-btn bg-blue-glow hover:bg-blue-400 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
        >
          <ExternalLink size={16} />
          Live Demo
        </a>
        <a
          href={project.githubUrl}
          className="neu-btn bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
        >
          <Github size={16} />
          Code
        </a>
      </div>
    </div>
  );
}
