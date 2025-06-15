
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RoundedLimb({
  position,
  rotation,
  length = 0.5,
  radius = 0.1,
  color = 0xfdbcb4,
}: {
  position?: [number, number, number],
  rotation?: [number, number, number],
  length?: number,
  radius?: number,
  color?: number
}) {
  // Composite capsule-like limb with cylinder and hemisphere ends.
  return (
    <group position={position} rotation={rotation}>
      {/* Cylinder */}
      <mesh>
        <cylinderGeometry args={[radius, radius, length, 16]} />
        <meshPhongMaterial color={color} />
      </mesh>
      {/* Top hemisphere */}
      <mesh position={[0, length/2, 0]}>
        <sphereGeometry args={[radius, 16, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
        <meshPhongMaterial color={color} />
      </mesh>
      {/* Bottom hemisphere */}
      <mesh position={[0, -length/2, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[radius, 16, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
        <meshPhongMaterial color={color} />
      </mesh>
    </group>
  );
}

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
    // eslint-disable-next-line
  }, [isDragging, dragStart, rotation]);

  return (
    <group 
      ref={groupRef} 
      position={[0, -0.5, 0]}
      onPointerDown={handlePointerDown}
      // Note: .style does not apply to <group>; use CSS for the Canvas parent if needed.
    >
      {/* Head - larger sphere */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhongMaterial color={0xfdbcb4} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshPhongMaterial color={0x4a90e2} />
      </mesh>

      {/* Left Arm */}
      <RoundedLimb 
        position={[-0.65, 1.35, 0]}
        rotation={[0, 0, Math.PI/6]}
        length={0.55}
        radius={0.11}
        color={0xfdbcb4}
      />
      {/* Right Arm */}
      <RoundedLimb 
        position={[0.65, 1.35, 0]}
        rotation={[0, 0, -Math.PI/6]}
        length={0.55}
        radius={0.11}
        color={0xfdbcb4}
      />
      {/* Left Leg */}
      <RoundedLimb 
        position={[-0.22, 0.3, 0]}
        rotation={[0, 0, 0]}
        length={0.65}
        radius={0.13}
        color={0x2c5aa0}
      />
      {/* Right Leg */}
      <RoundedLimb 
        position={[0.22, 0.3, 0]}
        rotation={[0, 0, 0]}
        length={0.65}
        radius={0.13}
        color={0x2c5aa0}
      />

      {/* Eyes */}
      <mesh position={[-0.15, 2.08, 0.4]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhongMaterial color={0x000000} />
      </mesh>
      <mesh position={[0.15, 2.08, 0.4]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhongMaterial color={0x000000} />
      </mesh>
      {/* Smile */}
      <mesh position={[0, 1.92, 0.42]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.1, 0.018, 8, 16, Math.PI]} />
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
