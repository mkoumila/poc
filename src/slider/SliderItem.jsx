import { Suspense, useRef } from "react";
import {
  Environment,
  Html,
  Loader,
  OrbitControls,
  Stage,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LayerMaterial, Depth } from "lamina";

const Model = ({
  modelPath,
  colorA = "#FFF",
  colorB = "#FFF",
  scale = 0.01,
  title,
  sub,
  btnTitle,
  btnLink,
}) => {
  // Utility to convert Degree to Radian
  const angleToRadians = (angleInDeg) => (Math.PI / 180) * angleInDeg;

  const { scene } = useGLTF(process.env.PUBLIC_URL + modelPath);

  // Code to move the camera around
  const orbitControlsRef = useRef(null);

  useFrame((state) => {
    if (!!orbitControlsRef.current) {
      const { x, y } = state.mouse;
      // Allow Model to move with mouse direction
      orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
      orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90));
      // Stop model from receiving shado
      orbitControlsRef.current.receiveShadow = false;
      orbitControlsRef.current.update();
    }
  });

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

      {/* Typography component */}
      <Html as="div" wrapperClass="slider_item-text">
        {title && <h3>{title}</h3>}
        {sub && <p>{sub}</p>}
        {btnLink && btnTitle && (
          <a href={btnLink} target="_blank">
            {btnTitle}
          </a>
        )}
      </Html>

      {/* Background */}
      <Environment background resolution={64}>
        <mesh scale={100}>
          <sphereGeometry />
          <LayerMaterial side={THREE.BackSide}>
            <Depth
              colorA={new THREE.Color(colorA).convertSRGBToLinear()}
              colorB={new THREE.Color(colorB).convertSRGBToLinear()}
              near={0}
              far={300}
              origin={[100, 100, 100]}
            />
          </LayerMaterial>
        </mesh>
      </Environment>
    </>
  );
};

const SliderItem = ({
  modelPath,
  colorA,
  colorB,
  title,
  sub,
  scale,
  btnTitle,
  btnLink,
}) => {
  return (
    <div className="slider_item">
      <Canvas camera={{ fov: 35, zoom: 0.5 }}>
        <Suspense fallback={null}>
          <Stage intensity={0} shadows="false">
            <Model
              modelPath={modelPath}
              colorA={colorA}
              colorB={colorB}
              scale={scale}
              title={title}
              sub={sub}
              btnTitle={btnTitle}
              btnLink={btnLink}
            />
          </Stage>
        </Suspense>
      </Canvas>
      <Loader containerStyles />
    </div>
  );
};

export default SliderItem;
