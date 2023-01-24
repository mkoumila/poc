import { MeshReflectorMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export const Ground = () => {
  /* To get texture from these two files  */
  const [roughness, normal] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "textures/terrain-roughness.jpeg",
    process.env.PUBLIC_URL + "textures/terrain-normal.jpeg",
  ]);

  useEffect(() => {
    [roughness, normal].forEach((el) => {
      el.wrapS = RepeatWrapping;
      el.wrapT = RepeatWrapping;
      el.repeat.set(5, 5);
    });
    /* Applying encoding to the normal texture */
    normal.encoding = LinearEncoding;
  }, [roughness, normal]);

  /* To move the ground */
  /* useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.128;
    roughness.offset.set(0, t % 1);
    normal.offset.set(0, t % 1);
  }); */

  return (
    // Allowing mesh to rotate in X Axis and receive and also cast shadows
    <mesh rotation-x={-Math.PI * 0.5} receiveShadow castShadow>
      {/* Specifying the width and the length of the plane  */}
      <planeGeometry args={[30, 30]} />
      {/* To make it possible to reflect all the objects of the scene o nthis plane  */}
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        normalScale={[0.15, 0.15]}
        roughnessMap={roughness}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
        mixStrength={80} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        debug={0}
        reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh>
  );
};
