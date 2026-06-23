import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

export function parseSTL(buffer) {

  const loader = new STLLoader();
  const geo = loader.parse(buffer);

  geo.computeBoundingBox();

  const bbox = geo.boundingBox;
  const pos = geo.attributes.position;

  let surface = 0;

  for (let i = 0; i < pos.count; i += 3) {

    const a = new THREE.Vector3().fromBufferAttribute(pos, i);
    const b = new THREE.Vector3().fromBufferAttribute(pos, i+1);
    const c = new THREE.Vector3().fromBufferAttribute(pos, i+2);

    surface += new THREE.Triangle(a,b,c).getArea();
  }

  return {
    bbox: {
      x: bbox.max.x - bbox.min.x,
      y: bbox.max.y - bbox.min.y,
      z: bbox.max.z - bbox.min.z
    },
    surface,
    triangles: pos.count / 3
  };
}