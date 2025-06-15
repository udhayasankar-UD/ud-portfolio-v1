
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MaleModel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      // Make the model look towards the cursor
      const targetRotationY = (mousePosition.x - 0.5) * 0.3;
      const targetRotationX = (mousePosition.y - 0.5) * 0.2;
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -targetRotationX,
        0.05
      );
    }
  });

  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.8, 8]} />
        <meshPhongMaterial color="#4a90e2" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.4, 0.9, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[0.4, 0.9, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.15, 0.1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.7, 8]} />
        <meshPhongMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[0.15, 0.1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.7, 8]} />
        <meshPhongMaterial color="#2c3e50" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.1, 1.65, 0.25]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 1.65, 0.25]}>
        <sphereGeometry args={[0.03, 8, 8]} />
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
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 5, 2]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-2, 2, -2]} intensity={0.3} color="#60a5fa" />
        <MaleModel mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
