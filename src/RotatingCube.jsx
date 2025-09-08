// Import the necessary modules from three.js
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { addTreeToScene } from './component/Tree';
import { createSeededRandom } from './component/SeededRandom';
import { TreeStructure } from './component/TreeStructure';
import TreeWidget from './component/TreeWidget';

function RotatingCube() {
  const mountRef = useRef(null);
  const [iterations, setIterations] = useState(8);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1000000));
  const [minAngle, setMinAngle] = useState(15);
  const [maxAngle, setMaxAngle] = useState(45);
  const [minBranch, setMinBranch] = useState(1);
  const [maxBranch, setMaxBranch] = useState(3);
  const [branchLengthFactor, setBranchLengthFactor] = useState(0.8);
  const [cameraRotationEnabled, setCameraRotationEnabled] = useState(true);
  const orbitAzimuthRef = useRef(0); // horizontal angle
  const orbitElevationRef = useRef(0); // vertical angle

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

    // Create tree parameters structure
    const treeParams = new TreeStructure({
      iterations,
      minAngle,
      maxAngle,
      minBranch,
      maxBranch,
      branchLengthFactor,
      // Add more parameters here as needed
    });
    // Create seeded random generator
    const rand = createSeededRandom(seed);
    // Add tree model to the scene as a group
    const treeGroup = new THREE.Group();
    addTreeToScene(treeGroup, treeParams, rand);
    scene.add(treeGroup);

    camera.position.z = 10;
    
    // Camera movement state
    const cameraSpeed = 0.1;
  const keys = { w: false, a: false, s: false, d: false, q: false, e: false, ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false };

    // Keydown handler
    const handleKeyDown = (e) => {
      if (e.key === 'w') keys.w = true;
      if (e.key === 'a') keys.a = true;
      if (e.key === 's') keys.s = true;
      if (e.key === 'd') keys.d = true;
      if (e.key === 'q') keys.q = true;
      if (e.key === 'e') keys.e = true;
      if (e.key === 'ArrowLeft') keys.ArrowLeft = true;
      if (e.key === 'ArrowRight') keys.ArrowRight = true;
      if (e.key === 'ArrowUp') keys.ArrowUp = true;
      if (e.key === 'ArrowDown') keys.ArrowDown = true;
    };
    // Keyup handler
    const handleKeyUp = (e) => {
      if (e.key === 'w') keys.w = false;
      if (e.key === 'a') keys.a = false;
      if (e.key === 's') keys.s = false;
      if (e.key === 'd') keys.d = false;
      if (e.key === 'q') keys.q = false;
      if (e.key === 'e') keys.e = false;
      if (e.key === 'ArrowLeft') keys.ArrowLeft = false;
      if (e.key === 'ArrowRight') keys.ArrowRight = false;
      if (e.key === 'ArrowUp') keys.ArrowUp = false;
      if (e.key === 'ArrowDown') keys.ArrowDown = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Camera orbit state
    let orbitRadius = 10;
    // Use refs for azimuth/elevation
    // let orbitAzimuth = 0; // horizontal angle
    // let orbitElevation = 0; // vertical angle
    const orbitSpeed = 0.03;
    let orbitCenter = new THREE.Vector3(0, 0, 0);

    // Animation loop
    let frameId;
    const animate = function () {

      // WASDQE move the orbit center (pan relative to camera orientation)
      // Calculate camera direction vectors
      const forward = new THREE.Vector3(
        Math.sin(orbitAzimuthRef.current) * Math.cos(orbitElevationRef.current),
        Math.sin(orbitElevationRef.current),
        Math.cos(orbitAzimuthRef.current) * Math.cos(orbitElevationRef.current)
      ).normalize();
      const right = new THREE.Vector3(
        Math.cos(orbitAzimuthRef.current),
        0,
        -Math.sin(orbitAzimuthRef.current)
      ).normalize();
      const up = new THREE.Vector3(0, 1, 0);

      if (keys.w) orbitCenter.add(forward.clone().multiplyScalar(cameraSpeed));
      if (keys.s) orbitCenter.add(forward.clone().multiplyScalar(-cameraSpeed));
      if (keys.a) orbitCenter.add(right.clone().multiplyScalar(-cameraSpeed));
      if (keys.d) orbitCenter.add(right.clone().multiplyScalar(cameraSpeed));
      if (keys.q) orbitCenter.add(up.clone().multiplyScalar(cameraSpeed)); // Move up
      if (keys.e) orbitCenter.add(up.clone().multiplyScalar(-cameraSpeed)); // Move down

      // Camera orbit (arrow keys)
      if (keys.ArrowLeft) orbitAzimuthRef.current -= orbitSpeed;
      if (keys.ArrowRight) orbitAzimuthRef.current += orbitSpeed;
      if (keys.ArrowUp) orbitElevationRef.current = Math.min(orbitElevationRef.current + orbitSpeed, Math.PI/2 - 0.1);
      if (keys.ArrowDown) orbitElevationRef.current = Math.max(orbitElevationRef.current - orbitSpeed, -Math.PI/2 + 0.1);

      // Slowly rotate camera around tree if enabled
      if (cameraRotationEnabled) {
        orbitAzimuthRef.current += 0.003;
      }

      // Calculate camera position in orbit
      camera.position.x = orbitCenter.x + orbitRadius * Math.cos(orbitElevationRef.current) * Math.sin(orbitAzimuthRef.current);
      camera.position.y = orbitCenter.y + orbitRadius * Math.sin(orbitElevationRef.current);
      camera.position.z = orbitCenter.z + orbitRadius * Math.cos(orbitElevationRef.current) * Math.cos(orbitAzimuthRef.current);
      camera.lookAt(orbitCenter);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  //treeGroup.rotation.y += 0.003; // Remove tree rotation, only camera orbits
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
  }, [iterations, seed, minAngle, maxAngle, minBranch, maxBranch, branchLengthFactor, cameraRotationEnabled]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: '2em' }}>
      <div ref={mountRef} style={{ width: '1000px', height: '800px', margin: '0 auto' }} />
      <div>
        <TreeWidget
          iterations={iterations}
          setIterations={setIterations}
          minAngle={minAngle}
          setMinAngle={setMinAngle}
          maxAngle={maxAngle}
          setMaxAngle={setMaxAngle}
          minBranch={minBranch}
          setMinBranch={setMinBranch}
          maxBranch={maxBranch}
          setMaxBranch={setMaxBranch}
          branchLengthFactor={branchLengthFactor}
          setBranchLengthFactor={setBranchLengthFactor}
          onRegenerate={() => setSeed(Math.floor(Math.random() * 1000000))}
        />
        <button
          style={{ marginTop: '1em', width: '100%' }}
          onClick={() => setCameraRotationEnabled(v => !v)}
        >
          {cameraRotationEnabled ? 'Disable Camera Rotation' : 'Enable Camera Rotation'}
        </button>
        {/* More parameter widgets can be added here */}
      </div>
    </div>
  );
}

export default RotatingCube;
