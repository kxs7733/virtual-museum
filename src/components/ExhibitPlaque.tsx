import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Exhibit } from '../data/exhibits';

interface ExhibitPlaqueProps {
  exhibit: Exhibit;
  position: [number, number, number];
  rotation: [number, number, number];
  accentColor: string;
  onClick: () => void;
  showHtml?: boolean;
}

export default function ExhibitPlaque({
  exhibit,
  position,
  rotation,
  accentColor,
  onClick,
  showHtml = true,
}: ExhibitPlaqueProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      hovered ? 0.05 : 0,
      0.1,
    );
  });

  return (
    <group position={position} rotation={rotation}>
      <group ref={groupRef}>
        {/* Plaque background */}
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
          <boxGeometry args={[3.5, 2.2, 0.06]} />
          <meshStandardMaterial
            color="#0c0c24"
            emissive={accentColor}
            emissiveIntensity={hovered ? 0.3 : 0.08}
            roughness={0.6}
            metalness={0.4}
          />
        </mesh>

        {/* Accent line at top */}
        <mesh position={[0, 1.05, 0.035]}>
          <planeGeometry args={[3.3, 0.03]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.8}
            toneMapped={false}
          />
        </mesh>

        {/* HTML content overlay — only when room is active */}
        {showHtml && <Html
          position={[0, 0, 0.04]}
          transform
          distanceFactor={4}
          style={{
            width: '320px',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              color: 'white',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 700,
                marginBottom: '4px',
                lineHeight: 1.2,
              }}
            >
              {exhibit.title}
            </h3>
            {exhibit.subtitle && (
              <p style={{ fontSize: '10px', color: accentColor, marginBottom: '8px' }}>
                {exhibit.subtitle}
              </p>
            )}
            <p
              style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {exhibit.description}
            </p>
            {exhibit.stats && exhibit.stats.length > 0 && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
                {exhibit.stats.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>
                      {s.value}
                    </div>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div
              style={{
                marginTop: '10px',
                fontSize: '10px',
                color: accentColor,
                opacity: 0.7,
              }}
            >
              Click to view details &rarr;
            </div>
          </div>
        </Html>}
      </group>
    </group>
  );
}
