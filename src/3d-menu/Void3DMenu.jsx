import { Suspense, Fragment, useState } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
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
          className="text-black w-13 h-13 hover:scale-110 transition-all cursor-pointer"
          onClick={() => setIsVisible(true)}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 33 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3.14879" cy="2.62419" r="2.51549" fill="#010000" />
            <circle cx="3.14904" cy="11.7229" r="2.51549" fill="#010000" />
            <circle cx="12.2389" cy="2.62418" r="2.51549" fill="#010000" />
            <circle cx="12.2389" cy="11.7229" r="2.51549" fill="#010000" />
            <circle cx="21.329" cy="2.62418" r="2.51549" fill="#010000" />
            <circle cx="21.329" cy="11.7229" r="2.51549" fill="#010000" />
            <circle cx="30.4191" cy="2.62418" r="2.51549" fill="#010000" />
            <circle cx="30.4191" cy="11.7229" r="2.51549" fill="#010000" />
          </svg>
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

export default Void3DMenu;
