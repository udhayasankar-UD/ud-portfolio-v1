import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Floating particles background
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 30; // Reduced for performance
  
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 8;
    positions[i + 1] = (Math.random() - 0.5) * 8;
    positions[i + 2] = (Math.random() - 0.5) * 8;
    
    velocities[i] = (Math.random() - 0.5) * 0.02;
    velocities[i + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i + 2] = (Math.random() - 0.5) * 0.02;
  }

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        
        // Wrap around boundaries
        if (Math.abs(positions[i]) > 4) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 4) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 4) velocities[i + 2] *= -1;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        args={[{
          size: 0.04,
          color: "#60a5fa",
          transparent: true,
          opacity: 0.6,
          sizeAttenuation: true
        }]}
      />
    </points>
  );
}

// Enhanced animated cube
function AnimatedCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { size } = useThree();

  const handlePointerMove = (e: any) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const x = (offsetX / size.width) * 2 - 1;
    const y = -(offsetY / size.height) * 2 + 1;
    setTarget({ x: y * 0.3, y: x * 0.3 });
  };

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();

      // Smooth rotation based on mouse/touch
      meshRef.current.rotation.x += (target.x - meshRef.current.rotation.x) * 0.05 + 0.001;
      meshRef.current.rotation.y += (target.y - meshRef.current.rotation.y) * 0.05 + 0.002;
      meshRef.current.position.y = Math.sin(time * 0.4) * 0.1;

      // Subtle glow effect
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.emissiveIntensity = 0.4 + Math.sin(time * 0.7) * 0.06;
      }

      // Scale on hover
      const scale = isHovered ? 1.4 : 1.2;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.05);
    }
  });

  const materialRef = useRef<THREE.MeshStandardMaterial>();

  if (!materialRef.current) {
    materialRef.current = new THREE.MeshStandardMaterial({
      color: "#60a5fa",
      metalness: 0.9,
      roughness: 0.1,
      emissive: "#2563eb",
      emissiveIntensity: 0.4,
      envMapIntensity: 0.8,
    });
  }

  return (
    <mesh
      ref={meshRef}
      scale={[1.2, 1.2, 1.2]}
      onPointerMove={handlePointerMove}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => {
        setTarget({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <primitive object={materialRef.current} attach="material" />
    </mesh>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="w-full h-full relative group rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-900/30 to-gray-900/50 backdrop-blur-sm">
      <Canvas 
        camera={{ position: [2, 2, 3], fov: 50 }} 
        shadows
        dpr={[1, 2]} // Optimize for different device pixel ratios
        performance={{ min: 0.5 }} // Allow framerate to drop for performance
      >
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[2, 4, 2]} 
          intensity={0.8} 
          castShadow 
          color="#60a5fa"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <FloatingParticles />
        <AnimatedCube />
      </Canvas>
      
      {/* Hover hint overlay */}
      <div className="absolute bottom-4 left-4 text-white/40 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Click &amp; drag to rotate
      </div>
    </div>
  );
}