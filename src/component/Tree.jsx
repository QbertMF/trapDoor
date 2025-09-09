import * as THREE from 'three';
import { BranchStructure } from './BranchStructure';
import { TreeStructure } from './TreeStructure';
import leafImg from '../../assets/green-leaves-tree-branch.png';

// Load leaf texture and material once
const leafTexture = new THREE.TextureLoader().load(leafImg);
const leafMaterial = new THREE.SpriteMaterial({ map: leafTexture });
leafMaterial.rotation = Math.PI / 4; // Fixed rotation (45 degrees)

// Recursive function to generate branches
function generateBranches(start, direction, length, thickness, iterations, branches, treeParams, rand, scene) {
  if (iterations === 0) return;

  // Calculate end point
  const end = start.clone().add(direction.clone().multiplyScalar(length));
  branches.push(new BranchStructure(start.clone(), end.clone(), thickness, thickness * treeParams.branchThicknessFactor));

  // Add leaf billboard sprite at last 2 iterations if foliageEnabled
  if (treeParams.foliageEnabled && iterations <= 2) {
    const sprite = new THREE.Sprite(leafMaterial.clone());
    sprite.position.copy(end);
    sprite.scale.set(0.7, 0.7, 0.7); // Fixed size
    scene.add(sprite);
  }

  // Number of branches at this node
  const branchCount = treeParams.minBranch + Math.floor(rand() * (treeParams.maxBranch - treeParams.minBranch + 1));
  for (let i = 0; i < branchCount; i++) {
    // Random angle between minAngle and maxAngle (degrees to radians)
    const angleDeg = treeParams.minAngle + rand() * (treeParams.maxAngle - treeParams.minAngle);
    const angleRad = angleDeg * Math.PI / 180;
    // Random direction in 3D space
    let randomDir = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
    // Ensure randomDir is not parallel to direction
    if (randomDir.angleTo(direction) < 0.1) {
      randomDir = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
    }
    // Axis perpendicular to direction and randomDir
    const axis = direction.clone().cross(randomDir).normalize();
    // Apply the angle to the direction to get the new branch direction
    const branchDir = direction.clone().applyAxisAngle(axis, angleRad).normalize();
    // Each branch length is shorter by branchLengthFactor relative to its parent, plus random variance
    const nextLength = length * treeParams.branchLengthFactor + (rand() - 0.5) * treeParams.branchLengthVariance;
    generateBranches(
      end,
      branchDir,
      nextLength,
      thickness * treeParams.branchThicknessFactor,
      iterations - 1,
      branches,
      treeParams,
      rand,
      scene
    );
  }
}

// Add tree to scene
export function addTreeToScene(scene, treeParams, rand) {
  const branches = [];
  const trunkStart = new THREE.Vector3(treeParams.position.x, treeParams.position.y, treeParams.position.z);
  const trunkDir = new THREE.Vector3(0, 1, 0);
  generateBranches(trunkStart, trunkDir, treeParams.trunkLength, treeParams.trunkThickness, treeParams.iterations, branches, treeParams, rand, scene);

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
