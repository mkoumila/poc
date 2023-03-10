import * as THREE from "three";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  useAnimations,
  Stage,
  Html,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = (props) => {
  const [hovered, setHovered] = useState(false);

  const group = useRef();

  const { nodes, materials, animations } = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/train/train_global.gltf"
  );

  const { actions } = useAnimations(animations, group);

  // This hook gives you offets, ranges and other useful things
  const scroll = useScroll();

  // To avoid camera passing through the GLtf objects
  useLayoutEffect(() => {
    Object.values(nodes["clouds"].children).forEach((cloud) => {
      cloud.material.side = THREE.FrontSide;
    });
  });

  useEffect(() => {
    actions["Action"].play().paused = true;
    actions["action_logo_void"].play().paused = false;
  }, [actions]);

  // on mouse hover over element, change cursor style
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  useFrame((state, delta) => {
    // Get car element
    let car = group.current.getObjectByName("kart");
    // Animate on scroll
    const action = actions["Action"];
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
      state.camera.translateY(0.3);
      // How camera is far from car
      state.camera.translateZ(0);
      // Reducing camera scale to put directly behind the train
      state.camera.scale.set(0.1, 0.1, 0.1);
    } else {
      // How up the camera is from the car
      state.camera.translateY(0.3);
      // How camera is far from car
      state.camera.translateZ(0);
      // Reducing camera scale to put directly behind the train
      state.camera.scale.set(0.1, 0.1, 0.1);
    }

    // Create a focal point to look at with the camera
    // give that point the same location and rotation as the car
    // move it ahead of the car along its rotational axis
    let povPoint = new THREE.Object3D();
    car.getWorldQuaternion(povPoint.quaternion);
    car.getWorldPosition(povPoint.position);
    povPoint.translateX(1);

    // Look at the focal point
    state.camera.lookAt(povPoint.position);
  });

  const externalLink = (e, link, target = "_blank") => {
    e.stopPropagation();
    window.open(link, target);
  };

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="model">
          <group name="circuit_model">
            <mesh
              name="joints"
              geometry={nodes.joints.geometry}
              material={materials["Joint-rail-material"]}
              scale={0.26}
            />
            <mesh
              name="tube-gauche"
              geometry={nodes["tube-gauche"].geometry}
              material={materials["rail-tube-material"]}
              scale={0.26}
            />
            <mesh
              name="tube_droit"
              geometry={nodes.tube_droit.geometry}
              material={materials["rail-tube-material"]}
              scale={0.26}
            />
          </group>
          <group name="clouds">
            <mesh
              name="cloud001"
              geometry={nodes.cloud001.geometry}
              material={materials["material-cloud.008"]}
              position={[55.17, 0.11, 11.65]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={1.37}
            />
            <mesh
              name="cloud002"
              geometry={nodes.cloud002.geometry}
              material={materials["material-cloud.011"]}
              position={[20.42, -8.94, -3.99]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.25}
            />
            <mesh
              name="cloud003"
              geometry={nodes.cloud003.geometry}
              material={materials["material-cloud.012"]}
              position={[44.42, -5.41, 3.96]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.25}
            />
            <mesh
              name="cloud004"
              geometry={nodes.cloud004.geometry}
              material={materials["material-cloud-pink"]}
              position={[28.5, -13.99, 2.17]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.47}
            />
            <mesh
              name="cloud005"
              geometry={nodes.cloud005.geometry}
              material={materials["material-cloud.015"]}
              position={[39.47, 6.3, -2.17]}
              rotation={[-1.97, 1.51, 1.92]}
              scale={0.94}
            />
            <mesh
              name="cloud006"
              geometry={nodes.cloud006.geometry}
              material={materials["material-cloud.016"]}
              position={[7.34, 7, 3.91]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.42}
            />
            <mesh
              name="cloud007"
              geometry={nodes.cloud007.geometry}
              material={materials["material-cloud-pink"]}
              position={[27.79, 1.91, -3.26]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.28}
            />
            <mesh
              name="cloud008"
              geometry={nodes.cloud008.geometry}
              material={materials["material-cloud.018"]}
              position={[26.95, -1.19, 1.59]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.25}
            />
            <mesh
              name="cloud010"
              geometry={nodes.cloud010.geometry}
              material={materials["material-cloud-pink"]}
              position={[44.14, -4.12, -11.14]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.25}
            />
            <mesh
              name="cloud011"
              geometry={nodes.cloud011.geometry}
              material={materials["material-cloud.021"]}
              position={[54.28, -1.84, -6.16]}
              rotation={[-Math.PI, 1.05, -Math.PI]}
              scale={0.51}
            />
            <mesh
              name="cloud013"
              geometry={nodes.cloud013.geometry}
              material={materials["material-cloud.023"]}
              position={[12.37, -0.59, -5.21]}
              rotation={[-Math.PI, 1.36, -Math.PI]}
              scale={0.69}
            />
            <mesh
              name="cloud014"
              geometry={nodes.cloud014.geometry}
              material={materials["material-cloud-pink"]}
              position={[16.27, 6.87, -6.7]}
              rotation={[0.03, -1.34, -0.01]}
              scale={0.5}
            />
            <mesh
              name="cloud015"
              geometry={nodes.cloud015.geometry}
              material={materials["material-cloud.001"]}
              position={[9.21, -4.66, 4.75]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.42}
            />
            <mesh
              name="cloud016"
              geometry={nodes.cloud016.geometry}
              material={materials["material-cloud.024"]}
              position={[32.16, 16.38, 1.7]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.28}
            />
            <mesh
              name="cloud017"
              geometry={nodes.cloud017.geometry}
              material={materials["material-cloud.026"]}
              position={[60.54, 7.81, 5.63]}
              rotation={[1.41, 1.55, -1.12]}
              scale={0.61}
            />
            <mesh
              name="cloud018"
              geometry={nodes.cloud018.geometry}
              material={materials["material-cloud.003"]}
              position={[60.28, -7.6, -1.15]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.68}
            />
            <mesh
              name="cloud019"
              geometry={nodes.cloud019.geometry}
              material={materials["material-cloud.006"]}
              position={[24.34, -9.73, 10.96]}
              rotation={[0, -1.31, 0]}
              scale={0.72}
            />
            <mesh
              name="cloud021"
              geometry={nodes.cloud021.geometry}
              material={materials["material-cloud-pink"]}
              position={[35.05, -9.22, -3.41]}
              rotation={[-1.97, 1.51, 1.92]}
              scale={0.94}
            />
            <mesh
              name="cloud026"
              geometry={nodes.cloud026.geometry}
              material={materials["material-cloud.004"]}
              position={[25.46, -0.05, -6.53]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.28}
            />
            <mesh
              name="cloud030"
              geometry={nodes.cloud030.geometry}
              material={materials["material-cloud.034"]}
              position={[46, 22.62, -7.67]}
              rotation={[0, Math.PI / 2, 0]}
              scale={1.42}
            />
            <mesh
              name="cloud031"
              geometry={nodes.cloud031.geometry}
              material={materials["material-cloud-pink"]}
              position={[6.05, -6.53, -0.37]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.22}
            />
            <mesh
              name="cloud036"
              geometry={nodes.cloud036.geometry}
              material={materials["material-cloud.040"]}
              position={[-1.59, -1.29, -3.21]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.26}
            />
            <mesh
              name="cloud037"
              geometry={nodes.cloud037.geometry}
              material={materials["material-cloud-pink"]}
              position={[12.02, -0.57, 7.14]}
              rotation={[0.14, 1.45, 2.36]}
              scale={0.37}
            />
            <mesh
              name="cloud039"
              geometry={nodes.cloud039.geometry}
              material={materials["material-cloud.025"]}
              position={[13.39, 11.98, 5.15]}
              rotation={[3.06, 1.36, -0.56]}
              scale={0.55}
            />
            <mesh
              name="cloud040"
              geometry={nodes.cloud040.geometry}
              material={materials["material-cloud.002"]}
              position={[9.09, -4.7, -6.48]}
              rotation={[3.05, -1.45, -0.79]}
              scale={0.52}
            />
          </group>
          <group name="planes">
            <mesh
              name="carton-typo-drupal"
              geometry={nodes["carton-typo-drupal"].geometry}
              material={materials["export-typo-avec-fond"]}
            />
            <mesh
              name="carton-typo-ending"
              geometry={nodes["carton-typo-ending"].geometry}
              material={materials["export-typo-avec-fond.001"]}
            />
            <mesh
              name="carton-typo-etude-de-cas"
              geometry={nodes["carton-typo-etude-de-cas"].geometry}
              material={materials["carton-typo-etude-de-cas-"]}
            />
            <mesh
              name="carton-typo-insight"
              geometry={nodes["carton-typo-insight"].geometry}
              material={materials["Carton-typo-insight-futura-"]}
            />
            <mesh
              name="carton-typo-perf-marketing"
              geometry={nodes["carton-typo-perf-marketing"].geometry}
              material={materials["carton-typo-Perf-marketing_1-"]}
            />
            <mesh
              name="carton-typo-social-media"
              geometry={nodes["carton-typo-social-media"].geometry}
              material={materials["cartontypo-social-media-"]}
            />
            <mesh
              name="carton-typo-UX"
              geometry={nodes["carton-typo-UX"].geometry}
              material={materials["carton-typo-UX-"]}
            />
            <mesh
              name="plane-welcome"
              geometry={nodes["plane-welcome"].geometry}
              material={materials["carton-typo-UX-.001"]}
            />
          </group>
          <group name="sky">
            <group
              name="light"
              position={[17.62, 13.96, 2.77]}
              rotation={[-1.23, 0.1, 1.68]}
            />
            <mesh
              name="sky_sphere"
              geometry={nodes.sky_sphere.geometry}
              material={materials["degrade-texture"]}
              position={[25.82, 2.66, 0.22]}
              scale={48.28}
            />
          </group>
          <group
            name="void-logo-container"
            position={[52.83, 0.55, 4.29]}
            rotation={[0, -0.01, 1.57]}
          >
            <mesh
              name="void-logo"
              geometry={nodes["void-logo"].geometry}
              material={materials["SVGMat.001"]}
              position={[-0.59, 0.99, 0.03]}
              rotation={[0, -1.57, 0]}
              scale={2.14}
            />
          </group>
          <mesh
            name="kart"
            geometry={nodes.kart.geometry}
            material={materials["red-for-kart"]}
            position={[-6.2, 0, 0.09]}
          />
        </group>
      </group>
    </group>
  );
};

const LoadingOverlay = () => {
  return (
    <Html as="div" className="slider_loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Html>
  );
};

const Train = () => {
  return (
    <div style={{ backgroundColor: "#000", height: "100%" }}>
      <Canvas>
        <Suspense fallback={<LoadingOverlay />}>
          <Stage environment={null} adjustCamera={false}>
            <ScrollControls pages={20}>
              <Model />
            </ScrollControls>
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  );
};

useLoader.preload(
  GLTFLoader,
  process.env.PUBLIC_URL + "/models/train/train_global.gltf"
);

export default Train;
