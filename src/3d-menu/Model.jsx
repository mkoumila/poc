import { useEffect, useRef, useState } from "react";
import { Text, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const Model = (props) => {
  const group = useRef();

  // State to handle hovered elements
  const [hoveredItems, setHoveredItems] = useState({
    pencil: false,
    rocket: false,
    drupal: false,
    megaphone: false,
    analytic: false,
    realisation: false,
    insight: false,
    agence: false,
  });

  // Refs for each element
  const elementsRefs = {
    pencil: useRef(),
    rocket: useRef(),
    drupal: useRef(),
    megaphone: useRef(),
    analytic: useRef(),
    realisation: useRef(),
    insight: useRef(),
    agence: useRef(),
  };

  const { nodes, materials, animations } = useGLTF(
    process.env.PUBLIC_URL + "models/menu/void_3d_menu_draco.gltf"
  );

  const { actions } = useAnimations(animations, group);

  const animate = (animationType, animationsIds, item) => {
    setHoveredItems({
      ...hoveredItems,
      [item]: animationType === "play" ? true : false,
    });

    document.body.style.cursor = animationType === "play" ? "pointer" : "auto";

    animationsIds.forEach((id) => {
      if (animationType === "play") {
        actions[id].setLoop(THREE.LoopRepeat, Infinity);
        actions[id].clampWhenFinished = true;
        actions[id].play().paused = false;
      } else {
        actions[id].setLoop(THREE.LoopOnce, 1);
        actions[id].play().paused = false;
      }
    });
  };

  useEffect(() => {
    // to correct the model position
    group.current.rotation.y = -80 * (Math.PI / 180);
  }, []);

  // To scale the hovered item
  useFrame((state, delta) => {
    Object.keys(hoveredItems).map((item) => {
      easing.damp3(
        elementsRefs[item].current.scale,
        hoveredItems[item] ? 1.3 : 1,
        0.2,
        delta
      );
    });
  });

  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group name="Scene_1">
            <group name="3D-items">
              <group
                ref={elementsRefs.agence}
                name="agence-item-parent"
                position={[1, -5.537454, -18.686707]}
              >
                <mesh
                  castShadows
                  receiveShadows
                  name="man-body"
                  geometry={nodes["man-body"].geometry}
                  material={materials["Material.007"]}
                  position={[0.10199, -0.455825, 1.00445]}
                  scale={0.974459}
                >
                  <mesh
                    castShadows
                    receiveShadows
                    name="man-head"
                    geometry={nodes["man-head"].geometry}
                    material={materials.Material}
                    position={[0, 1.325762, 0]}
                  />
                </mesh>
                <mesh
                  castShadows
                  receiveShadows
                  name="man2-body"
                  geometry={nodes["man2-body"].geometry}
                  material={materials["Material.001"]}
                  position={[0.078308, -0.459689, -1.097324]}
                  scale={0.974459}
                >
                  <mesh
                    castShadows
                    receiveShadows
                    name="man2-head"
                    geometry={nodes["man2-head"].geometry}
                    material={materials.Material}
                    position={[0, 1.303253, 0]}
                  />
                </mesh>
              </group>
              <group
                ref={elementsRefs.analytic}
                name="analytics-item-parent"
                position={[0.093725, -5.611374, 18.495743]}
              >
                <mesh
                  castShadows
                  receiveShadows
                  name="analytics-item001"
                  geometry={nodes["analytics-item001"].geometry}
                  material={materials["Material.007"]}
                  morphTargetDictionary={
                    nodes["analytics-item001"].morphTargetDictionary
                  }
                  morphTargetInfluences={
                    nodes["analytics-item001"].morphTargetInfluences
                  }
                  position={[1.129708, -1.162647, 0.117756]}
                  rotation={[0, -0.190389, 0]}
                  scale={0.374375}
                >
                  <mesh
                    castShadows
                    receiveShadows
                    name="analytics-item002"
                    geometry={nodes["analytics-item002"].geometry}
                    material={materials.Material}
                    morphTargetDictionary={
                      nodes["analytics-item002"].morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes["analytics-item002"].morphTargetInfluences
                    }
                    position={[-0.425446, 0.905369, -3.346816]}
                  />
                  <mesh
                    castShadows
                    receiveShadows
                    name="analytics-item003"
                    geometry={nodes["analytics-item003"].geometry}
                    material={materials["Material.001"]}
                    morphTargetDictionary={
                      nodes["analytics-item003"].morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes["analytics-item003"].morphTargetInfluences
                    }
                    position={[-0.425446, 0.905369, -3.346816]}
                  />
                  <mesh
                    castShadows
                    receiveShadows
                    name="analytics-item004"
                    geometry={nodes["analytics-item004"].geometry}
                    material={materials.Material}
                    morphTargetDictionary={
                      nodes["analytics-item004"].morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes["analytics-item004"].morphTargetInfluences
                    }
                    position={[-0.425446, 0.905369, -3.346816]}
                  />
                  <mesh
                    castShadows
                    receiveShadows
                    name="analytics-item005"
                    geometry={nodes["analytics-item005"].geometry}
                    material={materials["Material.007"]}
                    morphTargetDictionary={
                      nodes["analytics-item005"].morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes["analytics-item005"].morphTargetInfluences
                    }
                    position={[-0.425446, 0.905369, -3.346816]}
                  />
                </mesh>
              </group>
              <group
                ref={elementsRefs.insight}
                name="insight-item-parent"
                position={[1.10123, -5.296604, -6.401546]}
              >
                <group
                  name="insight-item"
                  position={[0.413696, -1.196221, 0.56484]}
                  rotation={[-0.092247, -0.39047, -0.035197]}
                  scale={0.94779}
                >
                  <mesh
                    castShadows
                    receiveShadows
                    name="Cylinder005"
                    geometry={nodes.Cylinder005.geometry}
                    material={materials["Material.007"]}
                  />
                  <mesh
                    castShadows
                    receiveShadows
                    name="Cylinder005_1"
                    geometry={nodes.Cylinder005_1.geometry}
                    material={materials.Material}
                  />
                  <mesh
                    castShadows
                    receiveShadows
                    name="Cylinder005_2"
                    geometry={nodes.Cylinder005_2.geometry}
                    material={materials["Material.001"]}
                  />
                </group>
              </group>
              <group
                ref={elementsRefs.realisation}
                name="realisation-item-parent"
                position={[1.831782, -5.488535, 6.064255]}
              >
                <mesh
                  castShadows
                  receiveShadows
                  name="realisation-paper-item"
                  geometry={nodes["realisation-paper-item"].geometry}
                  material={materials["Material.001"]}
                  position={[0.117725, 0.103251, 0.033756]}
                  rotation={[-0.144913, 0.158447, 0.001862]}
                  scale={1.072258}
                >
                  <mesh
                    castShadows
                    receiveShadows
                    name="realisation-item-0"
                    geometry={nodes["realisation-item-0"].geometry}
                    material={materials.Material}
                    position={[0.252751, 0.409318, 0.059049]}
                  />
                  <mesh
                    castShadows
                    receiveShadows
                    name="realisation-item-3"
                    geometry={nodes["realisation-item-3"].geometry}
                    material={materials["Material.007"]}
                    position={[-0.252213, -0.408446, -0.058923]}
                  />
                </mesh>
              </group>
              <group
                ref={elementsRefs.rocket}
                name="rocket-item-parent"
                position={[1.249882, 6.570212, 6.047209]}
              >
                <group
                  name="fusee-big-tronc"
                  position={[-0.052141, 0.251118, -0.302983]}
                  rotation={[-0.645469, -0.120625, -0.081131]}
                  scale={1.089899}
                >
                  <mesh
                    castShadows
                    receiveShadows
                    name="Cylinder029"
                    geometry={nodes.Cylinder029.geometry}
                    material={materials["Material.007"]}
                  />
                  <mesh
                    castShadows
                    receiveShadows
                    name="Cylinder029_1"
                    geometry={nodes.Cylinder029_1.geometry}
                    material={materials["Material.001"]}
                  />
                  <mesh
                    castShadows
                    receiveShadows
                    name="fusee-big-feu"
                    geometry={nodes["fusee-big-feu"].geometry}
                    material={materials.Material}
                    position={[0.08054, -2.019344, -0.000813]}
                  />
                  <mesh
                    castShadows
                    receiveShadows
                    name="fusee-big-hublot"
                    geometry={nodes["fusee-big-hublot"].geometry}
                    material={materials.Material}
                    position={[0.657124, 0.472553, -0.000812]}
                    rotation={[Math.PI / 2, 0.193773, -Math.PI / 2]}
                    scale={[0.365585, 0.158051, 0.365585]}
                  />
                </group>
              </group>
              <mesh
                castShadows
                receiveShadows
                ref={elementsRefs.drupal}
                name="drupal-item"
                geometry={nodes["drupal-item"].geometry}
                material={materials["Material.007"]}
                position={[1.49639, 6.264128, -6.3177]}
              />
              <group
                ref={elementsRefs.megaphone}
                name="megaphone-item"
                position={[1.727392, 6.266247, -17.912937]}
                rotation={[-1.129542, -0.00621, 0.027272]}
              >
                <mesh
                  castShadows
                  receiveShadows
                  name="Cylinder012"
                  geometry={nodes.Cylinder012.geometry}
                  material={materials["Material.007"]}
                />
                <mesh
                  castShadows
                  receiveShadows
                  name="Cylinder012_1"
                  geometry={nodes.Cylinder012_1.geometry}
                  material={materials.Material}
                />
                <mesh
                  castShadows
                  receiveShadows
                  name="Cylinder012_2"
                  geometry={nodes.Cylinder012_2.geometry}
                  material={materials["Material.001"]}
                />
                <mesh
                  castShadows
                  receiveShadows
                  name="Cylinder012_3"
                  geometry={nodes.Cylinder012_3.geometry}
                  material={materials["Material.001"]}
                />
              </group>
              <group
                ref={elementsRefs.pencil}
                name="UX-pencil-item"
                position={[1.632064, 6.798426, 18.384649]}
                rotation={[-0.244954, 0, 0]}
              >
                <mesh
                  castShadows
                  receiveShadows
                  name="Cylinder017"
                  geometry={nodes.Cylinder017.geometry}
                  material={materials.Material}
                />
                <mesh
                  castShadows
                  receiveShadows
                  name="Cylinder017_1"
                  geometry={nodes.Cylinder017_1.geometry}
                  material={materials["Material.001"]}
                />
                <mesh
                  castShadows
                  receiveShadows
                  name="Cylinder017_2"
                  geometry={nodes.Cylinder017_2.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  castShadows
                  receiveShadows
                  name="Cylinder017_3"
                  geometry={nodes.Cylinder017_3.geometry}
                  material={materials["Material.007"]}
                />
                <mesh
                  castShadows
                  receiveShadows
                  name="Cylinder017_4"
                  geometry={nodes.Cylinder017_4.geometry}
                  material={materials["Material.004"]}
                />
              </group>
            </group>
            <group name="background-circles">
              <group>
                <mesh
                  castShadows
                  receiveShadows
                  name="rond-ui-item-01"
                  geometry={nodes["rond-ui-item-01"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.194373, 6.492984, 18.510574]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={1.096397}
                  onPointerEnter={() => {
                    animate("play", ["UX-penceil-item_anim"], "pencil");
                  }}
                  onPointerLeave={() => {
                    animate("pause", ["UX-penceil-item_anim"], "pencil");
                  }}
                />

                <Text
                  color="white"
                  position={[-1.194373, 2, 18.510574]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Design d'expérience
                </Text>
              </group>
              <group>
                <mesh
                  castShadows
                  receiveShadows
                  name="rond-ui-item-02"
                  geometry={nodes["rond-ui-item-02"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.194373, 6.492984, 18.510574]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={1.096397}
                  onPointerEnter={() => {
                    animate(
                      "play",
                      ["fusee-big-tronc_anim", "fusee-big-feu-anim"],
                      "rocket"
                    );
                  }}
                  onPointerLeave={() => {
                    animate(
                      "pause",
                      ["fusee-big-tronc_anim", "fusee-big-feu-anim"],
                      "rocket"
                    );
                  }}
                />
                <Text
                  color="white"
                  position={[-1.194373, 2, 6.3]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Performance marketing
                </Text>
              </group>
              <group>
                <mesh
                  castShadows
                  receiveShadows
                  name="rond-ui-item-03"
                  geometry={nodes["rond-ui-item-03"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.194373, 6.492984, 18.510574]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={1.096397}
                  onPointerEnter={() => {
                    animate("play", ["drupal-item_anim"], "drupal");
                  }}
                  onPointerLeave={() => {
                    animate("pause", ["drupal-item_anim"], "drupal");
                  }}
                />
                <Text
                  color="white"
                  position={[-1.194373, 2, -6.3]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Expertise Drupal 8
                </Text>
              </group>
              <group>
                <mesh
                  castShadows
                  receiveShadows
                  name="rond-ui-item-04"
                  geometry={nodes["rond-ui-item-04"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.194373, 6.492984, 18.510574]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={1.096397}
                  onPointerEnter={() => {
                    animate("play", ["megaphone-item_anim"], "megaphone");
                  }}
                  onPointerLeave={() => {
                    animate("pause", ["megaphone-item_anim"], "megaphone");
                  }}
                />
                <Text
                  color="white"
                  position={[-1.194373, 2, -18.510574]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Social Media
                </Text>
              </group>
              <group>
                <mesh
                  castShadows
                  receiveShadows
                  name="rond-ui-item05"
                  geometry={nodes["rond-ui-item05"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.194373, -5.284165, 18.510574]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={1.096397}
                  onPointerEnter={() => {
                    animate(
                      "play",
                      [
                        "analytics-item-001_anim",
                        "KeyAction",
                        "Key.001Action",
                        "Key.002Action",
                        "Key.003Action",
                        "Key.004Action",
                      ],
                      "analytic"
                    );
                  }}
                  onPointerLeave={() => {
                    animate(
                      "pause",
                      [
                        "analytics-item-001_anim",
                        "KeyAction",
                        "Key.001Action",
                        "Key.002Action",
                        "Key.003Action",
                        "Key.004Action",
                      ],
                      "analytic"
                    );
                  }}
                />
                <Text
                  color="white"
                  position={[-1.194373, -10, 18.510574]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Analytics
                </Text>
              </group>
              <group>
                <mesh
                  castShadows
                  receiveShadows
                  name="rond-ui-item-06"
                  geometry={nodes["rond-ui-item-06"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.194373, -5.284165, 18.510574]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={1.096397}
                  onPointerEnter={() => {
                    animate(
                      "play",
                      [
                        "realisation-paper-item_anim",
                        "realisation-item-0_anim",
                        "realisation-item-3_anim",
                      ],
                      "realisation"
                    );
                  }}
                  onPointerLeave={() => {
                    animate(
                      "pause",
                      [
                        "realisation-paper-item_anim",
                        "realisation-item-0_anim",
                        "realisation-item-3_anim",
                      ],
                      "realisation"
                    );
                  }}
                />
                <Text
                  color="white"
                  position={[-1.194373, -10, 6.3]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Réalisations
                </Text>
              </group>
              <group>
                <mesh
                  castShadows
                  receiveShadows
                  name="rond-ui-item-07"
                  geometry={nodes["rond-ui-item-07"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.194373, -5.284165, 18.510574]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={1.096397}
                  onPointerEnter={() => {
                    animate("play", ["insight-item_anim"], "insight");
                  }}
                  onPointerLeave={() => {
                    animate("pause", ["insight-item_anim"], "insight");
                  }}
                />
                <Text
                  color="white"
                  position={[-1.194373, -10, -6.3]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Insights
                </Text>
              </group>
              <group>
                <mesh
                  castShadows
                  receiveShadows
                  name="rond-ui-item-08"
                  geometry={nodes["rond-ui-item-08"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.194373, -5.284165, 18.510574]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={1.096397}
                  onPointerEnter={() => {
                    animate(
                      "play",
                      [
                        "man-body_anim",
                        "man-head_anim",
                        "man2-body_anim",
                        "man2-head_anim",
                      ],
                      "agence"
                    );
                  }}
                  onPointerLeave={() => {
                    animate(
                      "pause",
                      [
                        "man-body_anim",
                        "man-head_anim",
                        "man2-body_anim",
                        "man2-head_anim",
                      ],
                      "agence"
                    );
                  }}
                />
                <Text
                  color="white"
                  position={[-1.194373, -10, -18.510574]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Agence
                </Text>
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  );
};

export default Model;
