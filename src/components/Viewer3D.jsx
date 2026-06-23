import { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

export default function Viewer3D({ url }) {

  const ref = useRef();

  useEffect(() => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 400);
    ref.current.appendChild(renderer.domElement);

    const loader = new STLLoader();

    loader.load(url, (geo) => {

      const mat = new THREE.MeshStandardMaterial({ color: 0x5EA4FF });
      const mesh = new THREE.Mesh(geo, mat);

      scene.add(mesh);

      camera.position.z = 200;

      const animate = () => {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animate();
    });

  }, []);

  return <div ref={ref}></div>;
}