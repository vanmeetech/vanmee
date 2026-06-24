import * as THREE from "three";

export function buildGeometry(buffer) {

  const loader = new THREE.STLLoader();
  const geometry = loader.parse(buffer);

  geometry.computeBoundingBox();
  geometry.computeVertexNormals();

  return geometry;
}