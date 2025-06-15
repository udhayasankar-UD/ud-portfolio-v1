
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function SimpleCharacter({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useFrame(() => {
    if (groupRef.current && !isDragging) {
      // Subtle head movement following cursor when not dragging
      const targetRotationY = (mousePosition.x - 0.5) * 0.1;
      const targetRotationX = (mousePosition.y - 0.5) * 0.05;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotation.y + targetRotationY,
        0.1
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        rotation.x - targetRotationX,
        0.1
      );
    } else if (groupRef.current && isDragging) {
      groupRef.current.rotation.y = rotation.y;
      groupRef.current.rotation.x = rotation.x;
    }
  });

  const handlePointerDown = (event: any) => {
    event.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handlePointerMove = (event: any) => {
    if (!isDragging) return;
    
    const deltaX = event.clientX - dragStart.x;
    const deltaY = event.clientY - dragStart.y;
    
    setRotation({
      y: rotation.y + deltaX * 0.01,
      x: Math.max(-Math.PI/4, Math.min(Math.PI/4, rotation.x - deltaY * 0.01))
    });
    
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [isDragging, dragStart, rotation]);

  return (
    <group 
      ref={groupRef} 
      position={[0, -0.5, 0]}
      onPointerDown={handlePointerDown}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Head - larger and more rounded */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshPhongMaterial color="#f4c2a1" />
      </mesh>
      
      {/* Body - more rounded cylinder */}
      <mesh position={[0, 1, 0]}>
        <capsuleGeometry args={[0.3, 0.6, 8, 16]} />
        <meshPhongMaterial color="#87ceeb" />
      </mesh>
      
      {/* Arms - more rounded */}
      <mesh position={[-0.5, 1.2, 0]} rotation={[0, 0, Math.PI / 8]}>
        <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
        <meshPhongMaterial color="#f4c2a1" />
      </mesh>
      <mesh position={[0.5, 1.2, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
        <meshPhongMaterial color="#f4c2a1" />
      </mesh>
      
      {/* Legs - more rounded */}
      <mesh position={[-0.15, 0.3, 0]}>
        <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
        <meshPhongMaterial color="#4682b4" />
      </mesh>
      <mesh position={[0.15, 0.3, 0]}>
        <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
        <meshPhongMaterial color="#4682b4" />
      </mesh>
      
      {/* Eyes - simple black dots */}
      <mesh position={[-0.12, 1.85, 0.35]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
      <mesh position={[0.12, 1.85, 0.35]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
      
      {/* Simple smile */}
      <mesh position={[0, 1.75, 0.38]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.08, 0.01, 8, 16, Math.PI]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
    </group>
  );
}

export default function ContactModel3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 5, 2]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-2, 2, -2]} intensity={0.3} color="#60a5fa" />
        <SimpleCharacter mousePosition={mousePosition} />
      </Canvas>
      <div className="absolute bottom-4 left-4 text-white/60 text-sm">
        Click & drag to rotate
      </div>
    </div>
  );
}
