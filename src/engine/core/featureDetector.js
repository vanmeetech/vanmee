import * as THREE from "three";

export function detectFeatures(geometry) {

  const pos = geometry.attributes.position;

  let holes = 0;
  let sharpEdges = 0;

  for (let i = 0; i < pos.count; i += 3) {

    const a = new THREE.Vector3().fromBufferAttribute(pos, i);
    const b = new THREE.Vector3().fromBufferAttribute(pos, i+1);
    const c = new THREE.Vector3().fromBufferAttribute(pos, i+2);

    const normal = new THREE.Triangle(a,b,c).getNormal(new THREE.Vector3());

    if (Math.abs(normal.z) < 0.2) {
      sharpEdges++;
    }

    if (a.distanceTo(b) > 50) {
      holes++;
    }
  }

  return {
    holes,
    sharpEdges
  };
}