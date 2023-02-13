import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  useAnimations,
  Stage,
  useGLTF,
} from "@react-three/drei";

const Model = (props) => {
  const [hovered, setHovered] = useState(false);

  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    process.env.PUBLIC_URL + "models/dbz/dbz-scene.glb"
  );
  const { actions } = useAnimations(animations, group);

  // This hook gives you offets, ranges and other useful things
  const scroll = useScroll();

  useEffect(() => {
    actions["Take 001"].play().paused = true;
  }, [actions]);

  // on mouse hover over element, change cursor style
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  useFrame((state, delta) => {
    // Get car element
    let car = group.current.getObjectByName("car");
    // Animate on scroll
    const action = actions["Take 001"];
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
      state.camera.translateY(0.4);
      // How camera is far from car
      state.camera.translateZ(0.6);
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

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="292a1eed1c17436a8f214f04df93c767fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="body"
                  position={[-41.55, -160.05, -70.61]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={1.93}
                >
                  <mesh
                    name="body_snk_txt_0"
                    geometry={nodes.body_snk_txt_0.geometry}
                    material={materials.snk_txt}
                  />
                  <mesh
                    name="body_snk_txt_0_1"
                    geometry={nodes.body_snk_txt_0_1.geometry}
                    material={materials.snk_txt}
                  />
                  <mesh
                    name="body_snk_txt_0_2"
                    geometry={nodes.body_snk_txt_0_2.geometry}
                    material={materials.snk_txt}
                  />
                </group>
                <group
                  name="platform"
                  position={[-21.17, 9.49, 621.59]}
                  scale={[57.66, 2.49, 57.66]}
                >
                  <mesh
                    name="platform_snake_texture_0"
                    geometry={nodes.platform_snake_texture_0.geometry}
                    material={materials.snake_texture}
                  />
                </group>
                <group
                  name="d_ball"
                  position={[-25.19, -2.25, 730.09]}
                  scale={1.07}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open("https://www.void.fr/", "_blank");
                  }}
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
                >
                  <mesh
                    name="d_ball_orange_0"
                    geometry={nodes.d_ball_orange_0.geometry}
                    material={materials.orange}
                  />
                  <mesh
                    name="d_ball_red_0"
                    geometry={nodes.d_ball_red_0.geometry}
                    material={materials.material}
                  />
                </group>
                <group
                  name="sky"
                  rotation={[0.31, 0.14, -0.18]}
                  scale={2151.95}
                >
                  <mesh
                    name="sky_sky_texture_0"
                    geometry={nodes.sky_sky_texture_0.geometry}
                    material={materials.sky_texture}
                  />
                </group>
                <group name="tail" position={[-21.17, 0, 607.46]}>
                  <mesh
                    name="tail_snk_txt_0"
                    geometry={nodes.tail_snk_txt_0.geometry}
                    material={materials.snk_txt}
                  />
                </group>
                <group name="head" position={[-21.17, 0, 607.46]}>
                  <mesh
                    name="head_snk_txt_0"
                    geometry={nodes.head_snk_txt_0.geometry}
                    material={materials.snk_txt}
                  />
                </group>
                <group name="move_car" position={[-21.17, 0, 607.46]}>
                  <group
                    name="car"
                    position={[-227.61, 3.38, -930.69]}
                    rotation={[0, 1.35, 0.24]}
                    scale={0.3}
                  >
                    <group
                      name="goku_b1"
                      position={[-79.78, -117.22, -5.66]}
                      rotation={[3.12, -1.51, 3.12]}
                      scale={3.31}
                    >
                      <group
                        name="wheels_01"
                        position={[0.25, 34.35, -27.24]}
                        rotation={[-1.75, -0.01, -3.08]}
                        scale={0.3}
                      >
                        <mesh
                          name="wheels_01_car_texture_0"
                          geometry={nodes.wheels_01_car_texture_0.geometry}
                          material={materials.car_texture}
                        />
                      </group>
                      <group
                        name="wheels_02"
                        position={[0.41, 37.61, -24.51]}
                        rotation={[-1.75, -0.01, -3.08]}
                        scale={0.3}
                      >
                        <mesh
                          name="wheels_02_car_texture_0"
                          geometry={nodes.wheels_02_car_texture_0.geometry}
                          material={materials.car_texture}
                        />
                      </group>
                      <group name="cloud_b1">
                        <mesh
                          name="cloud_b1_car_texture_0"
                          geometry={nodes.cloud_b1_car_texture_0.geometry}
                          material={materials.car_texture}
                        />
                      </group>
                      <mesh
                        name="goku_b1_goku_texture_0"
                        geometry={nodes.goku_b1_goku_texture_0.geometry}
                        material={materials.goku_texture}
                      />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

//useGLTF.preload("/scene-transformed.glb");

const DBZ = () => {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <Stage environment={null}>
            <ScrollControls pages={10}>
              <Model />
            </ScrollControls>
          </Stage>
        </Suspense>
      </Canvas>
    </>
  );
};

export default DBZ;
