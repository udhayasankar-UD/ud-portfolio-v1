import { Award } from "lucide-react";
import { useEffect, useState } from "react";

interface Certification {
  id: string;
  title: string;
  issuer: string;
}

interface CertificationsListProps {
  certifications: Certification[];
}

export default function CertificationsList({ certifications }: CertificationsListProps) {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  useEffect(() => {
    // Stagger the entrance animations
    certifications.forEach((cert, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, cert.id]);
      }, index * 150);
    });
  }, [certifications]);

  return (
    <div className="space-y-4">
      {certifications.map((cert, index) => (
        <div
          key={cert.id}
          className={`glass-card p-6 rounded-xl group hover:bg-white/15 transition-all duration-300 cursor-pointer
            ${visibleItems.includes(cert.id) 
              ? 'animate-fade-in-up opacity-100' 
              : 'opacity-0 translate-y-8'
            }
            focus-within:ring-2 focus-within:ring-blue-glow focus-within:outline-none
          `}
          tabIndex={0}
          role="article"
          aria-label={`Certification: ${cert.title} from ${cert.issuer}`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-2 rounded-lg bg-blue-glow/20 group-hover:bg-blue-glow/30 transition-colors">
              <Award className="w-5 h-5 text-blue-glow" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-bold text-lg mb-1 group-hover:text-blue-glow transition-colors">
                {cert.title}
              </h4>
              <p className="text-gray-300 text-sm font-medium">
                {cert.issuer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}