// Import the necessary modules from three.js
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

function RotatingCube() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    // Set fixed size for the container
    mountRef.current.style.width = '1000px';
    mountRef.current.style.height = '800px';

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);


  // Rotating Cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Static Sphere
  const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(2, 0, 0); // Move sphere to the right of the cube
  scene.add(sphere);

  camera.position.z = 5;

    // Camera movement state
    const cameraSpeed = 0.1;
    const keys = { w: false, a: false, s: false, d: false };

    // Keydown handler
    const handleKeyDown = (e) => {
      if (e.key === 'w') keys.w = true;
      if (e.key === 'a') keys.a = true;
      if (e.key === 's') keys.s = true;
      if (e.key === 'd') keys.d = true;
    };
    // Keyup handler
    const handleKeyUp = (e) => {
      if (e.key === 'w') keys.w = false;
      if (e.key === 'a') keys.a = false;
      if (e.key === 's') keys.s = false;
      if (e.key === 'd') keys.d = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Animation loop
    let frameId;
    const animate = function () {
      // Camera movement
      if (keys.w) camera.position.z -= cameraSpeed;
      if (keys.s) camera.position.z += cameraSpeed;
      if (keys.a) camera.position.x -= cameraSpeed;
      if (keys.d) camera.position.x += cameraSpeed;

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '600px', height: '600px', margin: '0 auto' }} />;
}

export default RotatingCube;
