import { useRef, useState, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface ArtworkFrameProps {
  src: string;
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
  accentColor: string;
  onClick: () => void;
}

export default function ArtworkFrame({
  src,
  position,
  rotation,
  width,
  height,
  accentColor,
  onClick,
}: ArtworkFrameProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(THREE.TextureLoader, src);

  // Compute aspect-correct dimensions
  const dims = useMemo(() => {
    if (!texture.image) return { w: width, h: height };
    const imgAspect = texture.image.width / texture.image.height;
    const frameAspect = width / height;
    if (imgAspect > frameAspect) {
      return { w: width, h: width / imgAspect };
    }
    return { w: height * imgAspect, h: height };
  }, [texture, width, height]);

  const frameDepth = 0.08;
  const frameBorder = 0.12;

  const frameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a2e',
        roughness: 0.4,
        metalness: 0.6,
      }),
    [],
  );

  // Hover glow
  useFrame(() => {
    if (!groupRef.current) return;
    const target = hovered ? 0.08 : 0;
    const mat = groupRef.current.children[0] as THREE.Mesh;
    if (mat.material instanceof THREE.MeshStandardMaterial) {
      mat.material.emissiveIntensity = THREE.MathUtils.lerp(
        mat.material.emissiveIntensity,
        hovered ? 0.4 : 0,
        0.1,
      );
    }
    // Slight pop out on hover
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      target,
      0.1,
    );
  });

  return (
    <group position={position} rotation={rotation}>
      <group ref={groupRef}>
        {/* Frame border */}
        <mesh
          onPointerEnter={() => {
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <boxGeometry
            args={[dims.w + frameBorder * 2, dims.h + frameBorder * 2, frameDepth]}
          />
          <meshStandardMaterial
            color="#1a1a2e"
            emissive={accentColor}
            emissiveIntensity={0}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>

        {/* Image plane */}
        <mesh position={[0, 0, frameDepth / 2 + 0.001]}>
          <planeGeometry args={[dims.w, dims.h]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.3}
            metalness={0.1}
            toneMapped={false}
          />
        </mesh>

        {/* Inner shadow border */}
        <mesh position={[0, 0, frameDepth / 2 + 0.0005]}>
          <planeGeometry args={[dims.w + 0.02, dims.h + 0.02]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>
    </group>
  );
}
