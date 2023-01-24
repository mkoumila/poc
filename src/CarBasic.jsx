import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

const Model = (props) => {
  const { scene } = useGLTF(process.env.PUBLIC_URL + "models/scene.glb");
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
