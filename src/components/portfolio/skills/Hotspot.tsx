import React from 'react';
import { cn } from '@/lib/utils';

interface HotspotProps {
  position: { x: number; y: number };
  isDragging: boolean;
  color: string;
  glowColor: string;
  reducedMotion: boolean;
}

export default function Hotspot({ position, isDragging, color, glowColor, reducedMotion }: HotspotProps) {
  return (
    <div
      className={cn(
        "absolute w-8 h-8 pointer-events-none transition-all transform -translate-x-1/2 -translate-y-1/2 z-10",
        isDragging ? "scale-125" : "scale-100",
        reducedMotion ? "duration-0" : "duration-200"
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      {/* Outer glow */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full blur-sm opacity-60",
          isDragging ? "scale-150" : "scale-100",
          reducedMotion ? "transition-none" : "transition-transform duration-300"
        )}
        style={{ 
          backgroundColor: glowColor,
          boxShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`
        }}
      />
      
      {/* Main ring */}
      <div 
        className={cn(
          "absolute inset-1 rounded-full border-2 bg-white/10 backdrop-blur-sm",
          isDragging ? "border-white/80" : "border-white/60",
          reducedMotion ? "transition-none" : "transition-colors duration-200"
        )}
        style={{ borderColor: color }}
      />
      
      {/* Inner dot */}
      <div 
        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: color }}
      />
      
      {/* Particle trail effect */}
      {isDragging && !reducedMotion && (
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-pulse"
              style={{
                backgroundColor: color,
                left: `${50 + (Math.random() - 0.5) * 100}%`,
                top: `${50 + (Math.random() - 0.5) * 100}%`,
                animationDelay: `${i * 100}ms`,
                animationDuration: '600ms'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}