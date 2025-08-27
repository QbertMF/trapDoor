import React from 'react';

export default function TreeWidget({ iterations, setIterations, minAngle, setMinAngle, maxAngle, setMaxAngle, minBranch, setMinBranch, maxBranch, setMaxBranch, branchLengthFactor, setBranchLengthFactor, onRegenerate }) {
  return (
    <div style={{ margin: '1em 0' }}>
      <div style={{ marginBottom: '1em' }}>
        <label htmlFor="iterations">Tree Iterations: </label>
        <input
          id="iterations"
          type="number"
          min={1}
          max={10}
          value={iterations}
          onChange={e => setIterations(Number(e.target.value))}
          style={{ width: '60px' }}
        />
      </div>
      <div style={{ marginBottom: '1em' }}>
        <label htmlFor="minAngle">Min Branch Angle (deg): </label>
        <input
          id="minAngle"
          type="number"
          min={5}
          max={175}
          value={minAngle}
          onChange={e => setMinAngle(Number(e.target.value))}
          style={{ width: '60px' }}
        />
      </div>
      <div style={{ marginBottom: '1em' }}>
        <label htmlFor="maxAngle">Max Branch Angle (deg): </label>
        <input
          id="maxAngle"
          type="number"
          min={5}
          max={175}
          value={maxAngle}
          onChange={e => setMaxAngle(Number(e.target.value))}
          style={{ width: '60px' }}
        />
      </div>
      <div style={{ marginBottom: '1em' }}>
        <label htmlFor="minBranch">Min Branches: </label>
        <input
          id="minBranch"
          type="number"
          min={0}
          max={10}
          value={minBranch}
          onChange={e => setMinBranch(Number(e.target.value))}
          style={{ width: '60px' }}
        />
      </div>
      <div style={{ marginBottom: '1em' }}>
        <label htmlFor="maxBranch">Max Branches: </label>
        <input
          id="maxBranch"
          type="number"
          min={0}
          max={10}
          value={maxBranch}
          onChange={e => setMaxBranch(Number(e.target.value))}
          style={{ width: '60px' }}
        />
      </div>
      <div style={{ marginBottom: '1em' }}>
        <label htmlFor="branchLengthFactor">Branch Length Factor: </label>
        <input
          id="branchLengthFactor"
          type="number"
          min={0.1}
          max={2}
          step={0.01}
          value={branchLengthFactor}
          onChange={e => setBranchLengthFactor(Number(e.target.value))}
          style={{ width: '60px' }}
        />
      </div>
      <div style={{ marginTop: '1em' }}>
        <button onClick={onRegenerate}>Regenerate Tree</button>
      </div>
    </div>
  );
}
