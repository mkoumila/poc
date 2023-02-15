import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export const Model = () => {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/car/scene.gltf"
  );

  useEffect(() => {
    // Changing the car model scale and position and make it smaller because it's huge
    /* gltf.scene.scale.set(0.005, 0.005, 0.005); */
    gltf.scene.position.set(-1, -0.035, 0);
    gltf.scene.traverse((object) => {
      //Giving the car model's children ( tires, car body parts ...) the ability to cast and receive shadow
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
};
