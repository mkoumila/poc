import * as THREE from "three";
import { Suspense, useEffect, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ScrollControls,
  Sky,
  useScroll,
  useGLTF,
  useAnimations,
} from "@react-three/drei";

const Model = ({ ...props }) => {
  // This hook gives you offets, ranges and other useful things
  const scroll = useScroll();
  const { scene, nodes, animations } = useGLTF(
    "/LittlestTokyo-transformed.glb"
  );

  const { actions } = useAnimations(animations, scene);
  useLayoutEffect(() =>
    Object.values(nodes).forEach(
      (node) => (node.receiveShadow = node.castShadow = true)
    )
  );
  useEffect(() => void (actions["Take 001"].play().paused = true), [actions]);
  useFrame((state, delta) => {
    const action = actions["Take 001"];
    // The offset is between 0 and 1, you can apply it to your models any way you like
    const offset = 1 - scroll.offset;
    action.time = THREE.MathUtils.damp(
      action.time,
      (action.getClip().duration / 2) * offset,
      100,
      delta
    );
    state.camera.position.set(
      Math.sin(offset) * -20,
      Math.atan(offset * Math.PI * 2) * 5,
      Math.cos((offset * Math.PI) / 3) * -10
    );
    state.camera.lookAt(0, 0, 0);
  });
  return <primitive object={scene} {...props} />;
};

const Tokyo = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 2]}
          shadows
          camera={{ position: [0, 0, 10], near: 0.1, far: 1000 }}
          style={{ position: "absolute" }}
        >
          <fog attach="fog" args={["#6c6c7f", 5, 20]} />
          <spotLight
            angle={0.14}
            color="#ffd0d0"
            penumbra={1}
            position={[25, 50, -30]}
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
            castShadow
          />
          <Sky scale={100} sunPosition={[100, 0.4, 100]} />
          <ScrollControls pages={2}>
            <Model scale={0.02} position={[0, 2.5, 0]} />
          </ScrollControls>
        </Canvas>
      </Suspense>
    </>
  );
};

//useGLTF.preload("/LittlestTokyo-transformed.glb");

export default Tokyo;
