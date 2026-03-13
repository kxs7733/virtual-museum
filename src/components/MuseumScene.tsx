import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { wings, type Exhibit } from '../data/exhibits';
import GalleryRoom from './GalleryRoom';

interface MuseumSceneProps {
  currentRoom: number;
  onExhibitClick: (exhibit: Exhibit) => void;
  onRoomEnter: (index: number) => void;
}

export const ROOM_SPACING = 40;

// Camera positions: inside the room at eye level
function getRoomCameraPos(roomIndex: number): [number, number, number] {
  if (roomIndex < 0) return [0, 3, 16]; // lobby
  const z = -(roomIndex * ROOM_SPACING + 30);
  return [0, 2.2, z + 5]; // eye level, well inside room
}

function getRoomLookAt(roomIndex: number): [number, number, number] {
  if (roomIndex < 0) return [0, 2, 0];
  const z = -(roomIndex * ROOM_SPACING + 30);
  return [0, 2.2, z - 3]; // look straight ahead
}

function CameraRig({ currentRoom }: { currentRoom: number }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...getRoomCameraPos(-1)));
  const targetLook = useRef(new THREE.Vector3(...getRoomLookAt(-1)));
  const currentLook = useRef(new THREE.Vector3(0, 2, 0));

  useFrame(() => {
    const [tx, ty, tz] = getRoomCameraPos(currentRoom);
    const [lx, ly, lz] = getRoomLookAt(currentRoom);

    targetPos.current.set(tx, ty, tz);
    targetLook.current.set(lx, ly, lz);

    camera.position.lerp(targetPos.current, 0.07);
    currentLook.current.lerp(targetLook.current, 0.07);
    camera.lookAt(currentLook.current);
  });

  return null;
}

function LobbyCenterpiece() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.12;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    meshRef.current.position.y = 2.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[0, 2.5, 0]}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshStandardMaterial
        color="#7755dd"
        emissive="#5533bb"
        emissiveIntensity={1}
        wireframe
        transparent
        opacity={0.6}
        toneMapped={false}
      />
    </mesh>
  );
}

function RoomPortal({
  wingIndex,
  onEnter,
}: {
  wingIndex: number;
  onEnter: () => void;
}) {
  const wing = wings[wingIndex];
  const z = -(wingIndex * ROOM_SPACING + 30);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <group position={[0, 0, z + 18]}>
      <mesh ref={meshRef} position={[0, 1.5, 0]}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial
          color={wing.accentColor}
          emissive={wing.accentColor}
          emissiveIntensity={1.5}
          toneMapped={false}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh position={[0, 1.5, 0]} onClick={onEnter}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <pointLight position={[0, 2, 0]} color={wing.accentColor} intensity={3} distance={12} />
    </group>
  );
}

function Ground() {
  const gridTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#050520';
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = '#0c0c35';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 512; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(20, 60);
    return tex;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -100]}>
      <planeGeometry args={[80, 300]} />
      <meshStandardMaterial map={gridTexture} />
    </mesh>
  );
}

export default function MuseumScene({
  currentRoom,
  onExhibitClick,
  onRoomEnter,
}: MuseumSceneProps) {
  return (
    <>
      <CameraRig currentRoom={currentRoom} />

      {/* Strong ambient so rooms are well-lit */}
      <ambientLight intensity={0.8} color="#8888cc" />

      {/* Push fog way back so rooms aren't eaten */}
      <fog attach="fog" args={['#020210', 40, 120]} />

      <Ground />

      {/* Lobby */}
      <LobbyCenterpiece />
      <pointLight position={[0, 6, 2]} intensity={2} color="#7755dd" distance={25} />
      <pointLight position={[-3, 3, 5]} intensity={1} color="#4488ff" distance={15} />
      <pointLight position={[3, 3, 5]} intensity={1} color="#ff44aa" distance={15} />

      {/* Room portals */}
      {wings.map((_, i) => (
        <RoomPortal key={i} wingIndex={i} onEnter={() => onRoomEnter(i)} />
      ))}

      {/* Gallery rooms — only render current and adjacent rooms */}
      {wings.map((wing, i) => {
        const z = -(i * ROOM_SPACING + 30);
        const distance = Math.abs(i - currentRoom);
        // Only render rooms within 1 of current (or all if in lobby)
        if (currentRoom >= 0 && distance > 1) return null;
        return (
          <GalleryRoom
            key={wing.id}
            wing={wing}
            position={[0, 0, z]}
            onExhibitClick={onExhibitClick}
            isActive={currentRoom === i}
          />
        );
      })}

      {/* Ambient sparkles */}
      <Sparkles
        count={400}
        scale={[30, 10, 250]}
        position={[0, 5, -100]}
        size={1.5}
        speed={0.15}
        opacity={0.25}
        color="#8888dd"
      />
    </>
  );
}
