import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { wings } from '../data/exhibits';

interface Scene3DProps {
  scrollProgress: number;
  activeWing: number;
}

function WingShape({ color, shape, position, scale = 1 }: {
  color: string;
  shape: 'octahedron' | 'torus' | 'icosahedron' | 'dodecahedron' | 'torusKnot';
  position: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'octahedron': return new THREE.OctahedronGeometry(1);
      case 'torus': return new THREE.TorusGeometry(1, 0.4, 16, 32);
      case 'icosahedron': return new THREE.IcosahedronGeometry(1);
      case 'dodecahedron': return new THREE.DodecahedronGeometry(1);
      case 'torusKnot': return new THREE.TorusKnotGeometry(0.8, 0.3, 64, 16);
    }
  }, [shape]);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({ radius, count, color, speed }: {
  radius: number;
  count: number;
  color: string;
  speed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return {
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        y: (Math.random() - 0.5) * 1.5,
        size: 0.015 + Math.random() * 0.02,
      };
    });
  }, [radius, count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

const shapes: ('octahedron' | 'torus' | 'icosahedron' | 'dodecahedron' | 'torusKnot')[] = [
  'octahedron', 'icosahedron', 'torus', 'dodecahedron', 'torusKnot',
];

export default function Scene3D({ scrollProgress, activeWing }: Scene3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Camera: stays far back, subtle movement
  useFrame(({ camera }) => {
    const targetY = 3 - scrollProgress * 2;
    const targetZ = 30 - scrollProgress * 5;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.03);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03);
    camera.lookAt(0, 0, 0);
  });

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03 + scrollProgress * Math.PI * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} color="#6666aa" />
      <pointLight position={[0, 10, 0]} intensity={1} color="#ffffff" distance={50} />

      {wings[activeWing] && (
        <pointLight
          position={[0, 3, 0]}
          intensity={1.5}
          color={wings[activeWing].accentColor}
          distance={25}
        />
      )}

      <group ref={groupRef}>
        {/* Central glowing core */}
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#6666cc"
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>

        {/* Orbit rings — subtle */}
        <OrbitRing radius={3} count={30} color="#4a90d9" speed={0.08} />
        <OrbitRing radius={5.5} count={45} color="#a855f7" speed={-0.05} />
        <OrbitRing radius={8} count={60} color="#ee4d2d" speed={0.04} />

        {/* Wing shapes — pushed outward, smaller */}
        {wings.map((wing, i) => {
          const angle = (i / wings.length) * Math.PI * 2;
          const r = 5;
          const x = Math.cos(angle) * r;
          const z = Math.sin(angle) * r;
          const isActive = activeWing === i;

          return (
            <WingShape
              key={wing.id}
              color={wing.accentColor}
              shape={shapes[i]}
              position={[x, 0, z]}
              scale={isActive ? 1.2 : 0.5}
            />
          );
        })}

        {/* Ambient sparkles */}
        <Sparkles
          count={150}
          scale={20}
          size={1}
          speed={0.2}
          opacity={0.25}
          color="#8888cc"
        />
      </group>
    </>
  );
}
