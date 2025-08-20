import { useState, useEffect, useRef } from "react";

interface Skill {
  name: string;
  value: number;
  color: string;
  description: string;
}

interface SkillsChartProps {
  skills: Skill[];
}

// Y-axis labels mapping
const yAxisLabels = [
  { value: 0, label: "Newbie" },
  { value: 20, label: "Don't Ask" },
  { value: 40, label: "Well... Um" },
  { value: 60, label: "Cool Beans" },
  { value: 80, label: "Goat" }
];

export default function SkillsChart({ skills }: SkillsChartProps) {
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

  // Generate path points for area chart
  const generateAreaPath = (skills: Skill[]) => {
    const points = skills.map((skill, index) => {
      const x = (index / (skills.length - 1)) * innerWidth;
      const y = innerHeight - (skill.value / 80) * innerHeight;
      return { x, y, skill };
    });

    let path = `M 0 ${innerHeight}`;
    points.forEach((point, index) => {
      if (index === 0) {
        path += ` L ${point.x} ${point.y}`;
      } else {
        // Create smooth curves between points
        const prevPoint = points[index - 1];
        const controlPoint1X = prevPoint.x + (point.x - prevPoint.x) * 0.3;
        const controlPoint2X = prevPoint.x + (point.x - prevPoint.x) * 0.7;
        path += ` C ${controlPoint1X} ${prevPoint.y}, ${controlPoint2X} ${point.y}, ${point.x} ${point.y}`;
      }
    });
    path += ` L ${innerWidth} ${innerHeight} Z`;
    return { path, points };
  };

  const { path: mainPath, points } = generateAreaPath(skills);

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
      <div className="glass-card p-6 rounded-xl">
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
            <linearGradient id="skillsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.8} />
              <stop offset="50%" stopColor="#818CF8" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#6B8CFF" stopOpacity={0.3} />
            </linearGradient>
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

            {/* Main area path */}
            <path
              d={mainPath}
              fill="url(#skillsGradient)"
              stroke="#60A5FA"
              strokeWidth={2}
              filter="url(#glow)"
              className="drop-shadow-lg"
            />

            {/* Data points */}
            {points.map((point, index) => (
              <g key={point.skill.name}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={hoveredSkill === point.skill.name ? 8 : 6}
                  fill={point.skill.color}
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth={2}
                  className="transition-all duration-200 cursor-pointer"
                  filter="url(#glow)"
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
                
                {/* Skill labels */}
                <text
                  x={point.x}
                  y={innerHeight + 20}
                  textAnchor="middle"
                  className="text-xs fill-gray-300 font-medium"
                  transform={`rotate(-45, ${point.x}, ${innerHeight + 20})`}
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