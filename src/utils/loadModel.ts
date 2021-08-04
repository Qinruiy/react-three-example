import { useEffect, useState } from "react";
import { Group, Mesh, TextureLoader } from "three";
import { OBJLoader, MTLLoader } from "three-stdlib";

type OBJProps = {
  objPath: string;
  mtlPath: string;
  textTurePath: string;
};

export const useOBJ = ({ objPath, mtlPath, textTurePath }: OBJProps) => {
  const [scene, setScene] = useState<Group>();

  useEffect(() => {
    const loadScene = async () => {
      try {
        const mtlLoader = new MTLLoader();
        const materials = await mtlLoader.loadAsync(mtlPath);
        materials.preload();
        const objLoader = new OBJLoader();
        const object = await objLoader
          .setMaterials(materials)
          .loadAsync(objPath);
        const textureLoader = new TextureLoader();
        const texture = await textureLoader.loadAsync(textTurePath);
        object.traverse((child) => {
          if (child instanceof Mesh) {
            child.material.map = texture;
          }
        });
        const newScene = new Group();
        newScene.add(object);
        setScene(newScene);
      } catch (error) {
        console.log(error);
      }
    };
    loadScene();
  }, [objPath, mtlPath, textTurePath]);

  return {
    scene,
  };
};
