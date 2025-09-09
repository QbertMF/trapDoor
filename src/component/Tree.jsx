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
  if (treeParams.foliageEnabled &&  iterations <= treeParams.folIterationStart) {
    const sprite = new THREE.Sprite(leafMaterial.clone());
    sprite.position.copy(end);
    // Random scale between 0.5 and 1.2
    const scale = 0.5 + rand() * 0.7;
    sprite.scale.set(scale, scale, scale);
    // Random rotation between 0 and 2*PI
    sprite.material.rotation = rand() * Math.PI * 2;
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
  let foliageCount = 0;
  // Wrap generateBranches to count foliage sprites
  function generateBranchesCounted(start, direction, length, thickness, iterations, branches, treeParams, rand, scene) {
    if (iterations === 0) return;
    const end = start.clone().add(direction.clone().multiplyScalar(length));
    branches.push(new BranchStructure(start.clone(), end.clone(), thickness, thickness * treeParams.branchThicknessFactor));
    if (treeParams.foliageEnabled && iterations <= treeParams.folIterationStart) {
      foliageCount++;
      const sprite = new THREE.Sprite(leafMaterial.clone());
      sprite.position.copy(end);
      const scale = 0.5 + rand() * 0.7;
      sprite.scale.set(scale, scale, scale);
      sprite.material.rotation = rand() * Math.PI * 2;
      scene.add(sprite);
    }
    const branchCount = treeParams.minBranch + Math.floor(rand() * (treeParams.maxBranch - treeParams.minBranch + 1));
    for (let i = 0; i < branchCount; i++) {
      const angleDeg = treeParams.minAngle + rand() * (treeParams.maxAngle - treeParams.minAngle);
      const angleRad = angleDeg * Math.PI / 180;
      let randomDir = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
      if (randomDir.angleTo(direction) < 0.1) {
        randomDir = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
      }
      const axis = direction.clone().cross(randomDir).normalize();
      const branchDir = direction.clone().applyAxisAngle(axis, angleRad).normalize();
      const nextLength = length * treeParams.branchLengthFactor + (rand() - 0.5) * treeParams.branchLengthVariance;
      generateBranchesCounted(
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
  const trunkStart = new THREE.Vector3(treeParams.position.x, treeParams.position.y, treeParams.position.z);
  const trunkDir = new THREE.Vector3(0, 1, 0);
  generateBranchesCounted(trunkStart, trunkDir, treeParams.trunkLength, treeParams.trunkThickness, treeParams.iterations, branches, treeParams, rand, scene);

  branches.forEach(branch => {
    const dir = branch.end.clone().sub(branch.start);
    const length = dir.length();
    dir.normalize();
    const geometry = new THREE.CylinderGeometry(branch.endThickness, branch.startThickness, length, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(branch.start.clone().add(dir.clone().multiplyScalar(length/2)));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir);
    scene.add(mesh);
  });
  return { branchCount: branches.length, foliageCount };
}

export default function Tree() {
  return null;
}
