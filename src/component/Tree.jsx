import * as THREE from 'three';
import { BranchStructure } from './BranchStructure';
import { TreeStructure } from './TreeStructure';
import leafImg from '../../assets/green-leaves-tree-branch.png';
import barkImg from '../../assets/Bark001_1K/Bark001_1K-JPG_Color.jpg';
import barkNormal from '../../assets/Bark001_1K/Bark001_1K-JPG_NormalGL.jpg';
import barkRoughness from '../../assets/Bark001_1K/Bark001_1K-JPG_Roughness.jpg';
import barkDisplacement from '../../assets/Bark001_1K/Bark001_1K-JPG_Displacement.jpg';

// Load leaf texture and material once
const leafTexture = new THREE.TextureLoader().load(leafImg);
const leafMaterial = new THREE.SpriteMaterial({ map: leafTexture });
leafMaterial.rotation = Math.PI / 4; // Fixed rotation (45 degrees)

// Load bark texture once
const barkTexture = new THREE.TextureLoader().load(barkImg);
const barkNormalTexture = new THREE.TextureLoader().load(barkNormal);
const barkRoughnessTexture = new THREE.TextureLoader().load(barkRoughness);
const barkDisplacementTexture = new THREE.TextureLoader().load(barkDisplacement);
// Set wrapping so it tiles correctly on cylinders
barkTexture.wrapS = THREE.RepeatWrapping;
barkTexture.wrapT = THREE.RepeatWrapping;
barkNormalTexture.wrapS = THREE.RepeatWrapping;
barkNormalTexture.wrapT = THREE.RepeatWrapping;
barkRoughnessTexture.wrapS = THREE.RepeatWrapping;
barkRoughnessTexture.wrapT = THREE.RepeatWrapping;
barkDisplacementTexture.wrapS = THREE.RepeatWrapping;
barkDisplacementTexture.wrapT = THREE.RepeatWrapping;

// Recursive function to generate branches
function generateBranches(start, direction, length, thickness, iterations, branches, treeParams, rand) {
  if (iterations === 0) return;

  let myLength = length
  // treeParams.trunkLength * treeParams.trunkLengthFactor
  if (iterations === treeParams.iterations) {
    // This is the trunk (first branch)
    myLength = length * treeParams.trunkLengthFactor * (0.7 + rand() * 0.7);
  }

  // Calculate end point
  const end = start.clone().add(direction.clone().multiplyScalar(myLength));

  // Calculate end thickness for this branch
  const endThickness = thickness * treeParams.branchThicknessFactor;
  const branchObj = Object.assign(
    new BranchStructure(start.clone(), end.clone(), thickness, endThickness),
    { iteration: iterations }
  );
  //console.log(`Iteration ${iterations}: startThickness=${branchObj.startThickness}, endThickness=${branchObj.endThickness}, start=(${branchObj.start.x.toFixed(2)},${branchObj.start.y.toFixed(2)},${branchObj.start.z.toFixed(2)}), end=(${branchObj.end.x.toFixed(2)},${branchObj.end.y.toFixed(2)},${branchObj.end.z.toFixed(2)})`);
  branches.push(branchObj);

  // Number of branches at this node
  const branchCount = treeParams.minBranch + Math.floor(rand() * (treeParams.maxBranch - treeParams.minBranch + 1));
  for (let i = 0; i < branchCount; i++) {
    // Random offset along the parent branch
    const offsetFactor = treeParams.minBranchOffset + rand() * (treeParams.maxBranchOffset - treeParams.minBranchOffset);
    const branchStart = start.clone().add(direction.clone().multiplyScalar(myLength * offsetFactor));

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

    // For child branches, thickness should start at endThickness and taper further
    const childStartThickness = endThickness;
    generateBranches(
      branchStart,
      branchDir,
      nextLength,
      childStartThickness,
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

  // Create material once and reuse for all branches
  const material = new THREE.MeshStandardMaterial({
    map: barkTexture,
    normalMap: barkNormalTexture,
    roughnessMap: barkRoughnessTexture,
    displacementMap: barkDisplacementTexture,
    displacementScale: 0.1,
    color: treeParams.barkColor
  });
  branches.forEach(branch => {
    const dir = branch.end.clone().sub(branch.start);
    const length = dir.length();
    dir.normalize();
  const geometry = new THREE.CylinderGeometry(branch.endThickness, branch.startThickness, length, treeParams.branchSegments);
    //console.log(`Creating branch mesh: startThickness=${branch.startThickness}, endThickness=${branch.endThickness}, length=${length.toFixed(2)}`);
    // Repeat the bark texture and all maps along the cylinder's length and circumference
    const barkRepeatY = Math.max(1, length / 2); // Adjust as needed for tiling
    barkTexture.repeat.set(1, barkRepeatY);
    barkNormalTexture.repeat.set(1, barkRepeatY);
    barkRoughnessTexture.repeat.set(1, barkRepeatY);
    barkDisplacementTexture.repeat.set(1, barkRepeatY);
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
        const scale = treeParams.leafTextureSize * (0.5 + randFoliage() * 0.7);
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
