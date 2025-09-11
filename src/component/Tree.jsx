import * as THREE from 'three';
import { BranchStructure } from './BranchStructure';
import { TreeStructure } from './TreeStructure';
import leafImg from '../../assets/green-leaves-tree-branch.png';
import barkImg from '../../assets/Bark001_1K/Bark001_1K-JPG_Color.jpg';

// Load leaf texture and material once
const leafTexture = new THREE.TextureLoader().load(leafImg);
const leafMaterial = new THREE.SpriteMaterial({ map: leafTexture });
leafMaterial.rotation = Math.PI / 4; // Fixed rotation (45 degrees)

// Load bark texture once
const barkTexture = new THREE.TextureLoader().load(barkImg);
// Set wrapping so it tiles correctly on cylinders
barkTexture.wrapS = THREE.RepeatWrapping;
barkTexture.wrapT = THREE.RepeatWrapping;

// Recursive function to generate branches
function generateBranches(start, direction, length, thickness, iterations, branches, treeParams, rand) {
  if (iterations === 0) return;

  // Calculate end point
  const end = start.clone().add(direction.clone().multiplyScalar(length));
  // Pass current iteration to BranchStructure for foliage placement
  branches.push(Object.assign(
    new BranchStructure(start.clone(), end.clone(), thickness, thickness * treeParams.branchThicknessFactor),
    { iteration: iterations }
  ));

  // Number of branches at this node
  const branchCount = treeParams.minBranch + Math.floor(rand() * (treeParams.maxBranch - treeParams.minBranch + 1));
  for (let i = 0; i < branchCount; i++) {
    // Random offset along the parent branch
    const offsetFactor = treeParams.minBranchOffset + rand() * (treeParams.maxBranchOffset - treeParams.minBranchOffset);
    const branchStart = start.clone().add(direction.clone().multiplyScalar(length * offsetFactor));

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
      branchStart,
      branchDir,
      nextLength,
      thickness * treeParams.branchThicknessFactor,
      iterations - 1,
      branches,
      treeParams,
      rand
    );
  }
}

// Add tree to scene
export function addTreeToScene(scene, treeParams, rand) {
  const branches = [];
  let foliageCount = 0;
  // Generate branches only (no foliage)
  const trunkStart = new THREE.Vector3(treeParams.position.x, treeParams.position.y, treeParams.position.z);
  const trunkDir = new THREE.Vector3(0, 1, 0);
  generateBranches(trunkStart, trunkDir, treeParams.trunkLength, treeParams.trunkThickness, treeParams.iterations, branches, treeParams, rand);

  // Add branch meshes
  branches.forEach(branch => {
    const dir = branch.end.clone().sub(branch.start);
    const length = dir.length();
    dir.normalize();
    const geometry = new THREE.CylinderGeometry(branch.endThickness, branch.startThickness, length, 8);
    // Repeat the bark texture along the cylinder's length and circumference
    const barkRepeatY = Math.max(1, length / 2); // Adjust as needed for tiling
    barkTexture.repeat.set(1, barkRepeatY);
    const material = new THREE.MeshBasicMaterial({ map: barkTexture });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(branch.start.clone().add(dir.clone().multiplyScalar(length/2)));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir);
    scene.add(mesh);
  });

  // Add foliage sprites in a separate pass using a new seeded random
  if (treeParams.foliageEnabled) {
    // Use a new seeded random for foliage, e.g. Mulberry32
    const createSeededRandom = (seed) => {
      let t = seed + 0x6D2B79F5;
      return function() {
        t += 0x6D2B79F5;
        let r = Math.imul(t ^ t >>> 15, 1 | t);
        r ^= r + Math.imul(r ^ r >>> 7, 61 | r);
        return ((r ^ r >>> 14) >>> 0) / 4294967296;
      };
    };
    const randFoliage = createSeededRandom(typeof rand.seed === 'number' ? rand.seed : 12345);
    branches.forEach(branch => {
      // Add foliage for the last folIterationStart iterations before the final branches
      // i.e., for branches where iteration is in [1, folIterationStart]
      if (branch.iteration <= treeParams.folIterationStart && branch.iteration > 0) {
        foliageCount++;
        const sprite = new THREE.Sprite(leafMaterial.clone());
        sprite.position.copy(branch.end);
        const scale = 0.5 + randFoliage() * 0.7;
        sprite.scale.set(scale, scale, scale);
        sprite.material.rotation = randFoliage() * Math.PI * 2;
        scene.add(sprite);
      }
    });
  }
  return { branchCount: branches.length, foliageCount };
}

export default function Tree() {
  return null;
}
