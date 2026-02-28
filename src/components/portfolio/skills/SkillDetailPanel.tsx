import React from 'react';
import { cn } from '@/lib/utils';
import type { BrainRegion } from './BrainExplorer';

interface SkillDetailPanelProps {
  region: BrainRegion | null;
  className?: string;
}

export default function SkillDetailPanel({ region, className }: SkillDetailPanelProps) {
  if (!region) return null;

  return (
    <div className={cn(
      "bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 mt-6",
      className
    )}>
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: region.color }}
        />
        <h3 className="text-xl font-semibold text-white">
          {region.name} Skills
        </h3>
      </div>
      
      <div className="space-y-3">
        {region.skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-200 font-medium">{skill.name}</span>
              <span className="text-lg font-bold" style={{ color: region.color }}>
                {skill.value}%
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-700 ease-out",
                  "bg-gradient-to-r opacity-80"
                )}
                style={{
                  width: `${skill.value}%`,
                  backgroundImage: `linear-gradient(90deg, ${region.color}40, ${region.color})`
                }}
              />
            </div>
            
            <p className="text-sm text-gray-400">{skill.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-black/20 rounded-lg border border-white/5">
        <p className="text-sm text-gray-300">
          <strong className="text-white">Region Focus:</strong> {region.name} skills represent{' '}
          {region.id === 'design' && 'creative and visual design capabilities'}
          {region.id === 'development' && 'programming and technical development skills'}
          {region.id === 'tools' && 'modern development tools and emerging technologies'}
        </p>
      </div>
    </div>
  );
}