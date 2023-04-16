import * as THREE from "three";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  useAnimations,
  Stage,
  Html,
  useGLTF,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
/* import { EffectComposer, DepthOfField } from "@react-three/postprocessing"; */

const Model = (props) => {
  const [hovered, setHovered] = useState(false);

  const group = useRef();

  const { nodes, materials, animations } = useGLTF(
    process.env.PUBLIC_URL + "/models/train/train_global.glb"
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
    actions["Action.001"].play().paused = true;
    actions["Action.002"].play().paused = false;
    actions["Action"].play().paused = false;
    actions["action_logo_void-end"].play().paused = false;
    actions["action_logo_void.start"].play().paused = false;
  }, [actions]);

  // on mouse hover over element, change cursor style
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  useFrame((state, delta) => {
    // Get car element
    let car = group.current.getObjectByName("kart");
    // Animate on scroll
    const action = actions["Action.001"];
    const offset = scroll.offset;
    action.time = THREE.MathUtils.damp(
      action.time,
      action.getClip().duration * offset,
      100,
      delta
    );

    // Move camera to car position
    car.getWorldPosition(state.camera.position);

    // How up the camera is from the car
    state.camera.translateY(0.3);
    // How camera is far from car
    state.camera.translateZ(0.3);
    // Reducing camera scale to put directly behind the train
    state.camera.scale.set(0.1, 0.1, 0.1);

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
              scale={0.262501}
            />
            <mesh
              name="tube-gauche"
              geometry={nodes["tube-gauche"].geometry}
              material={materials["rail-tube-material"]}
              scale={0.262501}
            />
            <mesh
              name="tube_droit"
              geometry={nodes.tube_droit.geometry}
              material={materials["rail-tube-material"]}
              scale={0.262501}
            />
          </group>
          <group name="clouds">
            <mesh
              name="cloud001"
              geometry={nodes.cloud001.geometry}
              material={materials["material-cloud.023"]}
              position={[45.086273, 0.111536, 11.807402]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={1.369952}
            />
            <mesh
              name="cloud002"
              geometry={nodes.cloud002.geometry}
              material={materials["material-cloud.023"]}
              position={[20.422634, -8.941772, -3.987979]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.249473}
            />
            <mesh
              name="cloud003"
              geometry={nodes.cloud003.geometry}
              material={materials["material-cloud.023"]}
              position={[44.420624, -5.407415, 3.963546]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.249473}
            />
            <mesh
              name="cloud004"
              geometry={nodes.cloud004.geometry}
              material={materials["material-cloud-pink"]}
              position={[28.496508, -13.986209, 2.168114]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.469493}
            />
            <mesh
              name="cloud005"
              geometry={nodes.cloud005.geometry}
              material={materials["material-cloud.023"]}
              position={[39.471992, 6.303778, -2.168772]}
              rotation={[-1.974482, 1.507289, 1.921293]}
              scale={0.94172}
            />
            <mesh
              name="cloud006"
              geometry={nodes.cloud006.geometry}
              material={materials["material-cloud.023"]}
              position={[7.335935, 7.000984, 3.909122]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.417491}
            />
            <mesh
              name="cloud007"
              geometry={nodes.cloud007.geometry}
              material={materials["material-cloud-pink"]}
              position={[27.793873, 1.908188, -3.260126]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.283512}
            />
            <mesh
              name="cloud008"
              geometry={nodes.cloud008.geometry}
              material={materials["material-cloud.023"]}
              position={[26.948118, -1.191949, 1.594617]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.249473}
            />
            <mesh
              name="cloud010"
              geometry={nodes.cloud010.geometry}
              material={materials["material-cloud-pink"]}
              position={[44.142742, -4.121311, -11.135843]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.249473}
            />
            <mesh
              name="cloud011"
              geometry={nodes.cloud011.geometry}
              material={materials["material-cloud.023"]}
              position={[54.281822, -1.836779, -6.16348]}
              rotation={[-Math.PI, 1.054941, -Math.PI]}
              scale={0.511943}
            />
            <mesh
              name="cloud013"
              geometry={nodes.cloud013.geometry}
              material={materials["material-cloud.023"]}
              position={[12.367659, -0.585164, -5.205957]}
              rotation={[-Math.PI, 1.362113, -Math.PI]}
              scale={[0.687291, 0.68729, 0.687291]}
            />
            <mesh
              name="cloud014"
              geometry={nodes.cloud014.geometry}
              material={materials["material-cloud-pink"]}
              position={[16.266872, 6.867245, -6.699389]}
              rotation={[0.034028, -1.337409, -0.007024]}
              scale={0.495514}
            />
            <mesh
              name="cloud015"
              geometry={nodes.cloud015.geometry}
              material={materials["material-cloud.023"]}
              position={[9.209392, -4.659447, 4.752297]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.417491}
            />
            <mesh
              name="cloud016"
              geometry={nodes.cloud016.geometry}
              material={materials["material-cloud.023"]}
              position={[32.160038, 16.382448, 1.696222]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.283512}
            />
            <mesh
              name="cloud017"
              geometry={nodes.cloud017.geometry}
              material={materials["material-cloud.023"]}
              position={[60.538071, 7.805833, 5.633473]}
              rotation={[1.405238, 1.550417, -1.116404]}
              scale={0.614274}
            />
            <mesh
              name="cloud018"
              geometry={nodes.cloud018.geometry}
              material={materials["material-cloud.023"]}
              position={[60.283558, -7.603346, -1.145746]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.683735}
            />
            <mesh
              name="cloud019"
              geometry={nodes.cloud019.geometry}
              material={materials["material-cloud.023"]}
              position={[24.34498, -9.726739, 10.956169]}
              rotation={[0, -1.30887, 0]}
              scale={0.715581}
            />
            <mesh
              name="cloud021"
              geometry={nodes.cloud021.geometry}
              material={materials["material-cloud-pink"]}
              position={[35.054878, -9.223294, -3.409559]}
              rotation={[-1.974482, 1.507289, 1.921293]}
              scale={0.94172}
            />
            <mesh
              name="cloud026"
              geometry={nodes.cloud026.geometry}
              material={materials["material-cloud.023"]}
              position={[25.464542, -0.047792, -6.531845]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.283512}
            />
            <mesh
              name="cloud028"
              geometry={nodes.cloud028.geometry}
              material={materials["material-cloud.023"]}
              position={[21.537954, -4.462613, 5.289465]}
              rotation={[0.034028, -1.337409, -0.007024]}
              scale={[0.64791, 0.64791, 0.647909]}
            />
            <mesh
              name="cloud030"
              geometry={nodes.cloud030.geometry}
              material={materials["material-cloud.023"]}
              position={[42.606037, 22.617386, -7.66972]}
              rotation={[0, Math.PI / 2, 0]}
              scale={1.423105}
            />
            <mesh
              name="cloud031"
              geometry={nodes.cloud031.geometry}
              material={materials["material-cloud-pink"]}
              position={[6.053154, -6.531306, -0.372274]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.220843}
            />
            <mesh
              name="cloud036"
              geometry={nodes.cloud036.geometry}
              material={materials["material-cloud.023"]}
              position={[-1.592697, -1.292228, -3.206769]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.256754}
            />
            <mesh
              name="cloud037"
              geometry={nodes.cloud037.geometry}
              material={materials["material-cloud-pink"]}
              position={[12.021002, -0.574342, 7.140302]}
              rotation={[0.141628, 1.448971, 2.361893]}
              scale={0.372448}
            />
            <mesh
              name="cloud039"
              geometry={nodes.cloud039.geometry}
              material={materials["material-cloud.023"]}
              position={[13.394822, 11.979333, 5.150131]}
              rotation={[3.059122, 1.361024, -0.558437]}
              scale={0.546955}
            />
            <mesh
              name="cloud040"
              geometry={nodes.cloud040.geometry}
              material={materials["material-cloud.023"]}
              position={[9.088738, -4.703647, -6.476828]}
              rotation={[3.046802, -1.454593, -0.786656]}
              scale={0.52352}
            />
          </group>
          <group
            name="decouvrir_buttons"
            position={[41.579468, -1.116279, 1.530137]}
          >
            <mesh
              name="discover-clients"
              geometry={nodes["discover-clients"].geometry}
              material={materials["material-decouvrir-blanc"]}
              position={[-4.452965, -0.171026, -3.144145]}
              onPointerOver={() => {
                setHovered(true);
                actions["clients-btn-scale-up-animation"].play().paused = false;
              }}
              onPointerLeave={() => {
                setHovered(false);
                actions["clients-btn-scale-up-animation"].play().paused = true;
              }}
              onClick={(e) =>
                externalLink(
                  e,
                  "https://void.fr/fr/etude-de-cas-marketing-digital/"
                )
              }
            />
            <mesh
              name="discover-drupal"
              geometry={nodes["discover-drupal"].geometry}
              material={materials["material-decouvrir-blanc"]}
              position={[-23.065266, 0.266957, -2.204568]}
              onPointerOver={() => {
                setHovered(true);
                actions["drupla-btn-scale-up-animation"].play().paused = false;
              }}
              onPointerLeave={() => {
                setHovered(false);
                actions["drupla-btn-scale-up-animation"].play().paused = true;
              }}
              onClick={(e) =>
                externalLink(
                  e,
                  "https://void.fr/fr/agence-digitale-experte-drupal/"
                )
              }
            />
            <mesh
              name="discover-insights"
              geometry={nodes["discover-insights"].geometry}
              material={materials["material-decouvrir-blanc"]}
              position={[0.00016, -0.377302, 0.059759]}
              onPointerOver={() => {
                setHovered(true);
                actions[
                  "insights-btn-scale-up-animation"
                ].play().paused = false;
              }}
              onPointerLeave={() => {
                setHovered(false);
                actions["insights-btn-scale-up-animation"].play().paused = true;
              }}
              onClick={(e) => externalLink(e, "https://void.fr/fr/insights/")}
            />
            <mesh
              name="discover-perf-marketing"
              geometry={nodes["discover-perf-marketing"].geometry}
              material={materials["material-decouvrir-blanc"]}
              position={[-33.719563, -0.146394, 0.69266]}
              onPointerOver={() => {
                setHovered(true);
                actions[
                  "discover-btn-scale-up-animation"
                ].play().paused = false;
              }}
              onPointerLeave={() => {
                setHovered(false);
                actions["discover-btn-scale-up-animation"].play().paused = true;
              }}
              onClick={(e) =>
                externalLink(
                  e,
                  "https://void.fr/fr/performance-strategie-digitale/"
                )
              }
            />
            <mesh
              name="discover-social-media"
              geometry={nodes["discover-social-media"].geometry}
              material={materials["material-decouvrir-blanc"]}
              position={[-16.809504, -3.930169, -1.618541]}
              onPointerOver={() => {
                setHovered(true);
                actions["social-btn-scale-up-animation"].play().paused = false;
              }}
              onPointerLeave={() => {
                setHovered(false);
                actions["social-btn-scale-up-animation"].play().paused = true;
              }}
              onClick={(e) =>
                externalLink(e, "https://void.fr/fr/social-media/")
              }
            />
            <mesh
              name="discover-ux"
              geometry={nodes["discover-ux"].geometry}
              material={materials["material-decouvrir-blanc"]}
              position={[-39.569702, 2.406423, -2.57441]}
              onPointerOver={() => {
                setHovered(true);
                actions["UX-btn-hover-animation"].play().paused = false;
              }}
              onPointerLeave={() => {
                setHovered(false);
                actions["UX-btn-hover-animation"].play().paused = true;
              }}
              onClick={(e) =>
                externalLink(e, "https://void.fr/fr/design-experience-UX/")
              }
            />
          </group>
          <group name="ending-3D" position={[47.745129, -0.824241, 4.510498]}>
            <group
              name="void-logo-container"
              position={[3.747929, 2.016111, -0.368421]}
              rotation={[-0.001753, 0.067589, 1.572589]}
              scale={1.311189}
            >
              <mesh
                name="void-logo-end"
                geometry={nodes["void-logo-end"].geometry}
                material={materials["SVGMat.002"]}
                position={[-0.589862, 0.994375, 0.02756]}
                rotation={[0.0021, -1.57056, 0]}
                scale={2.142842}
              />
            </group>
            <mesh
              name="end-btn001"
              geometry={nodes["end-btn001"].geometry}
              material={materials["material-nous-contacter-blanc"]}
              position={[0.595428, -0.047061, -0.109982]}
              rotation={[-0.000138, 0.067576, 0.011497]}
              onPointerOver={() => {
                setHovered(true);
                actions["end-btn-action-hover"].play().paused = false;
              }}
              onPointerLeave={() => {
                setHovered(false);
                actions["end-btn-action-hover"].play().paused = true;
              }}
              onClick={(e) =>
                externalLink(
                  e,
                  "https://void.fr/fr/etude-de-cas-marketing-digital/#contact"
                )
              }
            />
            <mesh
              name="felicitations-text"
              geometry={nodes["felicitations-text"].geometry}
              material={materials["3D_Font_Material"]}
              position={[2.566818, -1.301181, -0.150207]}
              rotation={[2.039031, -0.056363, 1.5299]}
              scale={0.710974}
            />
            <mesh
              name="kilocalories-text001"
              geometry={nodes["kilocalories-text001"].geometry}
              material={materials["SVGMat.002"]}
              position={[2.371811, 0.270767, -0.235715]}
              rotation={[1.567175, -0.053305, 1.49858]}
              scale={0.105136}
            />
          </group>
          <group name="sky-and-light">
            <group
              name="light"
              position={[11.233078, 3.7313, 2.305084]}
              rotation={[-1.228391, 0.097806, 1.572024]}
            />

            <mesh
              name="cube-bg-applied001"
              geometry={nodes["cube-bg-applied001"].geometry}
              material={materials["Sky_Texture.-forbake.003"]}
              position={[15.054052, 10.228363, 1.23877]}
              scale={86.798935}
            />
          </group>
          <group name="start" position={[47.745129, -0.824241, 4.510498]}>
            <group
              name="void-logo-container-start"
              position={[-52.187065, 5.407802, -4.459895]}
              rotation={[-0.006653, -0.018696, 1.569939]}
              scale={[2.405704, 2.405703, 2.405704]}
            >
              <mesh
                name="void-logo-start"
                geometry={nodes["void-logo-start"].geometry}
                material={materials["SVGMat.002"]}
                position={[-0.589862, 0.994372, 0.02756]}
                rotation={[0.0021, -1.57056, 0]}
                scale={[2.142842, 2.142841, 2.142842]}
              />
            </group>
            <mesh
              name="gif-mouse-scroll_1"
              geometry={nodes["gif-mouse-scroll_1"].geometry}
              material={materials["gif-mouse-scroll_1"]}
              position={[-55.779091, 3.042665, -4.427336]}
              scale={3.102448}
            />
            <mesh
              name="air-scrolling001"
              geometry={nodes["air-scrolling001"].geometry}
              material={materials["3D_Font_Material"]}
              position={[-54.913021, 1.52152, -4.396183]}
              rotation={[1.570749, 0, 1.570511]}
              scale={0.34777}
            />
            <mesh
              name="invente"
              geometry={nodes.invente.geometry}
              material={materials["3D_Font_Material"]}
              position={[-54.604595, 3.836645, -4.428844]}
              rotation={[1.559923, 0, Math.PI / 2]}
              scale={0.087332}
            />
            <mesh
              name="Scrollez-text-intro"
              geometry={nodes["Scrollez-text-intro"].geometry}
              material={materials["inteface-3D-font"]}
              position={[-55.870525, 2.899017, -4.405554]}
              rotation={[1.57052, 0, 1.570508]}
              scale={0.063376}
            />
          </group>
          <group name="text-3D" position={[41.579468, -1.116279, 1.530137]}>
            <mesh
              name="1-UX-Desing001"
              geometry={nodes["1-UX-Desing001"].geometry}
              material={materials["3D_Font_Material"]}
              position={[-39.873058, 2.5801, -3.398715]}
              rotation={[1.546334, 0.007884, 1.161602]}
              scale={0.504888}
            />
            <mesh
              name="2-perf-mark002"
              geometry={nodes["2-perf-mark002"].geometry}
              material={materials["3D_Font_Material"]}
              position={[-33.293869, 0.329972, -0.086776]}
              rotation={[1.58895, -0.107021, 1.960337]}
              scale={0.393054}
            />
            <mesh
              name="2-perf-mark003"
              geometry={nodes["2-perf-mark003"].geometry}
              material={materials["3D_Font_Material"]}
              position={[-33.293869, 0.135281, -0.086776]}
              rotation={[1.58895, -0.107021, 1.960337]}
              scale={0.506092}
            />
            <mesh
              name="3-drupal002"
              geometry={nodes["3-drupal002"].geometry}
              material={materials["3D_Font_Material"]}
              position={[-23.211952, 1.150415, -3.136698]}
              rotation={[1.569297, 0.032712, 1.35505]}
              scale={0.391084}
            />
            <mesh
              name="3-drupal003"
              geometry={nodes["3-drupal003"].geometry}
              material={materials["3D_Font_Material"]}
              position={[-23.211952, 0.691161, -3.136698]}
              rotation={[1.569297, 0.032712, 1.35505]}
              scale={0.704324}
            />
            <mesh
              name="4-social-media002"
              geometry={nodes["4-social-media002"].geometry}
              material={materials["3D_Font_Material"]}
              position={[-16.870237, -3.618694, -2.101676]}
              rotation={[1.582507, -0.00032, 1.066929]}
              scale={[0.523771, 0.523771, 0.52377]}
            />
            <mesh
              name="4-social-media003"
              geometry={nodes["4-social-media003"].geometry}
              material={materials["3D_Font_Material"]}
              position={[-16.870237, -3.266069, -2.101676]}
              rotation={[1.582507, -0.00032, 1.066929]}
              scale={0.389389}
            />
            <mesh
              name="5-etude-cas-client002"
              geometry={nodes["5-etude-cas-client002"].geometry}
              material={materials["3D_Font_Material"]}
              position={[-4.700905, 0.869091, -3.759334]}
              rotation={[1.582042, 0.020956, 1.272032]}
              scale={[0.565091, 0.565091, 0.565092]}
            />
            <mesh
              name="5-etude-cas-client003"
              geometry={nodes["5-etude-cas-client003"].geometry}
              material={materials["3D_Font_Material"]}
              position={[-4.693657, 0.546746, -3.725496]}
              rotation={[1.582042, 0.020956, 1.272032]}
              scale={0.302328}
            >
              <mesh
                name="acccent-e"
                geometry={nodes["acccent-e"].geometry}
                material={materials["3D_Font_Material"]}
                position={[0.003197, -0.002453, -0.1324]}
              />
            </mesh>
            <mesh
              name="6-insights001"
              geometry={nodes["6-insights001"].geometry}
              material={materials["3D_Font_Material"]}
              position={[0.528446, 0.091558, 0.331102]}
              rotation={[1.590076, 0.042921, -2.610368]}
              scale={[0.484448, 0.484449, 0.484449]}
            />
          </group>
          <mesh
            name="kart"
            geometry={nodes.kart.geometry}
            material={materials["red-for-kart"]}
            position={[-9.499063, 2.056472, 0.092783]}
            rotation={[-0.010979, 0.000003, -0.000522]}
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
            <ScrollControls pages={30}>
              <Model />
            </ScrollControls>
          </Stage>
        </Suspense>
        {/* <EffectComposer multisampling={0} disableNormalPass={true}>
          <DepthOfField
            focusDistance={0} // where to focus
            focalLength={1} // focal length
            bokehScale={2} // bokeh size
          />
        </EffectComposer> */}
      </Canvas>
    </div>
  );
};

export default Train;
