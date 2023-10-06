import { useEffect, useRef, useState } from "react";
import { Text, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import gsap from "gsap";

const ModelNew = (props) => {
  const group = useRef();

  const [hovered, setHovered] = useState(false);

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

  // State to handle clicked elements
  const [clickedItems, setClickedItems] = useState({
    pencil: false,
    rocket: false,
    drupal: false,
    megaphone: false,
    analytic: false,
    realisation: false,
    insight: false,
    agence: false,
  });

  const mockData = {
    pencil: {
      title: "Design d'expérience ",
      content:
        "Notre équipe d'experts UX vous accompagne pour concevoir des expériences efficientes et engageantes.",
      link: { href: "#", title: "en découvrir plus" },
    },
    rocket: {
      title: "Performance Marketing",
      content:
        "Confiez la conversion de vos audiences et le monitoring de votre performance digitale à des experts du webmarketing.",
      link: { href: "#", title: "en découvrir plus" },
    },
    drupal: {
      title: "Expertise Drupal 8",
      content:
        "Multisite, multilingue, confort de contribution, interfaçage SI... Confiez vos applications métier à des experts Drupal.",
      link: { href: "#", title: "en découvrir plus" },
    },
    megaphone: {
      title: "Social Media",
      content:
        "Nous construisons vos récits de marques sur les médias sociaux grâce aux insights culturels et business de vos clients, l'analyse de la data et notre compréhension des tendances émergentes.",
      link: { href: "#", title: "en découvrir plus" },
    },
    analytic: {
      title: "Analytics",
      content:
        "Tracking des parcours web pour des prises de décisions data-driven.",
      link: { href: "#", title: "en découvrir plus" },
    },
    realisation: {
      title: "Nos réalisations",
      content:
        "Stratégies digitales, campagnes de communication, identités de marques, applications métier…Découvrez nos réalisations.",
      link: { href: "#", title: "en découvrir plus" },
    },
    insight: {
      title: "Insights",
      content:
        "Inspirations, recommandations et insights. Explorons-ensemble les dernières analyses marketing de nos équipes.",
      link: { href: "#", title: "en découvrir plus" },
    },
    agence: {
      title: "L'agence",
      content:
        "Nous accompagnons de grandes entreprises locales et internationales dans leur transformation numérique.",
      link: { href: "#", title: "en découvrir plus" },
    },
  };

  // Refs for each element
  const textsRefs = {
    pencil: useRef(),
    rocket: useRef(),
    drupal: useRef(),
    megaphone: useRef(),
    analytic: useRef(),
    realisation: useRef(),
    insight: useRef(),
    agence: useRef(),
  };

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

  // Refs for each closing circle
  const closeCircleRefs = {
    pencil: useRef(),
    rocket: useRef(),
    drupal: useRef(),
    megaphone: useRef(),
    analytic: useRef(),
    realisation: useRef(),
    insight: useRef(),
    agence: useRef(),
  };

  // Initial Circles position
  const elementsInitialPosition = {
    pencil: { x: 1.63206434, y: 6.79842567, z: 18.38464928 },
    rocket: { x: 1.24988234, y: 6.57021236, z: 6.04720926 },
    drupal: { x: 1.49639034, y: 6.26412821, z: -6.31770039 },
    megaphone: { x: 1.72739232, y: 6.2662468, z: -17.91293716 },
    analytic: { x: 0.09372487, y: -5.6113739, z: 18.4957428 },
    realisation: { x: 1.8317821, y: -5.48853493, z: 6.06425524 },
    insight: { x: 1.10122979, y: -5.29660368, z: -6.40154552 },
    agence: { x: 1, y: -5.53745413, z: -18.68670654 },
  };

  // Initial Circles position
  const circlesInitialPosition = {
    pencilCircle: { x: -1.585661, y: 6.49298, z: 18.496717 },
    rocketCircle: { x: -1.28933, y: 6.49298, z: 6.072 },
    drupalCircle: { x: -0.983102, y: 6.49298, z: -6.340613 },
    megaphoneCircle: { x: -0.698446, y: 6.49298, z: -18.747694 },
    analyticCircle: { x: -1.59753, y: -5.272193, z: 18.489134 },
    realisationCircle: { x: -1.28933, y: -5.286687, z: 6.072 },
    insightCircle: { x: -0.983102, y: -5.293891, z: -6.340613 },
    agenceCircle: { x: -0.698446, y: -5.280357, z: -18.747694 },
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

  // on mouse hover over element, change cursor style
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  const animate = (animationType, animationsIds, item) => {
    setHoveredItems({
      ...hoveredItems,
      [item]: animationType === "play" ? true : false,
    });

    document.body.style.cursor = animationType === "play" ? "pointer" : "auto";

    /* ENABLE IT LATER */
    /* animationsIds.forEach((id) => {
      if (animationType === "play") {
        actions[id].setLoop(THREE.LoopRepeat, Infinity);
        actions[id].clampWhenFinished = true;
        actions[id].play().paused = false;
      } else {
        actions[id].setLoop(THREE.LoopOnce, 1);
        actions[id].play().paused = false;
      }
    }); */
  };

  // To scale the hovered item
  /* ENABLE IT LATER */
  /* useFrame((state, delta) => {
    Object.keys(hoveredItems).map((item) => {
      easing.damp3(
        elementsRefs[item].current.scale,
        hoveredItems[item] ? 1.3 : 1,
        0.2,
        delta
      );
    });
  }); */

  // Reset the circles to their initial position and scale
  const circlesToDefault = () => {
    Object.keys(circlesRefs).forEach((circle) => {
      const duration = 1;
      const timeline = gsap.timeline({ paused: true });

      timeline
        .to(circlesRefs[circle].current.scale, {
          x: 3.077925,
          y: 3.077925,
          z: 3.077925,
          duration: duration,
        })
        .to(
          circlesRefs[circle].current.position,
          {
            ...circlesInitialPosition[circle],
            duration: duration,
          },
          `-=${duration}`
        );

      timeline.play();
    });
  };

  // Reset the elements to their initial position and scale
  const itemsToDefault = () => {
    Object.keys(elementsRefs).forEach((element) => {
      const duration = 1;
      const timeline = gsap.timeline({ paused: true });

      timeline
        .to(elementsRefs[element].current.scale, {
          x: 1.0,
          y: 1.0,
          z: 1.0,
          duration: duration,
        })
        .to(
          elementsRefs[element].current.position,
          {
            ...elementsInitialPosition[element],
            duration: duration,
          },
          `-=${duration}`
        );

      timeline.play();
    });
  };

  // Reset texts to their initial position and scale
  const textsToDefault = () => {
    // hide other texts
    Object.keys(textsRefs).map((textRef) => {
      textsRefs[textRef].current.visible = false;
    });

    Object.keys(textsRefs).forEach((element) => {
      const duration = 0.5;
      const timeline = gsap.timeline({ paused: true });

      timeline.to(textsRefs[element].current.scale, {
        x: 0.01,
        y: 0.01,
        z: 0.01,
        duration: duration,
      });

      timeline.play();
    });
  };

  const onCircleClick = (e, element, circlePosition) => {
    e.stopPropagation(); // Prevent the event from propagating to elements behind

    // Hide all close circles elements
    Object.keys(closeCircleRefs).map((el) => {
      closeCircleRefs[el].current.visible = false;
    });

    // Show close circle for the active item
    closeCircleRefs[element].current.visible = true;

    // Reset all items in the clickedItems state to false and set the clicked item to true (to prevent repeated clicks on the same item)
    setClickedItems({
      ...Object.fromEntries(
        Object.keys(clickedItems).map((item) => [item, false])
      ),
      [element]: true,
    });

    if (!clickedItems[element]) {
      // Reset Texts, Items and circles to their initial position/state
      textsToDefault();
      itemsToDefault();
      circlesToDefault();

      // remove circle's title
      e.eventObject.parent.children.find(
        (el) => el.name === "circle_heading_text"
      ).visible = false;

      const duration = 1;
      const timeline = gsap.timeline({ paused: true });

      timeline
        .to(circlesRefs[`${element}Circle`].current.scale, {
          x: 14,
          y: 14,
          z: 14,
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
        )
        .to(
          textsRefs[element].current.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: duration / 2,
          },
          `-=${duration - 0.7}`
        );

      timeline.play();

      textsRefs[element].current.visible = true;
    }
  };

  const onCloseClick = (e) => {
    e.stopPropagation();

    // Reset all items in the clickedItems state to false and set the clicked item to true (to prevent repeated clicks on the same item)
    setClickedItems({
      ...Object.fromEntries(
        Object.keys(clickedItems).map((item) => [item, false])
      ),
    });

    Object.keys(closeCircleRefs).map((el) => {
      closeCircleRefs[el].current.visible = false;
    });

    // Reset Texts, Items and circles to their initial position/state
    textsToDefault();
    itemsToDefault();
    circlesToDefault();
  };

  const externalLink = (e, link, target = "_blank") => {
    e.stopPropagation();
    window.open(link, target);
  };

  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group name="Scene_1" rotation={[0, -0.024369, 0]}>
            <group name="3D-items">
              <group
                name="agence-item-parent"
                position={[1, -5.537454, -18.686708]}
                ref={elementsRefs.agence}
              >
                <mesh
                  castShadow
                  receiveShadow
                  name="man-body"
                  geometry={nodes["man-body"].geometry}
                  material={materials["Material.007"]}
                  position={[0.10199, -0.455825, 1.004451]}
                  scale={0.974459}
                >
                  <mesh
                    castShadow
                    receiveShadow
                    name="man-head"
                    geometry={nodes["man-head"].geometry}
                    material={materials["Material.001"]}
                    position={[0, 1.325761, 0]}
                  />
                </mesh>
                <mesh
                  castShadow
                  receiveShadow
                  name="man2-body"
                  geometry={nodes["man2-body"].geometry}
                  material={materials["Material.002"]}
                  position={[0.078309, -0.459689, -1.097313]}
                  scale={[0.97446, 0.974459, 0.97446]}
                >
                  <mesh
                    castShadow
                    receiveShadow
                    name="man2-head"
                    geometry={nodes["man2-head"].geometry}
                    material={materials["Material.001"]}
                    position={[0, 1.303251, -0.000036]}
                  />
                </mesh>
              </group>
              <group
                name="analytics-item-parent"
                position={[0.093725, -5.611374, 18.495745]}
                ref={elementsRefs.analytic}
              >
                <mesh
                  castShadow
                  receiveShadow
                  name="analytics-item001"
                  geometry={nodes["analytics-item001"].geometry}
                  material={materials["Material.007"]}
                  morphTargetDictionary={
                    nodes["analytics-item001"].morphTargetDictionary
                  }
                  morphTargetInfluences={
                    nodes["analytics-item001"].morphTargetInfluences
                  }
                  position={[1.129708, -1.162647, 0.117745]}
                  rotation={[0, -0.190389, 0]}
                  scale={0.374375}
                >
                  <mesh
                    castShadow
                    receiveShadow
                    name="analytics-item002"
                    geometry={nodes["analytics-item002"].geometry}
                    material={materials["Material.001"]}
                    morphTargetDictionary={
                      nodes["analytics-item002"].morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes["analytics-item002"].morphTargetInfluences
                    }
                    position={[-0.425446, 0.905371, -3.346817]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    name="analytics-item003"
                    geometry={nodes["analytics-item003"].geometry}
                    material={materials["Material.002"]}
                    morphTargetDictionary={
                      nodes["analytics-item003"].morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes["analytics-item003"].morphTargetInfluences
                    }
                    position={[-0.425446, 0.905371, -3.346817]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    name="analytics-item004"
                    geometry={nodes["analytics-item004"].geometry}
                    material={materials["Material.001"]}
                    morphTargetDictionary={
                      nodes["analytics-item004"].morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes["analytics-item004"].morphTargetInfluences
                    }
                    position={[-0.425446, 0.905371, -3.346817]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    name="analytics-item005"
                    geometry={nodes["analytics-item005"].geometry}
                    material={materials["Material.007"]}
                    morphTargetDictionary={
                      nodes["analytics-item005"].morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes["analytics-item005"].morphTargetInfluences
                    }
                    position={[-0.425446, 0.905371, -3.346817]}
                  />
                </mesh>
              </group>
              <group
                name="insight-item-parent"
                position={[1.10123, -5.296604, -6.401546]}
                ref={elementsRefs.insight}
              >
                <group
                  name="insight-item"
                  position={[0.413696, -1.196221, 0.564841]}
                  rotation={[-0.092246, -0.39047, -0.035197]}
                  scale={0.94779}
                >
                  <mesh
                    castShadow
                    receiveShadow
                    name="Cylinder005"
                    geometry={nodes.Cylinder005.geometry}
                    material={materials["Material.007"]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    name="Cylinder005_1"
                    geometry={nodes.Cylinder005_1.geometry}
                    material={materials["Material.001"]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    name="Cylinder005_2"
                    geometry={nodes.Cylinder005_2.geometry}
                    material={materials["Material.002"]}
                  />
                </group>
              </group>
              <group
                name="realisation-item-parent"
                position={[1.831782, -5.488535, 6.064256]}
                ref={elementsRefs.realisation}
              >
                <mesh
                  castShadow
                  receiveShadow
                  name="realisation-paper-item"
                  geometry={nodes["realisation-paper-item"].geometry}
                  material={materials["Material.002"]}
                  position={[0.117725, 0.103251, 0.033754]}
                  rotation={[-0.144913, 0.158447, 0.001862]}
                  scale={[1.072259, 1.072258, 1.072259]}
                >
                  <mesh
                    castShadow
                    receiveShadow
                    name="realisation-item-0"
                    geometry={nodes["realisation-item-0"].geometry}
                    material={materials["Material.001"]}
                    position={[0.250795, 0.404735, 0.090572]}
                    rotation={[0.001512, -0.120914, -0.017351]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    name="realisation-item-3"
                    geometry={nodes["realisation-item-3"].geometry}
                    material={materials["Material.007"]}
                    position={[-0.252213, -0.408444, -0.058923]}
                  />
                </mesh>
              </group>
              <group
                name="rocket-item-parent"
                position={[1.249882, 6.570212, 6.047209]}
                ref={elementsRefs.rocket}
              >
                <group
                  name="fusee-big-tronc"
                  position={[-0.052141, 0.251118, -0.302983]}
                  rotation={[-0.645469, -0.120625, -0.081131]}
                  scale={[1.0899, 1.089899, 1.089899]}
                >
                  <mesh
                    castShadow
                    receiveShadow
                    name="Cylinder029"
                    geometry={nodes.Cylinder029.geometry}
                    material={materials["Material.007"]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    name="Cylinder029_1"
                    geometry={nodes.Cylinder029_1.geometry}
                    material={materials["Material.002"]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    name="fusee-big-feu"
                    geometry={nodes["fusee-big-feu"].geometry}
                    material={materials["Material.001"]}
                    position={[0.08054, -2.019342, -0.000807]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    name="fusee-big-hublot"
                    geometry={nodes["fusee-big-hublot"].geometry}
                    material={materials["Material.001"]}
                    position={[0.657124, 0.472553, -0.000811]}
                    rotation={[Math.PI / 2, 0.193773, -Math.PI / 2]}
                    scale={[0.365585, 0.158051, 0.365585]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                name="drupal-item"
                geometry={nodes["drupal-item"].geometry}
                material={materials["Material.007"]}
                position={[1.496391, 6.264128, -6.3177]}
                ref={elementsRefs.drupal}
              />
              <group
                name="megaphone-item"
                position={[1.727392, 6.266247, -17.912949]}
                rotation={[-1.129543, -0.00621, 0.027272]}
                ref={elementsRefs.megaphone}
              >
                <mesh
                  castShadow
                  receiveShadow
                  name="Cylinder012"
                  geometry={nodes.Cylinder012.geometry}
                  material={materials["Material.007"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  name="Cylinder012_1"
                  geometry={nodes.Cylinder012_1.geometry}
                  material={materials["Material.001"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  name="Cylinder012_2"
                  geometry={nodes.Cylinder012_2.geometry}
                  material={materials["Material.002"]}
                />
              </group>
              <group
                name="UX-pencil-item"
                position={[1.632064, 6.798426, 18.384649]}
                rotation={[-0.244954, 0, 0]}
                ref={elementsRefs.pencil}
              >
                <mesh
                  castShadow
                  receiveShadow
                  name="Cylinder017"
                  geometry={nodes.Cylinder017.geometry}
                  material={materials["Material.001"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  name="Cylinder017_1"
                  geometry={nodes.Cylinder017_1.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  name="Cylinder017_2"
                  geometry={nodes.Cylinder017_2.geometry}
                  material={materials["Material.003"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  name="Cylinder017_3"
                  geometry={nodes.Cylinder017_3.geometry}
                  material={materials["Material.007"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  name="Cylinder017_4"
                  geometry={nodes.Cylinder017_4.geometry}
                  material={materials["Material.004"]}
                />
              </group>
            </group>
            <group name="background-circles" rotation={[0, 0.024369, 0]}>
              <group>
                <mesh
                  castShadow
                  receiveShadow
                  name="rond-ui-item-01"
                  geometry={nodes["rond-ui-item-01"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.585661, 6.49298, 18.496717]}
                  rotation={[0, -0.024309, -Math.PI / 2]}
                  scale={3.077925}
                  onPointerEnter={() => {
                    animate("play", ["UX-penceil-item_anim"], "pencil");
                  }}
                  onPointerLeave={() => {
                    animate("pause", ["UX-penceil-item_anim"], "pencil");
                  }}
                  ref={circlesRefs.pencilCircle}
                  onClick={(e) =>
                    onCircleClick(e, "pencil", {
                      x: 10,
                      y: 0.009426,
                      z: 0.03298,
                    })
                  }
                >
                  <mesh
                    castShadow
                    receiveShadow
                    name="close-circle-01"
                    geometry={nodes["close-circle-01"].geometry}
                    material={materials["mat.close"]}
                    position={[0.976514, 0.039088, -0.00095]}
                    scale={0.139392}
                    ref={closeCircleRefs.pencil}
                    visible={false}
                    onClick={(e) => {
                      onCloseClick(e);
                    }}
                  />
                </mesh>
                <Text
                  name="circle_heading_text"
                  color="white"
                  position={[-1.194373, 2, 18.510574]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Design d'expérience
                </Text>
              </group>
              <group>
                <mesh
                  castShadow
                  receiveShadow
                  name="rond-ui-item-02"
                  geometry={nodes["rond-ui-item-02"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.28933, 6.49298, 6.072]}
                  rotation={[0, -0.024309, -Math.PI / 2]}
                  scale={3.077925}
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
                  onClick={(e) =>
                    onCircleClick(e, "rocket", {
                      x: 10,
                      y: 0.009426,
                      z: 0.03298,
                    })
                  }
                >
                  <mesh
                    castShadow
                    receiveShadow
                    name="close-circle-02"
                    geometry={nodes["close-circle-02"].geometry}
                    material={materials["mat.close"]}
                    position={[2.109531, 0.368952, -6.020223]}
                    rotation={[-0.024309, 0, Math.PI / 2]}
                    scale={0.324894}
                    ref={closeCircleRefs.rocket}
                    visible={false}
                    onClick={(e) => {
                      onCloseClick(e);
                    }}
                  />
                </mesh>
                <Text
                  name="circle_heading_text"
                  color="white"
                  position={[-1.194373, 2, 6.3]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Performance marketing
                </Text>
              </group>
              <group>
                <mesh
                  castShadow
                  receiveShadow
                  name="rond-ui-item-03"
                  geometry={nodes["rond-ui-item-03"].geometry}
                  material={materials["Material.019"]}
                  position={[-0.983102, 6.49298, -6.340613]}
                  rotation={[0, -0.024309, -Math.PI / 2]}
                  scale={3.077925}
                  onPointerEnter={() => {
                    animate("play", ["drupal-item_anim"], "drupal");
                  }}
                  onPointerLeave={() => {
                    animate("pause", ["drupal-item_anim"], "drupal");
                  }}
                  ref={circlesRefs.drupalCircle}
                  onClick={(e) =>
                    onCircleClick(e, "drupal", {
                      x: 10,
                      y: 0.009426,
                      z: 0.03298,
                    })
                  }
                >
                  <mesh
                    castShadow
                    receiveShadow
                    name="close-circle-03"
                    geometry={nodes["close-circle-03"].geometry}
                    material={materials["mat.close"]}
                    position={[0.976514, 0.039088, -0.00095]}
                    scale={0.139392}
                    ref={closeCircleRefs.drupal}
                    visible={false}
                    onClick={(e) => {
                      onCloseClick(e);
                    }}
                  />
                </mesh>
                <Text
                  name="circle_heading_text"
                  color="white"
                  position={[-1.194373, 2, -6.3]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Expertise Drupal 8
                </Text>
              </group>
              <group>
                <mesh
                  castShadow
                  receiveShadow
                  name="rond-ui-item-04"
                  geometry={nodes["rond-ui-item-04"].geometry}
                  material={materials["Material.019"]}
                  position={[-0.698446, 6.49298, -18.747694]}
                  rotation={[0, -0.024309, -Math.PI / 2]}
                  scale={3.077925}
                  onPointerEnter={() => {
                    animate("play", ["megaphone-item_anim"], "megaphone");
                  }}
                  onPointerLeave={() => {
                    animate("pause", ["megaphone-item_anim"], "megaphone");
                  }}
                  ref={circlesRefs.megaphoneCircle}
                  onClick={(e) =>
                    onCircleClick(e, "megaphone", {
                      x: 10,
                      y: 0.009426,
                      z: 0.03298,
                    })
                  }
                >
                  <mesh
                    castShadow
                    receiveShadow
                    name="close-circle-04"
                    geometry={nodes["close-circle-04"].geometry}
                    material={materials["mat.close"]}
                    position={[0.976514, 0.039088, -0.000949]}
                    scale={0.139392}
                    ref={closeCircleRefs.megaphone}
                    visible={false}
                    onClick={(e) => {
                      onCloseClick(e);
                    }}
                  />
                </mesh>
                <Text
                  name="circle_heading_text"
                  color="white"
                  position={[-1.194373, 2, -18.510574]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Social Media
                </Text>
              </group>
              <group>
                <mesh
                  castShadow
                  receiveShadow
                  name="rond-ui-item-05"
                  geometry={nodes["rond-ui-item-05"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.59753, -5.272193, 18.489134]}
                  rotation={[0, -0.024309, -Math.PI / 2]}
                  scale={3.077925}
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
                  onClick={(e) =>
                    onCircleClick(e, "analytic", {
                      x: 10,
                      y: 0.009426,
                      z: 0.03298,
                    })
                  }
                >
                  <mesh
                    castShadow
                    receiveShadow
                    name="close-circle-05"
                    geometry={nodes["close-circle-05"].geometry}
                    material={materials["mat.close"]}
                    position={[0.976514, 0.039088, -0.00095]}
                    scale={0.139392}
                    ref={closeCircleRefs.analytic}
                    visible={false}
                    onClick={(e) => {
                      onCloseClick(e);
                    }}
                  />
                </mesh>
                <Text
                  name="circle_heading_text"
                  color="white"
                  position={[-1.194373, -10, 18.510574]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Analytics
                </Text>
              </group>
              <group>
                <mesh
                  castShadow
                  receiveShadow
                  name="rond-ui-item-06"
                  geometry={nodes["rond-ui-item-06"].geometry}
                  material={materials["Material.019"]}
                  position={[-1.28933, -5.286687, 6.072]}
                  rotation={[0, -0.024309, -Math.PI / 2]}
                  scale={3.077925}
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
                  onClick={(e) =>
                    onCircleClick(e, "realisation", {
                      x: 10,
                      y: 0.009426,
                      z: 0.03298,
                    })
                  }
                >
                  <mesh
                    castShadow
                    receiveShadow
                    name="close-circle-06"
                    geometry={nodes["close-circle-06"].geometry}
                    material={materials["mat.close"]}
                    position={[0.976514, 0.039088, -0.00095]}
                    scale={0.139392}
                    ref={closeCircleRefs.realisation}
                    visible={false}
                    onClick={(e) => {
                      onCloseClick(e);
                    }}
                  />
                </mesh>
                <Text
                  name="circle_heading_text"
                  color="white"
                  position={[-1.194373, -10, 6.3]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Réalisations
                </Text>
              </group>
              <group>
                <mesh
                  castShadow
                  receiveShadow
                  name="rond-ui-item-07"
                  geometry={nodes["rond-ui-item-07"].geometry}
                  material={materials["Material.019"]}
                  position={[-0.983102, -5.293891, -6.340613]}
                  rotation={[0, -0.024309, -Math.PI / 2]}
                  scale={3.077925}
                  onPointerEnter={() => {
                    animate("play", ["insight-item_anim"], "insight");
                  }}
                  onPointerLeave={() => {
                    animate("pause", ["insight-item_anim"], "insight");
                  }}
                  ref={circlesRefs.insightCircle}
                  onClick={(e) =>
                    onCircleClick(e, "insight", {
                      x: 10,
                      y: 0.009426,
                      z: 0.03298,
                    })
                  }
                >
                  <mesh
                    castShadow
                    receiveShadow
                    name="close-circle-07"
                    geometry={nodes["close-circle-07"].geometry}
                    material={materials["mat.close"]}
                    position={[0.976514, 0.039088, -0.00095]}
                    scale={0.139392}
                    ref={closeCircleRefs.insight}
                    visible={false}
                    onClick={(e) => {
                      onCloseClick(e);
                    }}
                  />
                </mesh>
                <Text
                  name="circle_heading_text"
                  color="white"
                  position={[-1.194373, -10, -6.3]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Insights
                </Text>
              </group>
              <group>
                <mesh
                  castShadow
                  receiveShadow
                  name="rond-ui-item-08"
                  geometry={nodes["rond-ui-item-08"].geometry}
                  material={materials["Material.019"]}
                  position={[-0.698446, -5.280357, -18.747694]}
                  rotation={[0, -0.024309, -Math.PI / 2]}
                  scale={3.077925}
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
                  onClick={(e) =>
                    onCircleClick(e, "agence", {
                      x: 10,
                      y: 0.009426,
                      z: 0.03298,
                    })
                  }
                >
                  <mesh
                    castShadow
                    receiveShadow
                    name="close-circle-08"
                    geometry={nodes["close-circle-08"].geometry}
                    material={materials["mat.close"]}
                    position={[0.976514, 0.039088, -0.000949]}
                    scale={0.139392}
                    ref={closeCircleRefs.agence}
                    visible={false}
                    onClick={(e) => {
                      onCloseClick(e);
                    }}
                  />
                </mesh>
                <Text
                  name="circle_heading_text"
                  color="white"
                  position={[-1.194373, -10, -18.510574]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  Agence
                </Text>
              </group>
            </group>
            {/* <pointLight
              name="Area"
              intensity={8152711.959882}
              decay={2}
              position={[55.000004, 0, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            /> */}
          </group>
        </group>
      </group>

      {/* Text content */}
      {Object.keys(mockData).map((el, i) => {
        return (
          <mesh
            castShadow
            receiveShadow
            scale={[0.01, 0.01, 0.01]}
            key={i}
            ref={textsRefs[el]}
            visible={false}
          >
            <Text
              color="black"
              fontSize={1.2}
              maxWidth={16}
              textAlign="center"
              position={[0, 4, 0]}
              rotation={[0, 0, -0.02]}
            >
              {mockData[el].title}
            </Text>
            <Text
              color="black"
              fontSize={0.8}
              maxWidth={18}
              textAlign="center"
              lineHeight={1.4}
              position={[0, 0, 0]}
              rotation={[0, 0, -0.02]}
            >
              {mockData[el].content}
            </Text>
            <Text
              color="black"
              fontSize={0.8}
              maxWidth={18}
              textAlign="center"
              position={[0, -7, 0]}
              rotation={[0, 0, -0.02]}
              onClick={(e) => externalLink(e, mockData[el].link.href)}
              onPointerOver={() => {
                setHovered(true);
              }}
              onPointerLeave={() => {
                setHovered(false);
              }}
            >
              {mockData[el].link.title}
            </Text>
          </mesh>
        );
      })}
    </>
  );
};

export default ModelNew;
