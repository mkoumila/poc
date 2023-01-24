import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Ground } from "./Ground";

const Model = () => {
  return (
    <>
      {/* It makes it possible to move the camera around the fixed point which is the target of the OrbitControls */}
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />;
      {/* This is the camera we gonna use for this project and we specified the field of view and the position of it, and we also made it the default camera */}
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />;
      {/* Specify a ground color and attach it the Canvas's background */}
      <color args={[0, 0, 0]} attach={"background"} />
      {/* SpotLight  */}
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={1.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadowBias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={1.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadowBias={-0.0001}
      />
      <Ground />
    </>
  );
};

let CarComplex = () => {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <Model />
      </Canvas>
    </Suspense>
  );
};

export default CarComplex;
