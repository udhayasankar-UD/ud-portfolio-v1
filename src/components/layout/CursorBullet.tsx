import { useEffect, useState } from 'react';

export default function CursorBullet() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let animationId: number;
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      // Add new trail position
      setTrailPositions(prev => {
        const newTrail = [...prev, { ...newPosition, id: trailId++ }];
        // Keep only last 8 trail positions
        return newTrail.slice(-8);
      });
    };

    const animateTrail = () => {
      setTrailPositions(prev => 
        prev.map(pos => ({
          ...pos,
          x: pos.x + (Math.random() - 0.5) * 0.5,
          y: pos.y + (Math.random() - 0.5) * 0.5,
        })).filter((_, index) => index < 8)
      );
      animationId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateTrail();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Main cursor bullet */}
      <div
        className="fixed pointer-events-none z-50 w-4 h-4 bg-blue-400 rounded-full mix-blend-difference transition-transform duration-100 ease-out shadow-[0_0_10px_2px_rgba(96,165,250,0.8)]"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: 'scale(1)',
        }}
      />
      
      {/* Trail bullets */}
      {trailPositions.map((pos, index) => (
        <div
          key={pos.id}
          className="fixed pointer-events-none z-40 bg-blue-300 rounded-full mix-blend-screen"
          style={{
            left: pos.x - (3 - index * 0.3),
            top: pos.y - (3 - index * 0.3),
            width: Math.max(2, 6 - index * 0.7),
            height: Math.max(2, 6 - index * 0.7),
            opacity: Math.max(0.1, 0.8 - index * 0.1),
            transform: `scale(${Math.max(0.3, 1 - index * 0.1)})`,
            boxShadow: `0 0 ${8 - index}px 1px rgba(96,165,250,${0.6 - index * 0.07})`,
            transition: 'all 0.3s ease-out',
          }}
        />
      ))}
    </>
  );
}
