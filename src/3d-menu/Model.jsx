import { useEffect, useRef, useState } from "react";
import { Text, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import gsap from "gsap";

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

  // Refs for each circle
  const circlesRefs = {
    pencilCircle: useRef(),
    rocketCircle: useRef(),
    drupalCircle: useRef(),
    megaphoneCircle: useRef(),
    analyticCircle: useRef(),
    realisationCircle: useRef(),
    insightCircle: useRef(),
    agenceCircle: useRef(),
  };

  const { nodes, materials, animations } = useGLTF(
    process.env.PUBLIC_URL + "models/menu/void_3d_menu_draco.glb"
  );

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // to correct the model position
    group.current.rotation.y = -80 * (Math.PI / 180);

    // Changing scene position to get it closer to the light source for better shadows
    group.current.position.set(-10, 5, -50);
  }, []);

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

  const zoomingInAnimation = (e, element, circlePosition) => {
    // remove circle's title
    e.eventObject.children[1].visible = false;

    const duration = 1;
    const timeline = gsap.timeline({ paused: true });

    timeline
      .to(circlesRefs[`${element}Circle`].current.scale, {
        x: 5,
        y: 5,
        z: 5,
        duration: duration,
      })
      .to(
        circlesRefs[`${element}Circle`].current.position,
        {
          ...circlePosition,
          duration: duration,
        },
        `-=${duration}`
      )
      .to(
        elementsRefs[element].current.scale,
        {
          x: 2.5,
          y: 2.5,
          z: 2.5,
          duration: duration,
        },
        `-=${duration}`
      )
      .to(
        elementsRefs[element].current.position,
        {
          x: 12,
          y: 11,
          z: 0,
          duration: duration,
        },
        `-=${duration}`
      );

    timeline.play();
  };

  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group name="Scene_1">
            <group name="3D-items">
              <group
                name="agence-item-parent"
                position={[1, -5.53745413, -18.68670654]}
                ref={elementsRefs.agence}
              >
                <mesh
                  name="man-body"
                  castShadow
                  receiveShadow
                  geometry={nodes["man-body"].geometry}
                  material={materials["Material.007"]}
                  position={[0.1019901, -0.45582485, 1.00444984]}
                  scale={0.97445917}
                >
                  <mesh
                    name="man-head"
                    castShadow
                    receiveShadow
                    geometry={nodes["man-head"].geometry}
                    material={materials["Material.001"]}
                    position={[0, 1.32576132, 0]}
                  />
                </mesh>
                <mesh
                  name="man2-body"
                  castShadow
                  receiveShadow
                  geometry={nodes["man2-body"].geometry}
                  material={materials["Material.002"]}
                  position={[0.07830822, -0.45968866, -1.09732437]}
                  scale={0.97445917}
                >
                  <mesh
                    name="man2-head"
                    castShadow
                    receiveShadow
                    geometry={nodes["man2-head"].geometry}
                    material={materials["Material.001"]}
                    position={[0, 1.30325222, 0]}
                  />
                </mesh>
              </group>
              <group
                name="analytics-item-parent"
                position={[0.09372487, -5.6113739, 18.4957428]}
                ref={elementsRefs.analytic}
              >
                <mesh
                  name="analytics-item001"
                  castShadow
                  receiveShadow
                  geometry={nodes["analytics-item001"].geometry}
                  material={materials["Material.007"]}
                  morphTargetDictionary={
                    nodes["analytics-item001"].morphTargetDictionary
                  }
                  morphTargetInfluences={
                    nodes["analytics-item001"].morphTargetInfluences
                  }
                  position={[1.12970781, -1.16264725, 0.11775589]}
                  rotation={[0, -0.19038938, 0]}
                  scale={[0.37437478, 0.37437475, 0.37437478]}
                >
                  <mesh
                    name="analytics-item002"
                    castShadow
                    receiveShadow
                    geometry={nodes["analytics-item002"].geometry}
                    material={materials["Material.001"]}
                    morphTargetDictionary={
                      nodes["analytics-item002"].morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes["analytics-item002"].morphTargetInfluences
                    }
                    position={[-0.42544794, 0.90537071, -3.34681964]}
                  />
                  <mesh
                    name="analytics-item003"
                    castShadow
                    receiveShadow
                    geometry={nodes["analytics-item003"].geometry}
                    material={materials["Material.002"]}
                    morphTargetDictionary={
                      nodes["analytics-item003"].morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes["analytics-item003"].morphTargetInfluences
                    }
                    position={[-0.42544794, 0.90537071, -3.34681964]}
                  />
                  <mesh
                    name="analytics-item004"
                    castShadow
                    receiveShadow
                    geometry={nodes["analytics-item004"].geometry}
                    material={materials["Material.001"]}
                    morphTargetDictionary={
                      nodes["analytics-item004"].morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes["analytics-item004"].morphTargetInfluences
                    }
                    position={[-0.42544794, 0.90537071, -3.34681964]}
                  />
                  <mesh
                    name="analytics-item005"
                    castShadow
                    receiveShadow
                    geometry={nodes["analytics-item005"].geometry}
                    material={materials["Material.007"]}
                    morphTargetDictionary={
                      nodes["analytics-item005"].morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes["analytics-item005"].morphTargetInfluences
                    }
                    position={[-0.42544794, 0.90537071, -3.34681964]}
                  />
                </mesh>
              </group>
              <group
                name="insight-item-parent"
                position={[1.10122979, -5.29660368, -6.40154552]}
                ref={elementsRefs.insight}
              >
                <group
                  name="insight-item"
                  position={[0.41369617, -1.19622135, 0.56483984]}
                  rotation={[-0.09224649, -0.39046981, -0.03519652]}
                  scale={[0.94779009, 0.94779009, 0.94779027]}
                >
                  <mesh
                    name="Cylinder005"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder005.geometry}
                    material={materials["Material.007"]}
                  />
                  <mesh
                    name="Cylinder005_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder005_1.geometry}
                    material={materials["Material.001"]}
                  />
                  <mesh
                    name="Cylinder005_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder005_2.geometry}
                    material={materials["Material.002"]}
                  />
                </group>
              </group>
              <group
                name="realisation-item-parent"
                position={[1.8317821, -5.48853493, 6.06425524]}
                ref={elementsRefs.realisation}
              >
                <mesh
                  name="realisation-paper-item"
                  castShadow
                  receiveShadow
                  geometry={nodes["realisation-paper-item"].geometry}
                  material={materials["Material.002"]}
                  position={[0.1177249, 0.1032505, 0.03375578]}
                  rotation={[-0.14491322, 0.15844748, 0.00186237]}
                  scale={[1.072258, 1.072258, 1.07225811]}
                >
                  <mesh
                    name="realisation-item-0"
                    castShadow
                    receiveShadow
                    geometry={nodes["realisation-item-0"].geometry}
                    material={materials["Material.001"]}
                    position={[0.25271055, 0.408667, 0.06356421]}
                    rotation={[0.00034406, -0.01727151, -0.00248589]}
                  />
                  <mesh
                    name="realisation-item-3"
                    castShadow
                    receiveShadow
                    geometry={nodes["realisation-item-3"].geometry}
                    material={materials["Material.007"]}
                    position={[-0.25221339, -0.40844575, -0.0589225]}
                  />
                </mesh>
              </group>
              <group
                name="rocket-item-parent"
                position={[1.24988234, 6.57021236, 6.04720926]}
                ref={elementsRefs.rocket}
              >
                <group
                  name="fusee-big-tronc"
                  position={[-0.05214071, 0.25111818, -0.30298328]}
                  rotation={[-0.64546876, -0.12062539, -0.08113075]}
                  scale={[1.0898993, 1.0898993, 1.08989918]}
                >
                  <mesh
                    name="Cylinder029"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder029.geometry}
                    material={materials["Material.007"]}
                  />
                  <mesh
                    name="Cylinder029_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder029_1.geometry}
                    material={materials["Material.002"]}
                  />
                  <mesh
                    name="fusee-big-feu"
                    castShadow
                    receiveShadow
                    geometry={nodes["fusee-big-feu"].geometry}
                    material={materials["Material.001"]}
                    position={[0.0805402, -2.01934433, -0.00081123]}
                  />
                  <mesh
                    name="fusee-big-hublot"
                    castShadow
                    receiveShadow
                    geometry={nodes["fusee-big-hublot"].geometry}
                    material={materials["Material.001"]}
                    position={[0.65712374, 0.47255278, -0.00081117]}
                    rotation={[Math.PI / 2, 0.19377251, -Math.PI / 2]}
                    scale={[0.36558509, 0.15805133, 0.36558506]}
                  />
                </group>
              </group>
              <mesh
                name="drupal-item"
                castShadow
                receiveShadow
                geometry={nodes["drupal-item"].geometry}
                material={materials["Material.007"]}
                position={[1.49639034, 6.26412821, -6.31770039]}
                ref={elementsRefs.drupal}
              />
              <group
                name="megaphone-item"
                position={[1.72739232, 6.2662468, -17.91293716]}
                rotation={[-1.12954241, -0.00620998, 0.02727167]}
                ref={elementsRefs.megaphone}
              >
                <mesh
                  name="Cylinder012"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder012.geometry}
                  material={materials["Material.007"]}
                />
                <mesh
                  name="Cylinder012_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder012_1.geometry}
                  material={materials["Material.001"]}
                />
                <mesh
                  name="Cylinder012_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder012_2.geometry}
                  material={materials["Material.002"]}
                />
              </group>
              <group
                name="UX-pencil-item"
                position={[1.63206434, 6.79842567, 18.38464928]}
                rotation={[-0.24495392, 0, 0]}
                ref={elementsRefs.pencil}
              >
                <mesh
                  name="Cylinder017"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder017.geometry}
                  material={materials["Material.001"]}
                />
                <mesh
                  name="Cylinder017_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder017_1.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Cylinder017_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder017_2.geometry}
                  material={materials["Material.003"]}
                />
                <mesh
                  name="Cylinder017_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder017_3.geometry}
                  material={materials["Material.007"]}
                />
                <mesh
                  name="Cylinder017_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder017_4.geometry}
                  material={materials["Material.004"]}
                />
              </group>
            </group>
            <group
              name="Area"
              position={[83.78812408, 0, 0]}
              rotation={[-1.57067341, 1.5678573, -0.000112]}
            />
            <group name="background-circles">
              <group
                onClick={(e) =>
                  zoomingInAnimation(e, "pencil", {
                    x: 10,
                    y: 0.009426,
                    z: 0.03298,
                  })
                }
              >
                <mesh
                  name="rond-ui-item-01"
                  castShadow
                  receiveShadow
                  geometry={nodes["rond-ui-item-01"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.19437265, 6.49298382, 18.51057434]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[1.09639716, 1.09639716, 1.09639704]}
                  onPointerEnter={() => {
                    animate("play", ["UX-penceil-item_anim"], "pencil");
                  }}
                  onPointerLeave={() => {
                    animate("pause", ["UX-penceil-item_anim"], "pencil");
                  }}
                  ref={circlesRefs.pencilCircle}
                />
                <Text
                  color="white"
                  position={[-1.194373, 2, 18.510574]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Design d'expérience
                </Text>
              </group>
              <group
                onClick={(e) =>
                  zoomingInAnimation(e, "rocket", {
                    x: 10,
                    y: 0.012984,
                    z: 56.5506,
                  })
                }
              >
                <mesh
                  name="rond-ui-item-02"
                  castShadow
                  receiveShadow
                  geometry={nodes["rond-ui-item-02"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.19437265, 6.49298382, 18.51057434]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[1.09639716, 1.09639716, 1.09639704]}
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
                  ref={circlesRefs.rocketCircle}
                />
                <Text
                  color="white"
                  position={[-1.194373, 2, 6.3]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Performance marketing
                </Text>
              </group>
              <group
                onClick={(e) =>
                  zoomingInAnimation(e, "drupal", {
                    x: 10,
                    y: 0.022984,
                    z: 112.921,
                  })
                }
              >
                <mesh
                  name="rond-ui-item-03"
                  castShadow
                  receiveShadow
                  geometry={nodes["rond-ui-item-03"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.19437265, 6.49298382, 18.51057434]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[1.09639716, 1.09639716, 1.09639704]}
                  onPointerEnter={() => {
                    animate("play", ["drupal-item_anim"], "drupal");
                  }}
                  onPointerLeave={() => {
                    animate("pause", ["drupal-item_anim"], "drupal");
                  }}
                  ref={circlesRefs.drupalCircle}
                />
                <Text
                  color="white"
                  position={[-1.194373, 2, -6.3]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Expertise Drupal 8
                </Text>
              </group>
              <group
                onClick={(e) =>
                  zoomingInAnimation(e, "megaphone", {
                    x: 10,
                    y: 0.022984,
                    z: 169.6518,
                  })
                }
              >
                <mesh
                  name="rond-ui-item-04"
                  castShadow
                  receiveShadow
                  geometry={nodes["rond-ui-item-04"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.19437265, 6.49298382, 18.51057434]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[1.09639716, 1.09639716, 1.09639704]}
                  onPointerEnter={() => {
                    animate("play", ["megaphone-item_anim"], "megaphone");
                  }}
                  onPointerLeave={() => {
                    animate("pause", ["megaphone-item_anim"], "megaphone");
                  }}
                  ref={circlesRefs.megaphoneCircle}
                />
                <Text
                  color="white"
                  position={[-1.194373, 2, -18.510574]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Social Media
                </Text>
              </group>
              <group
                onClick={(e) =>
                  zoomingInAnimation(e, "analytic", {
                    x: 10,
                    y: 0.009426,
                    z: 0.03298,
                  })
                }
              >
                <mesh
                  name="rond-ui-item05"
                  castShadow
                  receiveShadow
                  geometry={nodes["rond-ui-item05"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.19437265, -5.28416538, 18.51057434]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[1.09639716, 1.09639716, 1.09639704]}
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
                  ref={circlesRefs.analyticCircle}
                />
                <Text
                  color="white"
                  position={[-1.194373, -10, 18.510574]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Analytics
                </Text>
              </group>
              <group
                onClick={(e) =>
                  zoomingInAnimation(e, "realisation", {
                    x: 10,
                    y: 0.012984,
                    z: 56.5506,
                  })
                }
              >
                <mesh
                  name="rond-ui-item-06"
                  castShadow
                  receiveShadow
                  geometry={nodes["rond-ui-item-06"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.19437265, -5.28416538, 18.51057434]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[1.09639716, 1.09639716, 1.09639704]}
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
                  ref={circlesRefs.realisationCircle}
                />
                <Text
                  color="white"
                  position={[-1.194373, -10, 6.3]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Réalisations
                </Text>
              </group>
              <group
                onClick={(e) =>
                  zoomingInAnimation(e, "insight", {
                    x: 10,
                    y: 0.022984,
                    z: 112.921,
                  })
                }
              >
                <mesh
                  name="rond-ui-item-07"
                  castShadow
                  receiveShadow
                  geometry={nodes["rond-ui-item-07"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.19437265, -5.28416538, 18.51057434]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[1.09639716, 1.09639716, 1.09639704]}
                  onPointerEnter={() => {
                    animate("play", ["insight-item_anim"], "insight");
                  }}
                  onPointerLeave={() => {
                    animate("pause", ["insight-item_anim"], "insight");
                  }}
                  ref={circlesRefs.insightCircle}
                />
                <Text
                  color="white"
                  position={[-1.194373, -10, -6.3]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Insights
                </Text>
              </group>
              <group
                onClick={(e) =>
                  zoomingInAnimation(e, "agence", {
                    x: 10,
                    y: 0.022984,
                    z: 169.6518,
                  })
                }
              >
                <mesh
                  name="rond-ui-item-08"
                  castShadow
                  receiveShadow
                  geometry={nodes["rond-ui-item-08"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.19437265, -5.28416538, 18.51057434]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[1.09639716, 1.09639716, 1.09639704]}
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
                  ref={circlesRefs.agenceCircle}
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
      {/* HTML Content Overlay */}
      {/* <mesh position={[0, 0, 0]}>
        <Text color="black" fontSize={1.2}>
          Performance Marketing
        </Text>
        <Text color="black" fontSize={0.8}>
          Confiez la conversion de vos audiences et le monitoring de votre
          performance digitale à des experts du webmarketing.
        </Text>
      </mesh> */}
    </>
  );
};

export default Model;
