// Structure to hold all tree generation parameters
export class TreeStructure {
  constructor({
    iterations = 4,
    minAngle = 15,
    maxAngle = 45,
  trunkLength = 2,
    trunkThickness = 0.2,
    branchLengthFactor = 0.7,
    branchThicknessFactor = 0.7,
    branchCountMin = 2,
    branchCountMax = 3,
    minBranch = 1,
    maxBranch = 3,
    branchLengthShrink = 0.75,
    branchLengthShrinkVariance = 0.4,
    branchLengthVariance = 0.2,
    position = { x: -2, y: -4, z: 0 },
    foliageEnabled = false,
    folIterationStart = 0,
    minBranchOffset = 1.0,
    maxBranchOffset = 1.0,
  } = {}) {
    this.iterations = iterations;
    this.minAngle = minAngle;
    this.maxAngle = maxAngle;
  this.trunkLength = trunkLength;
    this.trunkThickness = trunkThickness;
    this.branchLengthFactor = branchLengthFactor;
    this.branchThicknessFactor = branchThicknessFactor;
    this.branchCountMin = branchCountMin;
    this.branchCountMax = branchCountMax;
    this.minBranch = minBranch;
    this.maxBranch = maxBranch;
    this.branchLengthShrink = branchLengthShrink;
    this.branchLengthShrinkVariance = branchLengthShrinkVariance;
    this.branchLengthVariance = branchLengthVariance;
    this.position = position;
    this.foliageEnabled = foliageEnabled;
    this.folIterationStart = folIterationStart;
    this.minBranchOffset = minBranchOffset;
    this.maxBranchOffset = maxBranchOffset;
  }
}
