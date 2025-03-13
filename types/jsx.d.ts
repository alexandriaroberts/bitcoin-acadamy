import type { ReactThreeFiber } from '@react-three/fiber';
import type * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      cylinderGeometry: ReactThreeFiber.BufferGeometryNode<
        THREE.CylinderGeometry,
        typeof THREE.CylinderGeometry
      >;
      meshStandardMaterial: ReactThreeFiber.MaterialNode<
        THREE.MeshStandardMaterial,
        typeof THREE.MeshStandardMaterial
      >;
      group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>;
    }
  }
}
