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
    <div className={cn("flex gap-3 justify-center", className)}>
      {regions.map((region) => (
        <Button
          key={region.id}
          variant={selectedRegion.id === region.id ? "default" : "outline"}
          onClick={() => onRegionSelect(region)}
          className={cn(
            "relative px-6 py-3 font-medium transition-all duration-200",
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
          <span className="relative z-10">{region.name}</span>
          
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