import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const Elements = () => {
  // Utility to convert Degree to Radian
  const angleToRadians = (angleInDeg) => (Math.PI / 180) * angleInDeg;

  // Code to move the camera around
  const orbitControlsRef = useRef(null);

  useFrame((state) => {
    if (!!orbitControlsRef.current) {
      const { x, y } = state.mouse;
      orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
      orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(60));
      orbitControlsRef.current.update();
    }
  });

  // Animation
  const ballRef = useRef(null);
  useEffect(() => {
    if (!!ballRef.current) {
      // Timeline
      const timeline = gsap.timeline({ paused: true });

      // x-axis motion
      timeline.to(ballRef.current.position, {
        x: 0,
        duration: 2,
        ease: "power2.out",
      });

      // y-axis motion
      timeline.to(
        ballRef.current.position,
        {
          y: 0.5,
          duration: 1,
          ease: "bounce.out",
        },
        "<"
      );

      // Play
      timeline.play();
    }
  }, [ballRef.current]);
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 1, 10]} />
      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={angleToRadians(60)}
        maxPolarAngle={angleToRadians(80)}
      />

      {/* Ball */}
      <mesh position={[-3, 3, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#FFF" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Floor */}
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1ea3d8" />
      </mesh>

      {/* Ambient light */}
      <ambientLight args={["#FFF", 0.24]} />

      {/* Spotlight light */}
      <spotLight
        args={["#FFF", 2.5, 20, angleToRadians(45), 0.3]}
        position={[-3, 1, 0]}
        castShadow
      />

      {/* Environmnet */}
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color="#2266cc" side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  );
};

const Ball = () => {
  return (
    <Canvas shadows>
      <Suspense fallback={null}>
        <Elements />
      </Suspense>
    </Canvas>
  );
};

export default Ball;
