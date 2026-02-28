import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { BrainRegion } from './BrainExplorer';

interface RegionButtonsProps {
  regions: BrainRegion[];
  selectedRegion: BrainRegion;
  onRegionSelect: (region: BrainRegion) => void;
  className?: string;
}

export default function RegionButtons({ regions, selectedRegion, onRegionSelect, className }: RegionButtonsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2 sm:gap-3 justify-center", className)}>
      {regions.map((region) => (
        <Button
          key={region.id}
          variant={selectedRegion.id === region.id ? "default" : "outline"}
          onClick={() => onRegionSelect(region)}
          className={cn(
            "relative min-w-[44px] min-h-[44px] px-4 py-2 sm:px-6 sm:py-3 font-medium transition-all duration-200 text-sm sm:text-base touch-manipulation",
            selectedRegion.id === region.id 
              ? "shadow-lg transform scale-105" 
              : "hover:scale-105 hover:shadow-md"
          )}
          style={
            selectedRegion.id === region.id ? {
              backgroundColor: region.color,
              borderColor: region.color,
              boxShadow: `0 0 20px ${region.glowColor}`,
              color: 'white'
            } : {
              borderColor: region.color,
              color: region.color
            }
          }
          aria-label={`Select ${region.name} region`}
          aria-pressed={selectedRegion.id === region.id}
        >
          <span className="relative z-10 whitespace-nowrap">{region.name}</span>
          
          {/* Glow effect on hover */}
          <div 
            className={cn(
              "absolute inset-0 rounded-md opacity-0 transition-opacity duration-200 blur-sm",
              "hover:opacity-30"
            )}
            style={{ backgroundColor: region.glowColor }}
          />
        </Button>
      ))}
    </div>
  );
}