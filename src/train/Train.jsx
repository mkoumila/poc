import * as THREE from "three";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  useAnimations,
  Stage,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = (props) => {
  const [hovered, setHovered] = useState(false);

  const group = useRef();

  const { nodes, materials, animations } = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/train/train_global_2.gltf"
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
      state.camera.translateZ(0.3);
      // Reducing camera scale to put directly behind the train
      state.camera.scale.set(0.1, 0.1, 0.1);
    } else {
      // How up the camera is from the car
      state.camera.translateY(0.15);
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

    //group.current.getObjectByName("sky").rotation.z += delta
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
          <group name="planes">
            <mesh
              name="carton-typo-drupal"
              geometry={nodes["carton-typo-drupal"].geometry}
              material={materials["export-typo-avec-fond"]}
              position={[10.78, -0.39, 0.3]}
              rotation={[1.6, -0.03, 1.76]}
              scale={0.26}
              onClick={(e) => {
                externalLink(
                  e,
                  "https://void.fr/fr/agence-digitale-experte-drupal/",
                  "_blank"
                );
              }}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
            />
            <mesh
              name="carton-typo-etude-de-cas"
              geometry={nodes["carton-typo-etude-de-cas"].geometry}
              material={materials["carton-typo-etude-de-cas-"]}
              onClick={(e) => {
                externalLink(
                  e,
                  "https://void.fr/fr/etude-de-cas-marketing-digital/",
                  "_blank"
                );
              }}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
            />
            <mesh
              name="carton-typo-insight"
              geometry={nodes["carton-typo-insight"].geometry}
              material={materials["Carton-typo-insight-futura-"]}
              onClick={(e) => {
                externalLink(e, "https://void.fr/fr/insights/", "_blank");
              }}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
            />
            <mesh
              name="carton-typo-perf-marketing"
              geometry={nodes["carton-typo-perf-marketing"].geometry}
              material={materials["carton-typo-Perf-marketing_1-"]}
              position={[5.22, -0.76, 0.98]}
              rotation={[1.54, -0.03, 2.17]}
              scale={0.36}
              onClick={(e) => {
                externalLink(
                  e,
                  "https://void.fr/fr/performance-strategie-digitale/",
                  "_blank"
                );
              }}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
            />
            <mesh
              name="carton-typo-social-media"
              geometry={nodes["carton-typo-social-media"].geometry}
              material={materials["cartontypo-social-media-"]}
              onClick={(e) => {
                externalLink(e, "https://void.fr/fr/social-media/", "_blank");
              }}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
            />
            <mesh
              name="carton-typo-UX"
              geometry={nodes["carton-typo-UX"].geometry}
              material={materials["carton-typo-UX-"]}
              onClick={(e) => {
                externalLink(
                  e,
                  "https://void.fr/fr/design-experience-UX/",
                  "_blank"
                );
              }}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
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
              position={[43.8, -11.2, 1.23]}
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
              position={[39.93, 2.87, -0.58]}
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
              position={[30.49, 2.87, -3.04]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.28}
            />
            <mesh
              name="cloud008"
              geometry={nodes.cloud008.geometry}
              material={materials["material-cloud.018"]}
              position={[27.06, -2.38, 1.1]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.25}
            />
            <mesh
              name="cloud009"
              geometry={nodes.cloud009.geometry}
              material={materials["material-cloud.019"]}
              position={[53.43, -1.65, 8.75]}
              rotation={[-3, -1.21, 3.11]}
              scale={0.62}
            />
            <mesh
              name="cloud010"
              geometry={nodes.cloud010.geometry}
              material={materials["material-cloud-pink"]}
              position={[44.5, -4.38, -9.34]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.25}
            />
            <mesh
              name="cloud011"
              geometry={nodes.cloud011.geometry}
              material={materials["material-cloud.021"]}
              position={[53.1, -1.84, -6.16]}
              rotation={[-Math.PI, 1.05, -Math.PI]}
              scale={0.51}
            />
            <mesh
              name="cloud012"
              geometry={nodes.cloud012.geometry}
              material={materials["material-cloud.022"]}
              position={[45.23, -4.39, 13.23]}
              rotation={[-3.08, -1.44, -2.94]}
              scale={1.98}
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
              position={[11.71, 12.79, -6.84]}
              rotation={[0.03, -1.34, -0.01]}
              scale={0.65}
            />
            <mesh
              name="cloud015"
              geometry={nodes.cloud015.geometry}
              material={materials["material-cloud.001"]}
              position={[9.32, -4.48, 3.91]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.42}
            />
            <mesh
              name="cloud016"
              geometry={nodes.cloud016.geometry}
              material={materials["material-cloud.024"]}
              position={[32.16, 17.89, 1.7]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.28}
            />
            <mesh
              name="cloud017"
              geometry={nodes.cloud017.geometry}
              material={materials["material-cloud.026"]}
              position={[56.46, 7.81, 5.69]}
              rotation={[1.41, 1.55, -1.12]}
              scale={0.61}
            />
            <mesh
              name="cloud018"
              geometry={nodes.cloud018.geometry}
              material={materials["material-cloud.003"]}
              position={[60.29, -7.48, -0.27]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.68}
            />
            <mesh
              name="cloud019"
              geometry={nodes.cloud019.geometry}
              material={materials["material-cloud.006"]}
              position={[33.96, -7.71, -10.39]}
              rotation={[0, -1.31, 0]}
              scale={0.72}
            />
            <mesh
              name="cloud020"
              geometry={nodes.cloud020.geometry}
              material={materials["material-cloud.009"]}
              position={[28.32, -18.02, 4.91]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.64}
            />
            <mesh
              name="cloud021"
              geometry={nodes.cloud021.geometry}
              material={materials["material-cloud-pink"]}
              position={[40.85, -8.61, -0.58]}
              rotation={[-1.97, 1.51, 1.92]}
              scale={0.94}
            />
            <mesh
              name="cloud022"
              geometry={nodes.cloud022.geometry}
              material={materials["material-cloud.027"]}
              position={[30.59, 5.56, -17.7]}
              rotation={[-Math.PI, 1.27, -Math.PI]}
              scale={1.04}
            />
            <mesh
              name="cloud023"
              geometry={nodes.cloud023.geometry}
              material={materials["material-cloud-pink"]}
              position={[44.36, 8.27, -11.27]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.25}
            />
            <mesh
              name="cloud024"
              geometry={nodes.cloud024.geometry}
              material={materials["material-cloud.029"]}
              position={[21.75, 16.22, 5.05]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.25}
            />
            <mesh
              name="cloud025"
              geometry={nodes.cloud025.geometry}
              material={materials["material-cloud-pink"]}
              position={[23.14, -3.01, -10.39]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.8}
            />
            <mesh
              name="cloud026"
              geometry={nodes.cloud026.geometry}
              material={materials["material-cloud.004"]}
              position={[26.84, -1.11, -5.27]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.28}
            />
            <mesh
              name="cloud027"
              geometry={nodes.cloud027.geometry}
              material={materials["material-cloud.031"]}
              position={[25.43, -4.41, 3.89]}
              rotation={[0.41, -1.42, 0.78]}
              scale={0.21}
            />
            <mesh
              name="cloud028"
              geometry={nodes.cloud028.geometry}
              material={materials["material-cloud.032"]}
              position={[18.44, -2.18, 5.07]}
              rotation={[0.03, -1.34, -0.01]}
              scale={0.65}
            />
            <mesh
              name="cloud029"
              geometry={nodes.cloud029.geometry}
              material={materials["material-cloud.033"]}
              position={[16.23, 10.16, -15.4]}
              rotation={[0, -1.5, 0]}
              scale={0.88}
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
              position={[14.5, -6.19, 0.53]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.22}
            />
            <mesh
              name="cloud032"
              geometry={nodes.cloud032.geometry}
              material={materials["material-cloud.036"]}
              position={[28.51, -31.45, -0.97]}
              rotation={[-Math.PI, 1.36, -Math.PI]}
              scale={2.35}
            />
            <mesh
              name="cloud033"
              geometry={nodes.cloud033.geometry}
              material={materials["material-cloud.037"]}
              position={[46.01, 25.43, 14.37]}
              rotation={[-2.47, -1.29, -3.13]}
              scale={2.31}
            />
            <mesh
              name="cloud034"
              geometry={nodes.cloud034.geometry}
              material={materials["material-cloud.038"]}
              position={[42.84, 3.18, -16.81]}
              rotation={[-Math.PI, 1.05, -Math.PI]}
              scale={0.27}
            />
            <mesh
              name="cloud035"
              geometry={nodes.cloud035.geometry}
              material={materials["material-cloud.039"]}
              position={[28, 0.66, 1.65]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.2}
            />
            <mesh
              name="cloud036"
              geometry={nodes.cloud036.geometry}
              material={materials["material-cloud.040"]}
              position={[-1.53, 0.74, -1.33]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.26}
            />
            <mesh
              name="cloud037"
              geometry={nodes.cloud037.geometry}
              material={materials["material-cloud-pink"]}
              position={[9.43, -1.15, 6.62]}
              rotation={[0.14, 1.45, 2.36]}
              scale={0.37}
            />
            <mesh
              name="cloud038"
              geometry={nodes.cloud038.geometry}
              material={materials["material-cloud.014"]}
              position={[12.89, 7.48, -4.15]}
              rotation={[3.05, -1.45, -0.79]}
              scale={0.52}
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
              position={[9.16, -4, -4.15]}
              rotation={[3.05, -1.45, -0.79]}
              scale={0.52}
            />
          </group>

          <group name="sky">
            <mesh
              name="sky_sphere"
              geometry={nodes.sky_sphere.geometry}
              material={materials.Sky_Texture}
              position={[20.01, 2.66, 0.22]}
              scale={45.25}
            />
          </group>
          <mesh
            name="kart"
            geometry={nodes.kart.geometry}
            material={materials["red-for-kart"]}
            position={[-3.92, 0.07, 0.09]}
            rotation={[0, 0, -0.04]}
          />
        </group>
      </group>
    </group>
  );
};

const Train = () => {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <Stage environment={null}>
            <ScrollControls pages={20}>
              <Model />
            </ScrollControls>
          </Stage>
        </Suspense>
      </Canvas>
    </>
  );
};

export default Train;
