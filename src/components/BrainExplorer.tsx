import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import RegionButtons from './RegionButtons';
import Hotspot from './Hotspot';

export interface BrainRegion {
  id: 'design' | 'development' | 'tools';
  name: string;
  color: string;
  glowColor: string;
  center: { x: number; y: number };
  image: string;
  skills: Array<{ name: string; value: number; description: string }>;
}

const BRAIN_REGIONS: BrainRegion[] = [
  {
    id: 'design',
    name: 'Design',
    color: '#EC4899',
    glowColor: '#EC489950',
    center: { x: 25, y: 30 }, // Left frontal region (pink)
    image: '/lovable-uploads/44e096c9-54d4-4f0d-95ea-a399fef3a463.png',
    skills: [
      { name: 'HTML & CSS', value: 70, description: 'Strong foundation in web fundamentals' },
      { name: 'Blender', value: 20, description: 'Creating 3D models and animations' },
      { name: 'UI/UX Design', value: 65, description: 'User interface and experience design' }
    ]
  },
  {
    id: 'development',
    name: 'Development', 
    color: '#F59E0B',
    glowColor: '#F59E0B50',
    center: { x: 60, y: 25 }, // Right frontal region (yellow)
    image: '/lovable-uploads/e496caa6-ba0d-424f-a6c9-357b785aea3c.png',
    skills: [
      { name: 'JavaScript', value: 40, description: 'Solid understanding of JS concepts' },
      { name: 'React', value: 40, description: 'Building modern user interfaces' },
      { name: 'Python', value: 50, description: 'Used for scripting & game prototypes' },
      { name: 'GameDev', value: 50, description: 'Unity and game design fundamentals' }
    ]
  },
  {
    id: 'tools',
    name: 'Tools',
    color: '#EF4444',
    glowColor: '#EF444450',
    center: { x: 45, y: 75 }, // Brain stem region (red/orange)
    image: '/lovable-uploads/085aaa82-0aad-4c7c-8a38-38797a534a9e.png',
    skills: [
      { name: 'Cloud', value: 10, description: 'Exploring cloud technologies' },
      { name: 'AI & ML', value: 10, description: 'Learning machine learning basics' },
      { name: 'Build Tools', value: 35, description: 'Development workflow optimization' }
    ]
  }
];

interface BrainExplorerProps {
  onSkillsHighlight: (skills: BrainRegion['skills'], region: BrainRegion) => void;
  className?: string;
}

export default function BrainExplorer({ onSkillsHighlight, className }: BrainExplorerProps) {
  const [selectedRegion, setSelectedRegion] = useState<BrainRegion>(BRAIN_REGIONS[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [hotspotPosition, setHotspotPosition] = useState(BRAIN_REGIONS[0].center);
  const [hoveredRegion, setHoveredRegion] = useState<BrainRegion>(BRAIN_REGIONS[0]);
  const [imageOpacity, setImageOpacity] = useState({ design: 1, development: 0, tools: 0 });
  const brainRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startY: 0, isDragging: false });

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const getDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }) => {
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
  };

  const findClosestRegion = useCallback((position: { x: number; y: number }): BrainRegion => {
    let closest = BRAIN_REGIONS[0];
    let minDistance = getDistance(position, BRAIN_REGIONS[0].center);

    for (const region of BRAIN_REGIONS) {
      const distance = getDistance(position, region.center);
      if (distance < minDistance) {
        minDistance = distance;
        closest = region;
      }
    }
    return closest;
  }, []);

  const updateImageOpacity = useCallback((region: BrainRegion) => {
    const duration = prefersReducedMotion ? 0 : 200;
    const newOpacity = { design: 0, development: 0, tools: 0 };
    newOpacity[region.id] = 1;
    
    setTimeout(() => setImageOpacity(newOpacity), 0);
  }, [prefersReducedMotion]);

  const handleRegionSelect = useCallback((region: BrainRegion, snap: boolean = true) => {
    setSelectedRegion(region);
    setHoveredRegion(region);
    if (snap) {
      setHotspotPosition(region.center);
    }
    updateImageOpacity(region);
    onSkillsHighlight(region.skills, region);
    
    // Announce to screen readers
    const announcement = `${region.name} selected - ${region.skills.map(s => `${s.name} ${s.value}%`).join(', ')}`;
    const ariaLive = document.createElement('div');
    ariaLive.setAttribute('aria-live', 'polite');
    ariaLive.setAttribute('aria-atomic', 'true');
    ariaLive.className = 'sr-only';
    ariaLive.textContent = announcement;
    document.body.appendChild(ariaLive);
    setTimeout(() => document.body.removeChild(ariaLive), 1000);
  }, [onSkillsHighlight, updateImageOpacity]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!brainRef.current) return;
    
    setIsDragging(true);
    const rect = brainRef.current.getBoundingClientRect();
    dragRef.current = {
      startX: e.clientX - rect.left,
      startY: e.clientY - rect.top,
      isDragging: true
    };
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragRef.current.isDragging || !brainRef.current) return;
    
    const rect = brainRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Clamp to brain bounds
    const clampedX = Math.max(10, Math.min(90, x));
    const clampedY = Math.max(10, Math.min(90, y));
    
    setHotspotPosition({ x: clampedX, y: clampedY });
    
    const closestRegion = findClosestRegion({ x: clampedX, y: clampedY });
    if (closestRegion !== hoveredRegion) {
      setHoveredRegion(closestRegion);
      updateImageOpacity(closestRegion);
      onSkillsHighlight(closestRegion.skills, closestRegion);
    }
  }, [findClosestRegion, hoveredRegion, onSkillsHighlight, updateImageOpacity]);

  const handleMouseUp = useCallback(() => {
    if (!dragRef.current.isDragging) return;
    
    setIsDragging(false);
    dragRef.current.isDragging = false;
    
    // Snap to closest region
    const closestRegion = findClosestRegion(hotspotPosition);
    handleRegionSelect(closestRegion, true);
  }, [findClosestRegion, hotspotPosition, handleRegionSelect]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!brainRef.current) return;
    
    const touch = e.touches[0];
    const rect = brainRef.current.getBoundingClientRect();
    setIsDragging(true);
    dragRef.current = {
      startX: touch.clientX - rect.left,
      startY: touch.clientY - rect.top,
      isDragging: true
    };
    e.preventDefault();
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!dragRef.current.isDragging || !brainRef.current) return;
    
    const touch = e.touches[0];
    const rect = brainRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    
    const clampedX = Math.max(10, Math.min(90, x));
    const clampedY = Math.max(10, Math.min(90, y));
    
    setHotspotPosition({ x: clampedX, y: clampedY });
    
    const closestRegion = findClosestRegion({ x: clampedX, y: clampedY });
    if (closestRegion !== hoveredRegion) {
      setHoveredRegion(closestRegion);
      updateImageOpacity(closestRegion);
      onSkillsHighlight(closestRegion.skills, closestRegion);
    }
    e.preventDefault();
  }, [findClosestRegion, hoveredRegion, onSkillsHighlight, updateImageOpacity]);

  // Event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = BRAIN_REGIONS.findIndex(r => r.id === selectedRegion.id);
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = e.key === 'ArrowLeft' 
        ? (currentIndex - 1 + BRAIN_REGIONS.length) % BRAIN_REGIONS.length
        : (currentIndex + 1) % BRAIN_REGIONS.length;
      handleRegionSelect(BRAIN_REGIONS[nextIndex]);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRegionSelect(selectedRegion);
    }
  };

  // Initialize
  useEffect(() => {
    handleRegionSelect(BRAIN_REGIONS[0], false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Brain Card */}
      <div 
        ref={brainRef}
        className="relative w-full aspect-square bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="application"
        aria-label="Interactive brain explorer. Use arrow keys to navigate regions or drag the hotspot."
      >
        {/* Brain Images */}
        <div className="relative w-full h-full">
          {BRAIN_REGIONS.map((region) => (
            <img
              key={region.id}
              src={region.image}
              alt={`Brain with ${region.name.toLowerCase()} region highlighted`}
              className={cn(
                "absolute inset-0 w-full h-full object-contain transition-opacity pointer-events-none",
                prefersReducedMotion ? "duration-0" : "duration-200"
              )}
              style={{ opacity: imageOpacity[region.id] }}
              loading="lazy"
            />
          ))}
          
          {/* Hotspot */}
          <Hotspot 
            position={hotspotPosition}
            isDragging={isDragging}
            color={hoveredRegion.color}
            glowColor={hoveredRegion.glowColor}
            reducedMotion={prefersReducedMotion}
          />
          
          {/* Connection Line */}
          {isDragging && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1={`${hotspotPosition.x}%`}
                y1={`${hotspotPosition.y}%`}
                x2={`${hoveredRegion.center.x}%`}
                y2={`${hoveredRegion.center.y}%`}
                stroke={hoveredRegion.color}
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.5"
                className={cn(
                  "transition-all",
                  prefersReducedMotion ? "duration-0" : "duration-200"
                )}
              />
            </svg>
          )}
        </div>
      </div>
      
      {/* Region Buttons */}
      <RegionButtons 
        regions={BRAIN_REGIONS}
        selectedRegion={selectedRegion}
        onRegionSelect={(region) => handleRegionSelect(region, true)}
        className="mt-6"
      />
    </div>
  );
}