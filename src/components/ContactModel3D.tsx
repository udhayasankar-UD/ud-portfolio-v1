
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MaleModel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current && headRef.current) {
      // Convert mouse position to world coordinates for more accurate tracking
      const targetRotationY = (mousePosition.x - 0.5) * 0.8;
      const targetRotationX = (mousePosition.y - 0.5) * 0.4;
      
      // Smoother interpolation for body rotation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.03
      );
      
      // Head looks more directly at cursor
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY * 1.2,
        0.08
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -targetRotationX * 0.8,
        0.08
      );
    }
  });

  return (
    <group ref={meshRef} position={[0, -1.5, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.2, 8]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.6, 0.9, 0.3]} />
        <meshPhongMaterial color="#4a90e2" />
      </mesh>
      
      {/* Left Arm */}
      <group position={[-0.45, 0.9, 0]} rotation={[0, 0, Math.PI / 8]}>
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
          <meshPhongMaterial color="#ffdbac" />
        </mesh>
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.4, 8]} />
          <meshPhongMaterial color="#ffdbac" />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.85, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhongMaterial color="#ffdbac" />
        </mesh>
      </group>
      
      {/* Right Arm */}
      <group position={[0.45, 0.9, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
          <meshPhongMaterial color="#ffdbac" />
        </mesh>
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.4, 8]} />
          <meshPhongMaterial color="#ffdbac" />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.85, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhongMaterial color="#ffdbac" />
        </mesh>
      </group>
      
      {/* Left Leg */}
      <group position={[-0.15, 0.1, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.6, 8]} />
          <meshPhongMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.5, 8]} />
          <meshPhongMaterial color="#2c3e50" />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -1, 0.1]}>
          <boxGeometry args={[0.2, 0.1, 0.35]} />
          <meshPhongMaterial color="#1a1a1a" />
        </mesh>
      </group>
      
      {/* Right Leg */}
      <group position={[0.15, 0.1, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.6, 8]} />
          <meshPhongMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.5, 8]} />
          <meshPhongMaterial color="#2c3e50" />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -1, 0.1]}>
          <boxGeometry args={[0.2, 0.1, 0.35]} />
          <meshPhongMaterial color="#1a1a1a" />
        </mesh>
      </group>
      
      {/* Eyes */}
      <mesh position={[-0.12, 1.65, 0.28]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
      <mesh position={[0.12, 1.65, 0.28]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 1.6, 0.32]}>
        <coneGeometry args={[0.03, 0.08, 8]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      
      {/* Mouth */}
      <mesh position={[0, 1.52, 0.3]}>
        <sphereGeometry args={[0.05, 8, 4]} />
        <meshPhongMaterial color="#cc6666" />
      </mesh>
    </group>
  );
}

export default function ContactModel3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Get the canvas container element for more accurate positioning
      const rect = document.querySelector('#contact')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: (event.clientX - rect.left) / rect.width,
          y: (event.clientY - rect.top) / rect.height,
        });
      } else {
        // Fallback to window coordinates
        setMousePosition({
          x: event.clientX / window.innerWidth,
          y: event.clientY / window.innerHeight,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 3]} intensity={1} color="#ffffff" />
        <directionalLight position={[-2, 2, -2]} intensity={0.4} color="#60a5fa" />
        <pointLight position={[0, 3, 2]} intensity={0.5} color="#ffffff" />
        <MaleModel mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
