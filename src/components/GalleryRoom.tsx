import { useMemo } from 'react';
import * as THREE from 'three';
import type { WingData, Exhibit } from '../data/exhibits';
import ArtworkFrame from './ArtworkFrame';
import ExhibitPlaque from './ExhibitPlaque';

interface GalleryRoomProps {
  wing: WingData;
  position: [number, number, number];
  onExhibitClick: (exhibit: Exhibit) => void;
  isActive?: boolean;
}

const ROOM_WIDTH = 20;
const ROOM_HEIGHT = 5.5;
const ROOM_DEPTH = 16;
const HALF_W = ROOM_WIDTH / 2;
const HALF_D = ROOM_DEPTH / 2;

function RoomShell({ color }: { color: string }) {
  const wallMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0c0c28',
        roughness: 0.85,
        metalness: 0.1,
        side: THREE.DoubleSide,
      }),
    [],
  );

  const floorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a0a20',
        roughness: 0.2,
        metalness: 0.7,
        side: THREE.DoubleSide,
      }),
    [],
  );

  const trimMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        toneMapped: false,
      }),
    [color],
  );

  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
        <primitive object={floorMat} attach="material" />
      </mesh>

      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-HALF_W, ROOM_HEIGHT / 2, 0]}>
        <planeGeometry args={[ROOM_DEPTH, ROOM_HEIGHT]} />
        <primitive object={wallMat} attach="material" />
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[HALF_W, ROOM_HEIGHT / 2, 0]}>
        <planeGeometry args={[ROOM_DEPTH, ROOM_HEIGHT]} />
        <primitive object={wallMat} attach="material" />
      </mesh>

      {/* Back wall — the main display wall */}
      <mesh position={[0, ROOM_HEIGHT / 2, -HALF_D]}>
        <planeGeometry args={[ROOM_WIDTH, ROOM_HEIGHT]} />
        <primitive object={wallMat} attach="material" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM_HEIGHT, 0]}>
        <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
        <meshStandardMaterial color="#060612" side={THREE.DoubleSide} />
      </mesh>

      {/* Floor trim */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-HALF_W + 0.02, 0.06, 0]}>
        <planeGeometry args={[ROOM_DEPTH, 0.12]} />
        <primitive object={trimMat} attach="material" />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[HALF_W - 0.02, 0.06, 0]}>
        <planeGeometry args={[ROOM_DEPTH, 0.12]} />
        <primitive object={trimMat} attach="material" />
      </mesh>
      {/* Back wall base trim */}
      <mesh position={[0, 0.06, -HALF_D + 0.02]}>
        <planeGeometry args={[ROOM_WIDTH, 0.12]} />
        <primitive object={trimMat} attach="material" />
      </mesh>

      {/* Ceiling trim */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-HALF_W + 0.02, ROOM_HEIGHT - 0.05, 0]}>
        <planeGeometry args={[ROOM_DEPTH, 0.08]} />
        <primitive object={trimMat} attach="material" />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[HALF_W - 0.02, ROOM_HEIGHT - 0.05, 0]}>
        <planeGeometry args={[ROOM_DEPTH, 0.08]} />
        <primitive object={trimMat} attach="material" />
      </mesh>
      <mesh position={[0, ROOM_HEIGHT - 0.05, -HALF_D + 0.02]}>
        <planeGeometry args={[ROOM_WIDTH, 0.08]} />
        <primitive object={trimMat} attach="material" />
      </mesh>
    </>
  );
}

export default function GalleryRoom({
  wing,
  position,
  onExhibitClick,
  isActive = false,
}: GalleryRoomProps) {
  // Collect all artwork images
  const allImages: { src: string; exhibit: Exhibit }[] = [];
  for (const exhibit of wing.exhibits) {
    if (exhibit.images) {
      for (const img of exhibit.images) {
        allImages.push({ src: img, exhibit });
      }
    }
  }

  // Text-only exhibits
  const textExhibits = wing.exhibits.filter((e) => !e.images || e.images.length === 0);

  // Layout strategy:
  // - First 1-3 images go on BACK WALL (facing camera, most prominent)
  // - Rest alternate on left/right side walls
  // - Text plaques go on remaining wall space

  const backWallSlots = Math.min(allImages.length, 3);
  const backWallImages = allImages.slice(0, backWallSlots);
  const sideImages = allImages.slice(backWallSlots);

  const elements: JSX.Element[] = [];

  // Back wall artwork — centered, facing camera
  backWallImages.forEach((item, i) => {
    const totalWidth = backWallSlots * 5;
    const startX = -totalWidth / 2 + 2.5;
    const x = startX + i * 5;

    elements.push(
      <group key={`back-${i}`}>
        <ArtworkFrame
          src={item.src}
          position={[x, 2.6, -HALF_D + 0.12]}
          rotation={[0, 0, 0]}
          width={4.2}
          height={2.6}
          accentColor={wing.accentColor}
          onClick={() => onExhibitClick(item.exhibit)}
        />
        {/* Spotlight from above */}
        <pointLight position={[x, ROOM_HEIGHT - 0.3, -HALF_D + 2]} intensity={2.5} color="#ffffff" distance={6} />
      </group>,
    );
  });

  // Side wall artwork
  sideImages.forEach((item, i) => {
    const isLeft = i % 2 === 0;
    const row = Math.floor(i / 2);
    const z = -HALF_D + 4 + row * 5;
    const x = isLeft ? -HALF_W + 0.12 : HALF_W - 0.12;
    const rotY = isLeft ? Math.PI / 2 : -Math.PI / 2;

    elements.push(
      <group key={`side-${i}`}>
        <ArtworkFrame
          src={item.src}
          position={[x, 2.6, z]}
          rotation={[0, rotY, 0]}
          width={4}
          height={2.5}
          accentColor={wing.accentColor}
          onClick={() => onExhibitClick(item.exhibit)}
        />
        <pointLight
          position={[isLeft ? x + 1.5 : x - 1.5, ROOM_HEIGHT - 0.5, z]}
          intensity={2}
          color="#ffffff"
          distance={5}
        />
      </group>,
    );
  });

  // Text plaques — fill remaining side wall space
  const sideSlotStart = Math.ceil(sideImages.length / 2);
  textExhibits.forEach((exhibit, i) => {
    const isLeft = (i + sideImages.length) % 2 === 0;
    const row = sideSlotStart + Math.floor(i / 2);
    const z = -HALF_D + 4 + row * 4.5;
    const x = isLeft ? -HALF_W + 0.15 : HALF_W - 0.15;
    const rotY = isLeft ? Math.PI / 2 : -Math.PI / 2;

    elements.push(
      <group key={`plaque-${exhibit.id}`}>
        <ExhibitPlaque
          exhibit={exhibit}
          position={[x, 2.3, z]}
          rotation={[0, rotY, 0]}
          accentColor={wing.accentColor}
          onClick={() => onExhibitClick(exhibit)}
          showHtml={isActive}
        />
        <pointLight
          position={[isLeft ? x + 1.5 : x - 1.5, 4, z]}
          intensity={1.5}
          color="#ffffff"
          distance={4}
        />
      </group>,
    );
  });

  return (
    <group position={position}>
      <RoomShell color={wing.accentColor} />

      {/* Central overhead */}
      <pointLight position={[0, ROOM_HEIGHT - 0.3, 0]} intensity={3} color="#ffffff" distance={20} />

      {/* Front fill */}
      <pointLight position={[0, 3, HALF_D - 2]} intensity={2} color="#ffffff" distance={12} />

      {/* Accent floor glow */}
      <pointLight position={[0, 0.3, -HALF_D + 2]} intensity={1.2} color={wing.accentColor} distance={10} />
      <pointLight position={[0, 0.3, HALF_D - 2]} intensity={0.8} color={wing.accentColor} distance={8} />

      {elements}
    </group>
  );
}
