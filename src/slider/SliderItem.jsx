import {
  Environment,
  OrbitControls,
  Stage,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const Model = ({ modelPath, backgroundColor = "#FFF", scale = 0.01 }) => {
  // Utility to convert Degree to Radian
  const angleToRadians = (angleInDeg) => (Math.PI / 180) * angleInDeg;

  // Code to move the camera around
  const orbitControlsRef = useRef(null);

  useFrame((state) => {
    if (!!orbitControlsRef.current) {
      const { x, y } = state.mouse;
      orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
      orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(60));
      orbitControlsRef.current.update();
    }
  });

  const { scene } = useGLTF(process.env.PUBLIC_URL + modelPath);

  return (
    <>
      {/* Controls */}
      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={angleToRadians(60)}
        maxPolarAngle={angleToRadians(80)}
        enableZoom={false}
        enablePan={false}
      />
      {/* Model */}
      <primitive object={scene} scale={scale} />

      {/* Environmnet */}
      <Environment background>
        <mesh>
          <sphereGeometry args={[15, 32, 16]} />
          <meshBasicMaterial color={backgroundColor} side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  );
};

const SliderItem = ({ modelPath, backgroundColor, title, sub, scale }) => {
  return (
    <div className="slider_item">
      <Canvas camera={{ fov: 35, zoom: 0.5 }}>
        <Suspense fallback={null}>
          <Stage intensity={0} shadows="false">
            <Model
              modelPath={modelPath}
              backgroundColor={backgroundColor}
              scale={scale}
            />
          </Stage>
        </Suspense>
      </Canvas>
      {/* Typography component */}

      <h3>{title}</h3>
      <p>{sub}</p>
    </div>
  );
};

export default SliderItem;
