import * as THREE from 'three';
import { BranchStructure } from './BranchStructure';

// Recursive function to generate branches
function generateBranches(start, direction, length, thickness, iterations, branches) {
  if (iterations === 0) return;

  // Calculate end point
  const end = start.clone().add(direction.clone().multiplyScalar(length));
  branches.push(new BranchStructure(start.clone(), end.clone(), thickness, thickness * 0.7));

  // Number of branches at this node
  const branchCount = 2 + Math.floor(Math.random() * 2); // 2 or 3 branches
  for (let i = 0; i < branchCount; i++) {
    // Random direction for branch
    const angle = (Math.PI / 4) * (Math.random() - 0.5) + (i - (branchCount-1)/2) * (Math.PI/6);
    const branchDir = direction.clone().applyAxisAngle(new THREE.Vector3(0,0,1), angle).applyAxisAngle(new THREE.Vector3(1,0,0), Math.random() * 0.3);
    generateBranches(
      end,
      branchDir,
      length * (0.7 + Math.random()*0.2),
      thickness * 0.7,
      iterations - 1,
      branches
    );
  }
}

// Add tree to scene
export function addTreeToScene(scene, position = { x: -2, y: -4, z: 0 }, iterations = 4) {
  const branches = [];
  const trunkStart = new THREE.Vector3(position.x, position.y, position.z);
  const trunkDir = new THREE.Vector3(0, 1, 0);
  generateBranches(trunkStart, trunkDir, 2, 0.2, iterations, branches);

  // Render branches as cylinders
  branches.forEach(branch => {
    const dir = branch.end.clone().sub(branch.start);
    const length = dir.length();
    dir.normalize();
    // Cylinder geometry
    const geometry = new THREE.CylinderGeometry(branch.endThickness, branch.startThickness, length, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const mesh = new THREE.Mesh(geometry, material);
    // Position and orientation
    mesh.position.copy(branch.start.clone().add(dir.clone().multiplyScalar(length/2)));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir);
    scene.add(mesh);
  });
}

export default function Tree() {
  return null;
}
