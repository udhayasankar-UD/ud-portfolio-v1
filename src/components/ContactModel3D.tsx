
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function SimpleCharacter() {
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useFrame(() => {
    if (groupRef.current && !isDragging) {
      // Gentle automatic rotation
      groupRef.current.rotation.y += 0.005;
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
      {/* Head - large rounded sphere */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhongMaterial color={0xfdbcb4} />
      </mesh>
      
      {/* Body - rounded torso */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshPhongMaterial color={0x4a90e2} />
      </mesh>
      
      {/* Arms - rounded capsules */}
      <mesh position={[-0.6, 1.2, 0]} rotation={[0, 0, Math.PI / 6]}>
        <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
        <meshPhongMaterial color={0xfdbcb4} />
      </mesh>
      <mesh position={[0.6, 1.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
        <meshPhongMaterial color={0xfdbcb4} />
      </mesh>
      
      {/* Legs - rounded capsules */}
      <mesh position={[-0.2, 0.2, 0]}>
        <capsuleGeometry args={[0.12, 0.6, 8, 16]} />
        <meshPhongMaterial color={0x2c5aa0} />
      </mesh>
      <mesh position={[0.2, 0.2, 0]}>
        <capsuleGeometry args={[0.12, 0.6, 8, 16]} />
        <meshPhongMaterial color={0x2c5aa0} />
      </mesh>
      
      {/* Eyes - small black spheres */}
      <mesh position={[-0.15, 2.1, 0.4]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhongMaterial color={0x000000} />
      </mesh>
      <mesh position={[0.15, 2.1, 0.4]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhongMaterial color={0x000000} />
      </mesh>
      
      {/* Simple smile - small torus */}
      <mesh position={[0, 1.9, 0.45]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI]} />
        <meshPhongMaterial color={0x000000} />
      </mesh>
    </group>
  );
}

export default function ContactModel3D() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 5, 2]} intensity={0.8} />
        <directionalLight position={[-2, 2, -2]} intensity={0.3} />
        <SimpleCharacter />
      </Canvas>
      <div className="absolute bottom-4 left-4 text-white/60 text-sm">
        Click & drag to rotate
      </div>
    </div>
  );
}
