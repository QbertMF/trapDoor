// Structure representing a branch with endpoints and thickness
export class BranchStructure {
  constructor(start, end, startThickness, endThickness) {
    this.start = start; // THREE.Vector3
    this.end = end;     // THREE.Vector3
    this.startThickness = startThickness;
    this.endThickness = endThickness;
  }
}
