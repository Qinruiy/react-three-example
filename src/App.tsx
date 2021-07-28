import React, { FC, ReactNode, Suspense } from "react";
import "./App.css";
import { useRef, HTMLAttributes } from "react";
import { Mesh, Vector3 } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Stats,
  OrbitControls,
  useGLTF,
  AdaptiveDpr,
  AdaptiveEvents,
} from "@react-three/drei";

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

const Archer = () => {
  const { scene } = useGLTF("/archer.glb", true);

  const mesh = useRef<Mesh>();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={mesh} object={scene}></primitive>;
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
