import { Suspense, Fragment, useState } from "react";
import { Stage, useGLTF } from "@react-three/drei";
import { Transition } from "@headlessui/react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";

const Void3DMenu = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      style={{
        background: `url(${process.env.PUBLIC_URL}/imgs/img2.jpeg)`,
        height: "100%",
      }}
    >
      <div className="fixed top-0 left-0 w-full h-[80px] bg-gray-100 flex items-center justify-end px-10">
        <div
          className="p-3 rounded-lg cursor-pointer border-2 border-black transition-all hover:bg-black hover:text-white"
          onClick={() => setIsVisible(true)}
        >
          Click Me
        </div>
      </div>
      <Transition
        show={isVisible}
        as={Fragment}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed top-0 left-0 z-[100] w-screen h-screen backdrop-blur-[8px]">
          <div
            className="absolute right-[64px] top-[74px] cursor-pointer z-[1000] text-6xl font-thin"
            onClick={() => setIsVisible(false)}
          >
            x
          </div>
          <Canvas camera={{ fov: 5 }} shadows>
            <ambientLight intensity={0.3} />
            <pointLight position={[0, 0, 0]} intensity={0.3} />
            <directionalLight
              position={[0, 0, 5]}
              intensity={0.7}
              color="white"
              castShadow
              shadow-mapSize={1024}
            />
            {/* <OrbitControls /> */}
            <Suspense fallback={null}>
              <Stage environment={null}>
                <Model />
              </Stage>
            </Suspense>
          </Canvas>
        </div>
      </Transition>
    </div>
  );
};

useGLTF.preload("/void_3d_menu_draco.gltf");

export default Void3DMenu;
