import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import CursorBullet from "./CursorBullet";

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
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        args={[{
          size: 0.05,
          color: "#60a5fa",
          transparent: true,
          opacity: 0.6,
          sizeAttenuation: true
        }]}
      />
    </points>
  );
}

// Glowing circle with subtle blinking effect
function GlowingCircle() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { size } = useThree();

  const handlePointerMove = (e: any) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const x = (offsetX / size.width) * 2 - 1;
    const y = -(offsetY / size.height) * 2 + 1;
    setTarget({ x: y * 0.2, y: x * 0.2 });
  };

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();

      // Gentle rotation
      meshRef.current.rotation.x += (target.x - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (target.y - meshRef.current.rotation.y) * 0.05;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;

      // Subtle blinking glow effect
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.emissiveIntensity = 0.3 + Math.sin(time * 0.8) * 0.15;
      }

      // Subtle scale on hover
      const scale = isHovered ? 1.1 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.05);
    }
  });

  const materialRef = useRef<THREE.MeshStandardMaterial>();

  if (!materialRef.current) {
    materialRef.current = new THREE.MeshStandardMaterial({
      color: "#60a5fa",
      metalness: 0.8,
      roughness: 0.2,
      emissive: "#3b82f6",
      emissiveIntensity: 0.3,
      envMapIntensity: 0.5,
    });
  }

  return (
    <mesh
      ref={meshRef}
      scale={[1.8, 1.8, 1.8]}
      onPointerMove={handlePointerMove}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => {
        setTarget({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[1, 32, 32]} />
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
    <div className="mt-4 text-2xl md:text-3xl lg:text-4xl font-semibold min-h-[2.6rem] md:min-h-[3.2rem] lg:min-h-[3.5rem]">
      <span className="text-white">I'm </span>
      <span className="relative text-blue-400 bg-gradient-to-r from-blue-400/20 to-blue-500/20 px-2 py-1 rounded">
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

// Main hero export with split layout
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

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <CursorBullet />
      <section
        id="home"
        className="relative min-h-[90vh] w-full overflow-hidden cursor-none"
        style={{ minHeight: "600px" }}
      >
        {/* Animated background with parallax */}
        <div 
          className="absolute inset-0 z-0 bg-hero-gradient opacity-95 transition-transform duration-100"
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
          }}
        />
        
        {/* Decorative blur rings */}
        <div className="absolute left-1/4 top-1/3 w-96 h-96 rounded-full blur-3xl bg-blue-glow/30 animate-pulse" />
        <div 
          className="absolute right-1/4 top-1/2 w-80 h-80 rounded-full blur-2xl bg-purple-500/20 animate-pulse"
          style={{
            animationDelay: '1.5s',
            transform: `translate(${mousePosition.x * -3}px, ${mousePosition.y * -3}px)`,
          }}
        />

        {/* Split Layout Container */}
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full min-h-[80vh]">
            
            {/* Left Column - 3D Canvas */}
            <div className="flex justify-center lg:justify-end order-2 lg:order-1">
              <div 
                className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full shadow-soft-glow border-2 border-white/10 overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-900/50 to-gray-900/70 hover:shadow-[0_0_40px_15px_rgba(96,165,250,0.25)] transition-all duration-500 cursor-pointer animate-float"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
                }}
              >
                <Canvas camera={{ position: [3, 3, 4] }} shadows>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[3, 5, 3]} intensity={1} castShadow color="#60a5fa" />
                  <FloatingParticles />
                  <GlowingCircle />
                </Canvas>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="flex flex-col justify-center order-1 lg:order-2 text-center lg:text-left">
              {/* Hero Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 animate-fade-in-up">
                <span className="text-white" style={{ textShadow: '0 8px 20px rgba(60,120,255,0.12)' }}>
                  Hi, I'm 
                </span>
                <br />
                <span className="text-white" style={{ textShadow: '0 8px 20px rgba(60,120,255,0.12)' }}>
                  Udhaya Sankar
                </span>
              </h1>
              
              {/* Animated Roles */}
              <AnimatedRoles />
              
              {/* Hero Description */}
              <div className="mt-6 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up">
                Building immersive web &amp; game experiences with 3D, modern UI, and a nerd's passion for code.
              </div>
              
              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#projects"
                  className="neu-btn px-8 py-3 text-lg shadow-soft-glow transition-all duration-300 hover:scale-105 hover:bg-blue-glow/80 hover:shadow-[0_0_20px_5px_rgba(96,165,250,0.4)] animate-fade-in-up"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="neu-btn px-8 py-3 text-lg shadow-soft-glow transition-all duration-300 hover:scale-105 hover:bg-blue-glow/80 hover:shadow-[0_0_20px_5px_rgba(96,165,250,0.4)] animate-fade-in-up"
                  style={{ animationDelay: '0.1s' }}
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Small Mouse Scroll Icon */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToAbout}
            aria-label="Scroll to about"
            className="animate-bounce transition-opacity duration-500 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-2"
          >
            <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </button>
        </div>

        {/* Enhanced floating animation */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-8px) rotate(0.5deg); }
            66% { transform: translateY(-5px) rotate(-0.3deg); }
          }
          .animate-float {
            animation: float 10s ease-in-out infinite;
          }
          @keyframes pulse-glow {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(96, 165, 250, 0.3);
            }
            50% { 
              box-shadow: 0 0 40px rgba(96, 165, 250, 0.5), 0 0 60px rgba(96, 165, 250, 0.2);
            }
          }
        `}</style>
      </section>
    </>
  );
}
