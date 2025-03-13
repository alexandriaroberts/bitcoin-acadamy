'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type * as THREE from 'three';

function BitcoinModel() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Bitcoin coin base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial color='#f7931a' metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Bitcoin symbol */}
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.05]} />
        <meshStandardMaterial color='#ffffff' />
      </mesh>
      <mesh position={[0, -0.11, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.05]} />
        <meshStandardMaterial color='#ffffff' />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.05]} />
        <meshStandardMaterial color='#ffffff' />
      </mesh>
      <mesh position={[0.15, 0, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.05]} />
        <meshStandardMaterial color='#ffffff' />
      </mesh>
    </group>
  );
}

export function BitcoinLogo() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <BitcoinModel />
    </Canvas>
  );
}
