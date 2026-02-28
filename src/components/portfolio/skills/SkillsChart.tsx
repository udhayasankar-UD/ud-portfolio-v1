import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  value: number;
  color: string;
  description: string;
}

interface SkillsChartProps {
  skills: Skill[];
  highlightedSkills?: Array<{ name: string; value: number; description: string }>;
  regionColor?: string;
}

// Y-axis labels mapping
const yAxisLabels = [
  { value: 0, label: "Newbie" },
  { value: 20, label: "Don't Ask" },
  { value: 40, label: "Well... Um" },
  { value: 60, label: "Cool Beans" },
  { value: 80, label: "Goat" }
];

export default function SkillsChart({ skills, highlightedSkills = [], regionColor }: SkillsChartProps) {
  const [tooltip, setTooltip] = useState<{
    skill: Skill;
    x: number;
    y: number;
    visible: boolean;
  }>({ skill: skills[0], x: 0, y: 0, visible: false });
  
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const chartWidth = 500;
  const chartHeight = 300;
  const padding = { top: 20, right: 60, bottom: 60, left: 120 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Generate triangular layered paths inspired by the reference
  const generateTriangularPaths = (skills: Skill[]) => {
    const points = skills.map((skill, index) => {
      const x = (index / (skills.length - 1)) * innerWidth;
      const y = innerHeight - (skill.value / 80) * innerHeight;
      return { x, y, skill };
    });

    // Create multiple layers with triangular shapes
    const layers = [];
    
    // Layer 1: Main triangular area (darkest)
    let mainPath = `M 0 ${innerHeight}`;
    points.forEach((point, index) => {
      if (index === 0) {
        mainPath += ` L ${point.x} ${point.y}`;
      } else {
        mainPath += ` L ${point.x} ${point.y}`;
      }
    });
    mainPath += ` L ${innerWidth} ${innerHeight} Z`;
    
    // Layer 2: Secondary triangular overlay (medium opacity)
    let secondPath = `M ${innerWidth * 0.15} ${innerHeight}`;
    points.slice(1, -1).forEach((point, index) => {
      const adjustedY = point.y + (innerHeight - point.y) * 0.3;
      if (index === 0) {
        secondPath += ` L ${point.x} ${adjustedY}`;
      } else {
        secondPath += ` L ${point.x} ${adjustedY}`;
      }
    });
    secondPath += ` L ${innerWidth * 0.85} ${innerHeight} Z`;
    
    // Layer 3: Top triangular highlight (lightest)
    let topPath = `M ${innerWidth * 0.25} ${innerHeight}`;
    const highPoints = points.slice(2, -2);
    highPoints.forEach((point, index) => {
      const adjustedY = point.y + (innerHeight - point.y) * 0.6;
      if (index === 0) {
        topPath += ` L ${point.x} ${adjustedY}`;
      } else {
        topPath += ` L ${point.x} ${adjustedY}`;
      }
    });
    topPath += ` L ${innerWidth * 0.75} ${innerHeight} Z`;

    layers.push({
      path: mainPath,
      opacity: 0.8,
      color: '#60A5FA'
    });
    
    layers.push({
      path: secondPath,
      opacity: 0.6,
      color: '#818CF8'
    });
    
    layers.push({
      path: topPath,
      opacity: 0.4,
      color: '#6B8CFF'
    });

    return { layers, points };
  };

  const { layers, points } = generateTriangularPaths(skills);

  const handleMouseMove = (event: React.MouseEvent, skill: Skill) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setTooltip({
        skill,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top - 10,
        visible: true
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
    setHoveredSkill(null);
  };

  // Mobile fallback: horizontal bars
  if (isMobile) {
    return (
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold text-sm">{skill.name}</span>
              <span className="text-blue-glow text-sm font-bold">{skill.value}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  backgroundColor: skill.color,
                  width: `${skill.value}%`,
                  animationDelay: `${index * 100}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-xl relative">
      <div className="relative">
        <svg
          ref={svgRef}
          width={chartWidth}
          height={chartHeight}
          className="w-full h-auto"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          role="img"
          aria-label="Skills visualization chart"
        >
          <defs>
            {/* Paper texture pattern */}
            <pattern id="paperTexture" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="rotate(45)">
              <rect width="100" height="100" fill="rgba(255,255,255,0.005)"/>
              <circle cx="20" cy="20" r="0.5" fill="rgba(255,255,255,0.02)"/>
              <circle cx="80" cy="40" r="0.3" fill="rgba(255,255,255,0.01)"/>
              <circle cx="50" cy="70" r="0.4" fill="rgba(255,255,255,0.015)"/>
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Chart area */}
          <g transform={`translate(${padding.left}, ${padding.top})`}>
            
            {/* Grid lines */}
            {yAxisLabels.map((label) => (
              <g key={label.value}>
                <line
                  x1={0}
                  y1={innerHeight - (label.value / 80) * innerHeight}
                  x2={innerWidth}
                  y2={innerHeight - (label.value / 80) * innerHeight}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={1}
                />
              </g>
            ))}

            {/* Triangular layers */}
            {layers.map((layer, index) => (
              <path
                key={index}
                d={layer.path}
                fill={
                  highlightedSkills.length > 0 && regionColor 
                    ? regionColor 
                    : layer.color
                }
                fillOpacity={
                  highlightedSkills.length > 0 
                    ? layer.opacity + 0.2
                    : layer.opacity
                }
                stroke={
                  highlightedSkills.length > 0 && regionColor 
                    ? regionColor 
                    : "none"
                }
                strokeWidth={highlightedSkills.length > 0 ? 1 : 0}
                strokeOpacity={0.6}
                className={cn(
                  "drop-shadow-sm transition-all duration-500",
                  highlightedSkills.length > 0 && "drop-shadow-lg"
                )}
                style={{
                  filter: highlightedSkills.length > 0 && regionColor
                    ? `drop-shadow(0 0 8px ${regionColor}50)`
                    : undefined
                }}
              />
            ))}
            
            {/* Enhanced glow for highlighted region */}
            {highlightedSkills.length > 0 && regionColor && layers.map((layer, index) => (
              <path
                key={`glow-${index}`}
                d={layer.path}
                fill="none"
                stroke={regionColor}
                strokeWidth={2}
                strokeOpacity={0.3}
                className="animate-pulse"
                style={{
                  filter: `blur(4px)`
                }}
              />
            ))}
            
            {/* Paper texture overlay */}
            <rect
              x={0}
              y={0}
              width={innerWidth}
              height={innerHeight}
              fill="url(#paperTexture)"
              opacity={0.3}
            />

            {/* Data points with guide lines */}
            {points.map((point, index) => (
              <g key={point.skill.name}>
                {/* Vertical guide line */}
                <line
                  x1={point.x}
                  y1={innerHeight}
                  x2={point.x}
                  y2={point.y}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth={1}
                  strokeDasharray="2,2"
                />
                
                {/* Data point circle */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={
                    highlightedSkills.some(h => h.name === point.skill.name) ? 10 :
                    hoveredSkill === point.skill.name ? 8 : 6
                  }
                  fill={
                    highlightedSkills.some(h => h.name === point.skill.name) && regionColor 
                      ? regionColor 
                      : point.skill.color
                  }
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth={
                    highlightedSkills.some(h => h.name === point.skill.name) ? 3 : 2
                  }
                  className="transition-all duration-300 cursor-pointer"
                  filter={
                    highlightedSkills.some(h => h.name === point.skill.name)
                      ? "url(#glow)"
                      : "url(#glow)"
                  }
                  style={{
                    boxShadow: highlightedSkills.some(h => h.name === point.skill.name) && regionColor
                      ? `0 0 20px ${regionColor}50`
                      : undefined
                  }}
                  onMouseEnter={(e) => {
                    setHoveredSkill(point.skill.name);
                    handleMouseMove(e, point.skill);
                  }}
                  onMouseMove={(e) => handleMouseMove(e, point.skill)}
                  onMouseLeave={handleMouseLeave}
                  tabIndex={0}
                  role="button"
                  aria-label={`${point.skill.name}: ${point.skill.value}%`}
                  aria-describedby={`tooltip-${point.skill.name}`}
                  onFocus={() => {
                    setHoveredSkill(point.skill.name);
                    setTooltip({
                      skill: point.skill,
                      x: point.x + padding.left,
                      y: point.y + padding.top - 10,
                      visible: true
                    });
                  }}
                  onBlur={handleMouseLeave}
                />
                
                {/* Skill labels (tilted) */}
                <text
                  x={point.x}
                  y={innerHeight + 20}
                  textAnchor="middle"
                  className="text-xs fill-gray-300 font-medium"
                  transform={`rotate(-20, ${point.x}, ${innerHeight + 20})`}
                >
                  {point.skill.name}
                </text>
              </g>
            ))}

            {/* Y-axis */}
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={innerHeight}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={2}
            />

            {/* Y-axis labels */}
            {yAxisLabels.map((label) => (
              <text
                key={label.value}
                x={-10}
                y={innerHeight - (label.value / 80) * innerHeight + 4}
                textAnchor="end"
                className="text-xs fill-gray-300 font-medium"
              >
                {label.label}
              </text>
            ))}
          </g>
        </svg>

        {/* Tooltip */}
        {tooltip.visible && (
          <div
            className="absolute pointer-events-none z-10 bg-gray-800 border border-white/20 rounded-lg p-3 shadow-lg backdrop-blur-sm"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)'
            }}
            id={`tooltip-${tooltip.skill.name}`}
            role="tooltip"
          >
            <div className="text-white font-bold text-sm mb-1">
              {tooltip.skill.name}
            </div>
            <div className="text-blue-glow font-semibold text-sm mb-1">
              {tooltip.skill.value}%
            </div>
            <div className="text-gray-300 text-xs max-w-48">
              {tooltip.skill.description}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        {skills.slice(0, 4).map((skill) => (
          <div key={skill.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: skill.color }}
            />
            <span className="text-xs text-gray-300">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}