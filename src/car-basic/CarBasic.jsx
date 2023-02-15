import { Canvas, useLoader } from "@react-three/fiber";
import { Stage, PresentationControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = (props) => {
  const { scene } = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/car/scene.gltf"
  );
  return <primitive object={scene} {...props} />;
};

let CarBasic = () => {
  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 45 }} style={{ position: "absolute" }}>
      <color attach="background" args={["#000"]} />
      <PresentationControls speed={4} zoom={0.5} polar={[0.1, Math.PI / 3]}>
        <Stage environment={null}>
          <Model scale={0.01} />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
};

export default CarBasic;
