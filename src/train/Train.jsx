import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  useAnimations,
  Stage,
  useGLTF,
  useTexture,
} from "@react-three/drei";

const Model = (props) => {
  const [hovered, setHovered] = useState(false);

  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    process.env.PUBLIC_URL + "models/train/train_global.glb"
  );
  const { actions } = useAnimations(animations, group);

  // This hook gives you offets, ranges and other useful things
  const scroll = useScroll();

  useEffect(() => {
    actions["Empty_Follow_CAMERA"].play().paused = true;
  }, [actions]);

  // on mouse hover over element, change cursor style
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  useFrame((state, delta) => {
    // Get car element
    let car = group.current.getObjectByName("z-KART");
    // Animate on scroll
    const action = actions["Empty_Follow_CAMERA"];
    const offset = scroll.offset;
    action.time = THREE.MathUtils.damp(
      action.time,
      action.getClip().duration * offset,
      100,
      delta
    );

    // Move camera to car position
    car.getWorldPosition(state.camera.position);

    // Change camera position in mobile and desktop
    if (window.innerWidth < 1024) {
      // How up the camera is from the car
      state.camera.translateY(0.65);
      // How camera is far from car
      state.camera.translateZ(1.4);
    } else {
      // How up the camera is from the car
      state.camera.translateY(0.3);
      // How camera is far from car
      state.camera.translateZ(0.5);
    }

    // Create a focal point to look at with the camera (not added to scene)
    // give that point the same location and rotation as the car
    // move it ahead of the car along its rotational axis
    let povPoint = new THREE.Object3D();
    car.getWorldQuaternion(povPoint.quaternion);
    car.getWorldPosition(povPoint.position);
    povPoint.translateX(1);

    // Look at the focal point
    state.camera.lookAt(povPoint.position);

    //group.current.getObjectByName("sky").rotation.z += delta
  });

  const externalLink = (e, link, target = "_blank") => {
    e.stopPropagation();
    window.open(link, target);
  };

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Z-CURVE-circuit-horizontal-et-rotation" scale={0.39}>
          <group name="Empty_Follow_CAMERA" position={[-11.65, 0.49, -0.11]}>
            <mesh
              name="z-KART"
              geometry={nodes["z-KART"].geometry}
              material={materials["Material.001"]}
              position={[0.55, -0.32, 0.35]}
              rotation={[0.02, -0.04, -0.06]}
              scale={1.01}
            />
          </group>
        </group>
        <mesh
          name="cube-parent"
          geometry={nodes["cube-parent"].geometry}
          material={nodes["cube-parent"].material}
          scale={0.03}
        >
          <mesh
            name="joint001"
            geometry={nodes.joint001.geometry}
            material={materials["Joint-rail-material"]}
            scale={10.25}
          />
          <mesh
            name="tube-d001"
            geometry={nodes["tube-d001"].geometry}
            material={nodes["tube-d001"].material}
            scale={10.25}
          />
          <mesh
            name="tube-g001"
            geometry={nodes["tube-g001"].geometry}
            material={nodes["tube-g001"].material}
            scale={10.25}
          />
        </mesh>
        <mesh
          name="CLOUD-meshed"
          geometry={nodes["CLOUD-meshed"].geometry}
          material={materials["Material.003"]}
          position={[9.74, 0.12, 2.31]}
          rotation={[0, 0.17, 0]}
          scale={0.37}
        />
        <mesh
          name="CLOUD-meshed001"
          geometry={nodes["CLOUD-meshed001"].geometry}
          material={materials["Material.004"]}
          position={[12.83, -3.06, -4.66]}
          rotation={[0, -0.01, 0]}
          scale={0.44}
        />
        <mesh
          name="CLOUD-meshed002"
          geometry={nodes["CLOUD-meshed002"].geometry}
          material={materials["Material.005"]}
          position={[21.71, 2.56, -2.8]}
          rotation={[0.13, 0.2, 0]}
          scale={0.55}
        />
        <mesh
          name="CLOUD-meshed003"
          geometry={nodes["CLOUD-meshed003"].geometry}
          material={materials["Material.006"]}
          position={[2.95, -1.27, 2.1]}
          scale={0.29}
        />
        <mesh
          name="CLOUD-meshed004"
          geometry={nodes["CLOUD-meshed004"].geometry}
          material={materials["Material.008"]}
          position={[7.8, 0.75, -1.77]}
          rotation={[0, -0.01, 0]}
          scale={0.3}
        />
        <mesh
          name="CLOUD-meshed005"
          geometry={nodes["CLOUD-meshed005"].geometry}
          material={materials["Material.007"]}
          position={[4.69, -1.45, -1.13]}
          rotation={[0, -0.01, 0]}
          scale={0.21}
        />
        <mesh
          name="CLOUD-meshed006"
          geometry={nodes["CLOUD-meshed006"].geometry}
          material={materials["Material.009"]}
          position={[0, 0.74, 0.93]}
          rotation={[0, -0.01, 0]}
          scale={0.28}
        />
        <mesh
          name="CLOUD-meshed007"
          geometry={nodes["CLOUD-meshed007"].geometry}
          material={materials["Material.010"]}
          position={[14.06, -3.6, 2.32]}
          rotation={[0, 0.07, 0.24]}
          scale={0.29}
        />
        <mesh
          name="CLOUD-meshed008"
          geometry={nodes["CLOUD-meshed008"].geometry}
          material={materials["Material.011"]}
          position={[19.66, -5.95, -4.86]}
          rotation={[0.26, 0.09, 0.35]}
          scale={0.3}
        />
        <mesh
          name="CLOUD-meshed009"
          geometry={nodes["CLOUD-meshed009"].geometry}
          material={materials["Material.012"]}
          position={[25.9, -3.62, 0.41]}
          rotation={[-0.05, 0.12, 0.67]}
          scale={0.59}
        />
        <mesh
          name="CLOUD-meshed010"
          geometry={nodes["CLOUD-meshed010"].geometry}
          material={materials["Material.013"]}
          position={[26.07, -6.38, 0.56]}
          rotation={[0.21, 0.1, 0.39]}
          scale={0.41}
        />
        <mesh
          name="CLOUD-meshed011"
          geometry={nodes["CLOUD-meshed011"].geometry}
          material={materials["Material.014"]}
          position={[29.29, -1.24, 0.55]}
          rotation={[0.03, 0.11, 0.4]}
          scale={0.09}
        />
        <mesh
          name="CLOUD-meshed012"
          geometry={nodes["CLOUD-meshed012"].geometry}
          material={materials["Material.015"]}
          position={[28.12, 3.06, 1.99]}
          rotation={[0.03, 0.11, 0.4]}
          scale={0.18}
        />
        <mesh
          name="CLOUD-meshed013"
          geometry={nodes["CLOUD-meshed013"].geometry}
          material={materials["Material.016"]}
          position={[20.86, -8.21, 1.49]}
          rotation={[-0.15, 0.15, 0.44]}
          scale={0.3}
        />
        <mesh
          name="CLOUD-meshed014"
          geometry={nodes["CLOUD-meshed014"].geometry}
          material={materials["Material.017"]}
          position={[19.07, -1.33, 3.78]}
          rotation={[-0.03, 0.16, 0.68]}
          scale={0.59}
        />
        <mesh
          name="CLOUD-meshed015"
          geometry={nodes["CLOUD-meshed015"].geometry}
          material={materials["Material.018"]}
          position={[25.49, -0.78, -2.54]}
          rotation={[-0.13, 0.1, 0.45]}
          scale={0.26}
        />
        <mesh
          name="CLOUD-meshed016"
          geometry={nodes["CLOUD-meshed016"].geometry}
          material={materials["Material.019"]}
          position={[27.32, -2.09, -2.53]}
          rotation={[0.03, 0.11, 0.4]}
          scale={0.18}
        />
        <mesh
          name="CLOUD-meshed017"
          geometry={nodes["CLOUD-meshed017"].geometry}
          material={materials["Material.020"]}
          position={[27.92, 3.38, -0.62]}
          rotation={[0.03, 0.11, 0.4]}
          scale={0.19}
        />
        <mesh
          name="CLOUD-meshed018"
          geometry={nodes["CLOUD-meshed018"].geometry}
          material={materials["Material.021"]}
          position={[30, -0.55, 1.35]}
          rotation={[-0.17, 0.08, 0.44]}
          scale={0.15}
        />
        <mesh
          name="CLOUD-meshed019"
          geometry={nodes["CLOUD-meshed019"].geometry}
          material={materials["Material.022"]}
          position={[34.83, 0.07, -1.22]}
          rotation={[-0.17, 0.08, 0.44]}
          scale={0.15}
        />
        <mesh
          name="CLOUD-meshed020"
          geometry={nodes["CLOUD-meshed020"].geometry}
          material={materials["Material.023"]}
          position={[35.1, -0.81, 0.45]}
          rotation={[0.03, 0.08, 0.41]}
          scale={0.18}
        />
        <mesh
          name="CLOUD-meshed021"
          geometry={nodes["CLOUD-meshed021"].geometry}
          material={materials["Material.024"]}
          position={[17.49, -11.92, 0.39]}
          rotation={[-0.15, 0.15, 0.44]}
          scale={0.13}
        />
        <mesh
          name="CLOUD-meshed022"
          geometry={nodes["CLOUD-meshed022"].geometry}
          material={materials["Material.025"]}
          position={[18.2, -8.63, -3.51]}
          rotation={[-0.04, 0.08, 0.38]}
          scale={0.13}
        />
        <mesh
          name="CLOUD-meshed023"
          geometry={nodes["CLOUD-meshed023"].geometry}
          material={materials["Material.026"]}
          position={[23.12, -13.71, 0.75]}
          rotation={[-0.15, 0.15, 0.44]}
          scale={0.29}
        />
        <mesh
          name="CLOUD-meshed024"
          geometry={nodes["CLOUD-meshed024"].geometry}
          material={materials["Material.027"]}
          position={[34.8, -2.46, -4.19]}
          rotation={[0.11, 0.08, 0.44]}
          scale={0.15}
        />
        <mesh
          name="CLOUD-meshed025"
          geometry={nodes["CLOUD-meshed025"].geometry}
          material={materials["Material.028"]}
          position={[31.97, 3.81, 0.46]}
          rotation={[0.03, 0.11, 0.4]}
          scale={0.18}
        />
        <mesh
          name="TYPO_AVEC_FOND"
          geometry={nodes.TYPO_AVEC_FOND.geometry}
          material={materials["export-typo-avec-fond"]}
          position={[8.95, -0.39, 0.29]}
          rotation={[1.71, 0.03, 1.75]}
          scale={0.26}
        />
        <mesh
          name="Carton-typo-insight-futura-"
          geometry={nodes["Carton-typo-insight-futura-"].geometry}
          material={materials["Carton-typo-insight-futura-"]}
          position={[31.58, -0.65, -0.63]}
          rotation={[1.48, 0.02, 1.19]}
          scale={0.68}
        />
        <mesh
          name="carton-typo-UX-"
          geometry={nodes["carton-typo-UX-"].geometry}
          material={materials["carton-typo-UX-"]}
          position={[1.18, 1.68, -0.71]}
          rotation={[1.48, 0.01, 1.2]}
          scale={0.61}
          onClick={(e) =>
            externalLink(
              e,
              "https://void.fr/fr/design-experience-UX/",
              "_blank"
            )
          }
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        />
        <mesh
          name="cartontypo-social-media-"
          geometry={nodes["cartontypo-social-media-"].geometry}
          material={materials["cartontypo-social-media-"]}
          position={[15.34, -5.31, 0.47]}
          rotation={[1.63, -0.02, 1.2]}
          scale={0.45}
        />
        <mesh
          name="carton-typo-etude-de-cas-"
          geometry={nodes["carton-typo-etude-de-cas-"].geometry}
          material={materials["carton-typo-etude-de-cas-"]}
          position={[23.46, -0.64, -0.44]}
          rotation={[Math.PI / 2, 0, 1.17]}
          scale={0.44}
        />
        <mesh
          name="carton-typo-Perf-marketing_1-"
          geometry={nodes["carton-typo-Perf-marketing_1-"].geometry}
          material={materials["carton-typo-Perf-marketing_1-"]}
          position={[4.58, -0.77, 0.98]}
          rotation={[1.51, -0.01, 1.77]}
          scale={0.36}
        />
      </group>
    </group>
  );
};

const Background = () => {
  const { gl } = useThree();

  const texture = useTexture(
    `${process.env.PUBLIC_URL}imgs/image-fond-world.jpg`
  );
  const formatted = new THREE.WebGLCubeRenderTarget(
    texture.image.height
  ).fromEquirectangularTexture(gl, texture);

  return <primitive attach="background" object={formatted.texture} />;
};

const Train = () => {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <Stage environment={null}>
            <ScrollControls pages={4}>
              <Model />
            </ScrollControls>
          </Stage>
          <Background />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Train;
