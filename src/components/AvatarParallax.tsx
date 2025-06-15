
import React, { useRef, useState } from "react";

interface AvatarParallaxProps {
  src: string;
  alt: string;
  className?: string;
}

export default function AvatarParallax({ src, alt, className }: AvatarParallaxProps) {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Handle mouse movement within container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = avatarRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; // x within element
    const y = e.clientY - rect.top;  // y within element
    const px = (x / rect.width - 0.5) * 2;  // -1 to 1
    const py = (y / rect.height - 0.5) * 2; // -1 to 1
    setRotation({
      y: px * 12,   // max 12deg
      x: -py * 12,  // max 12deg
    });
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={avatarRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`transition-transform duration-300 ease-out cursor-pointer will-change-transform select-none ${className || ""}`}
      style={{
        transform: `perspective(700px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.04 : 1})`,
        boxShadow: isHovered
          ? "0 6px 30px 0 rgba(72,165,250,0.25), 0 1.5px 6px 0px #1118"
          : "0 2px 12px 0 #0004",
        transition: "transform 0.28s cubic-bezier(0.4,0.22,0.24,1),box-shadow 0.26s cubic-bezier(0.42,0,0.58,1)",
        display: "inline-block",
      }}
      tabIndex={0}
      aria-label={alt}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="block w-32 h-32 sm:w-40 sm:h-40 rounded-2xl shadow-neu object-cover border-4 border-gray-800"
        style={{ userSelect: "none", pointerEvents: "none" }}
      />
    </div>
  );
}
