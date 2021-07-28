import React, { FC, ReactNode, Suspense } from "react";
import "./App.css";
import { useRef, HTMLAttributes } from "react";
import { Vector3 } from "three/src/math/Vector3";
import { MeshStandardMaterial } from "three/src/materials/MeshStandardMaterial";
import { Mesh } from "three/src/objects/Mesh";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Stats,
  OrbitControls,
  useGLTF,
  AdaptiveDpr,
  AdaptiveEvents,
} from "@react-three/drei";
import archer from "./assets/archer.glb?url";
import { GLTF } from "three-stdlib";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!</p>
      </header>
      <Three className="App-Canvas" />
    </div>
  );
};

export default App;

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: Mesh;
    mesh_1: Mesh;
    mesh_2: Mesh;
  };
  materials: {
    material_0: MeshStandardMaterial;
  };
};

const Archer = () => {
  const { nodes, materials } = useGLTF(archer, true) as GLTFResult;

  const mesh = useRef<Mesh>();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.z += 0.01;
    }
  });

  return (
    <group dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group ref={mesh} position={[0, 0, 2]}>
          <mesh
            castShadow
            receiveShadow
            material={materials.material_0}
            geometry={nodes.mesh_0.geometry}
          />
          <mesh
            castShadow
            receiveShadow
            material={materials.material_0}
            geometry={nodes.mesh_1.geometry}
          />
          <mesh
            castShadow
            receiveShadow
            material={materials.material_0}
            geometry={nodes.mesh_2.geometry}
          />
        </group>
      </group>
    </group>
  );
};

const Three: FC<HTMLAttributes<ReactNode>> = ({ className }) => {
  return (
    <Canvas
      shadows
      dpr={window.devicePixelRatio}
      camera={{ position: new Vector3(0, 0, 30), fov: 50 }}
      performance={{ min: 0.5 }}
      style={{ height: 800 }}
    >
      <Story />
      <Stats className="stats" />
    </Canvas>
  );
};

const Story = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Archer />
      </Suspense>
      <directionalLight
        intensity={0.2}
        position={[10, 10, 5]}
        shadow-mapSize-width={64}
        shadow-mapSize-height={64}
        castShadow
        shadow-bias={-0.001}
      />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <OrbitControls regress />
    </>
  );
};
