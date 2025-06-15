
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Floating particles background
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 50;
  
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;
    
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
        if (Math.abs(positions[i]) > 5) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 5) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 5) velocities[i + 2] *= -1;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#60a5fa"
        transparent={true}
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

// Enhanced animated cube with more effects
function AnimatedCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { size } = useThree();

  const handlePointerMove = (e: any) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const x = (offsetX / size.width) * 2 - 1;
    const y = -(offsetY / size.height) * 2 + 1;
    setTarget({ x: y * 0.4, y: x * 0.4 });
  };

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      meshRef.current.rotation.x += (target.x - meshRef.current.rotation.x) * 0.07 + 0.003;
      meshRef.current.rotation.y += (target.y - meshRef.current.rotation.y) * 0.07 + 0.007;
      meshRef.current.position.y = Math.sin(time * 0.8) * 0.15;
      
      // Enhanced hover effect
      const scale = isHovered ? 1.6 : 1.4;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      
      // Pulsing glow effect
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.2;
      }
    }
  });

  const materialRef = useRef<THREE.MeshStandardMaterial>();

  if (!materialRef.current) {
    materialRef.current = new THREE.MeshStandardMaterial({
      color: "#60a5fa",
      metalness: 1,
      roughness: 0.15,
      emissive: "#2563eb",
      emissiveIntensity: 0.5,
      envMapIntensity: 0.75,
    });
  }

  return (
    <mesh
      ref={meshRef}
      scale={[1.4, 1.4, 1.4]}
      onPointerMove={handlePointerMove}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => {
        setTarget({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <primitive object={materialRef.current} attach="material" />
    </mesh>
  );
}

// Enhanced animated roles with more effects
function AnimatedRoles() {
  const roles = [
    "Full-Stack Developer",
    "Game Developer", 
    "UI & UX Designer",
  ];
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: number | undefined;
    const word = roles[index];

    if (typing) {
      if (displayed.length < word.length) {
        timeout = window.setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length + 1));
        }, 65);
      } else {
        timeout = window.setTimeout(() => setTyping(false), 1000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = window.setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length - 1));
        }, 36);
      } else {
        setTyping(true);
        setIndex((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, index, roles]);

  return (
    <div className="mt-2 text-2xl md:text-4xl lg:text-5xl font-semibold min-h-[2.6rem] md:min-h-[3.2rem] lg:min-h-[3.5rem]">
      <span className="text-white animate-pulse">I'm </span>
      <span className="relative text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-bounce">
        {displayed}
        <span className="absolute border-r-2 border-blue-400 animate-pulse ml-1 h-full"></span>
      </span>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-pulse {
          animation: pulse 1s infinite;
        }
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -2px, 0);
          }
          70% {
            transform: translate3d(0, -1px, 0);
          }
          90% {
            transform: translate3d(0, -1px, 0);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}

// Scroll indicator with animation
function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// Main hero export with enhanced interactivity
export default function Hero3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center h-[90vh] pt-8 pb-10 w-full overflow-hidden"
      style={{ minHeight: "600px" }}
    >
      {/* Animated background with parallax */}
      <div 
        className="absolute inset-0 z-0 bg-hero-gradient opacity-95 transition-transform duration-100"
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
        }}
      />
      
      {/* Multiple decorative blur rings with different animations */}
      <div className="absolute left-0 right-0 top-36 mx-auto w-80 h-80 rounded-full blur-3xl bg-blue-glow/40 animate-pulse" />
      <div 
        className="absolute left-0 right-0 top-24 mx-auto w-96 h-96 rounded-full blur-2xl bg-purple-500/20 animate-pulse"
        style={{
          animationDelay: '1s',
          transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Enhanced glassy canvas */}
        <div 
          className="w-[380px] h-[380px] rounded-full shadow-soft-glow border-2 border-white/10 overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-900/70 to-gray-900/90 mb-8 animate-float hover:shadow-[0_0_30px_10px_rgba(96,165,250,0.3)] transition-all duration-300 cursor-pointer"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
          }}
        >
          <Canvas camera={{ position: [2.4, 2.4, 3.2] }} shadows>
            <ambientLight intensity={0.85} />
            <directionalLight position={[2, 4, 2]} intensity={1.1} castShadow color="#60a5fa" />
            <FloatingParticles />
            <AnimatedCube />
          </Canvas>
        </div>

        {/* Enhanced animated text with more effects */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center gradient-text animate-fade-in-up drop-shadow-[0_2px_14px_rgba(96,165,250,0.7)] hover:scale-105 transition-transform duration-300">
          Hi, I'm Udhaya Sankar
        </h1>
        
        <AnimatedRoles />
        
        <div className="mt-6 text-lg md:text-xl text-blue-100 text-center max-w-2xl animate-fade-in-up hover:text-white transition-colors duration-300">
          Building immersive web &amp; game experiences with 3D, modern UI, and a nerd's passion for code.
        </div>
        
        {/* Enhanced scroll button */}
        <a
          href="#about"
          className="mt-12 neu-btn px-8 py-3 text-lg shadow-soft-glow flex items-center group transition-all duration-300 hover:scale-110 hover:bg-blue-glow/80 hover:shadow-[0_0_20px_5px_rgba(96,165,250,0.4)] animate-fade-in-up"
        >
          <span className="group-hover:text-white transition-colors">Scroll Down</span>
          <svg 
            width={24} 
            height={24} 
            className="ml-3 group-hover:translate-y-2 group-hover:animate-bounce transition-all duration-200"
          >
            <path
              d="M12 5v14m0 0l6-6m-6 6l-6-6"
              stroke="#60a5fa"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </a>
      </div>

      <ScrollIndicator />

      {/* Enhanced floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(0.5deg); }
          66% { transform: translateY(-8px) rotate(-0.5deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
