import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Preload,
  ScrollControls,
  Scroll,
  useScroll,
  Image as ImageImpl,
} from "@react-three/drei";

const Image = ({ ...props }) => {
  const ref = useRef();
  return <ImageImpl ref={ref} {...props} />;
};

const Images = () => {
  const { width, height } = useThree((state) => state.viewport);
  const scroll = useScroll();
  const group = useRef();

  useFrame(() => {
    group.current.children[0].material.zoom = 1 + scroll.range(0, 1 / 3) / 3;
    group.current.children[1].material.zoom = 1 + scroll.range(0, 1 / 3) / 3;
    group.current.children[2].material.zoom =
      1 + scroll.range(1.9 / 3, 1 / 3) / 3;
    group.current.children[3].material.zoom =
      1 + scroll.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[4].material.zoom =
      1 + scroll.range(1.25 / 3, 1 / 3) / 1;
    group.current.children[5].material.zoom =
      1 + scroll.range(1.8 / 3, 1 / 3) / 3;
    group.current.children[5].material.grayscale =
      1 - scroll.range(1.6 / 3, 1 / 3);
    group.current.children[6].material.zoom =
      1 + (1 - scroll.range(2 / 3, 1 / 3)) / 3;
  });
  return (
    <group ref={group}>
      <Image
        position={[-2, 0, 0]}
        scale={[4, height, 1]}
        url={`${process.env.PUBLIC_URL}/imgs/img1.jpeg`}
      />
      <Image
        position={[2, 0, 1]}
        scale={3}
        url={`${process.env.PUBLIC_URL}/imgs/img3.jpeg`}
      />
      <Image
        position={[-2.3, -height, 2]}
        scale={[1, 3, 1]}
        url={`${process.env.PUBLIC_URL}/imgs/img5.jpeg`}
      />
      <Image
        position={[-0.6, -height, 3]}
        scale={[1, 2, 1]}
        url={`${process.env.PUBLIC_URL}/imgs/img6.jpeg`}
      />
      <Image
        position={[0.75, -height, 3.5]}
        scale={1.5}
        url={`${process.env.PUBLIC_URL}/imgs/img2.jpeg`}
      />
      <Image
        position={[0, -height * 1.5, 2.5]}
        scale={[1.5, 3, 1]}
        url={`${process.env.PUBLIC_URL}/imgs/img4.jpeg`}
      />
      <Image
        position={[0, -height * 2 - height / 4, 0]}
        scale={[width, height / 2, 1]}
        url={`${process.env.PUBLIC_URL}/imgs/img2.jpeg`}
      />
    </group>
  );
};

const Cards = () => {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls damping={2} pages={3}>
          <Scroll>
            <Images />
          </Scroll>
          <Scroll html>
            <h1
              style={{
                position: "absolute",
                top: "60vh",
                left: "0.4em",
                fontSize: "12vw",
                whiteSpace: "pre",
              }}
            >
              Be a
            </h1>
            <h1
              style={{
                position: "absolute",
                top: "120vh",
                left: "55vw",
                fontSize: "12vw",
                whiteSpace: "pre",
              }}
            >
              part of
            </h1>
            <h1
              style={{
                position: "absolute",
                top: "138vh",
                left: "0.5vw",
                fontSize: "38vw",
              }}
            >
              VOID
            </h1>
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  );
};

export default Cards;
