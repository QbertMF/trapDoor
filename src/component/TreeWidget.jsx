import React, { useState } from 'react';

export default function TreeWidget({
  iterations, setIterations,
  minAngle, setMinAngle,
  maxAngle, setMaxAngle,
  minBranch, setMinBranch,
  maxBranch, setMaxBranch,
  branchLengthFactor, setBranchLengthFactor,
  trunkThickness, setTrunkThickness,
  branchThicknessFactor, setBranchThicknessFactor,
  folIterationStart, setFolIterationStart,
  minBranchOffset, setMinBranchOffset,
  maxBranchOffset, setMaxBranchOffset,
  trunkLength, setTrunkLength,
  onRegenerate
}) {
  const [foliageOpen, setFoliageOpen] = useState(false);
  const [trunkOpen, setTrunkOpen] = useState(false);
  return (
    <div style={{ margin: '1em 0' }}>
      <div style={{ marginBottom: '1em' }}>
        <label htmlFor="iterations">Tree Iterations: </label>
        <input
          id="iterations"
          type="number"
          min={1}
          max={20}
          value={iterations}
          onChange={e => setIterations(Number(e.target.value))}
          style={{ width: '60px' }}
        />
      </div>
            <div style={{ marginTop: '1em', border: '1px solid #ccc', borderRadius: '6px', padding: '0.5em' }}>
              <div style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setTrunkOpen(v => !v)}>
                {trunkOpen ? '▼' : '▶'} Trunk Parameters
              </div>
              {trunkOpen && (
                <div style={{ marginTop: '1em' }}>
                  <div style={{ marginBottom: '1em' }}>
                    <label htmlFor="trunkLength">Trunk Length: </label>
                    <input
                      id="trunkLength"
                      type="number"
                      min={2.0}
                      max={30.0}
                      step={0.01}
                      value={trunkLength}
                      onChange={e => setTrunkLength(Number(e.target.value))}
                      style={{ width: '60px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '1em' }}>
                    <label htmlFor="trunkThickness">Trunk Thickness: </label>
                    <input
                      id="trunkThickness"
                      type="number"
                      min={0.1}
                      max={10}
                      step={0.01}
                      value={trunkThickness}
                      onChange={e => setTrunkThickness(Number(e.target.value))}
                      style={{ width: '60px' }}
                    />
                  </div>
                </div>
              )}
            </div>
      <div style={{ marginBottom: '1em' }}>
        <label htmlFor="branchThicknessFactor">Branch Thickness Factor: </label>
        <input
          id="branchThicknessFactor"
          type="number"
          min={0.1}
          max={2}
          step={0.01}
          value={branchThicknessFactor}
          onChange={e => setBranchThicknessFactor(Number(e.target.value))}
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
      <div style={{ marginBottom: '1em' }}>
        <label htmlFor="minBranchOffset">Min Branch Offset: </label>
        <input
          id="minBranchOffset"
          type="number"
          min={0.0}
          max={1.0}
          step={0.01}
          value={minBranchOffset}
          onChange={e => setMinBranchOffset(Number(e.target.value))}
          style={{ width: '60px' }}
        />
      </div>
      <div style={{ marginBottom: '1em' }}>
        <label htmlFor="maxBranchOffset">Max Branch Offset: </label>
        <input
          id="maxBranchOffset"
          type="number"
          min={0.0}
          max={1.0}
          step={0.01}
          value={maxBranchOffset}
          onChange={e => setMaxBranchOffset(Number(e.target.value))}
          style={{ width: '60px' }}
        />
      </div>
      <div style={{ marginTop: '1em', border: '1px solid #ccc', borderRadius: '6px', padding: '0.5em' }}>
        <div style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setFoliageOpen(v => !v)}>
          {foliageOpen ? '▼' : '▶'} Foliage Parameters
        </div>
        {foliageOpen && (
          <div style={{ marginTop: '1em' }}>
            <label htmlFor="folIterationStart">Foliage Iteration Start: </label>
            <input
              id="folIterationStart"
              type="number"
              min={0}
              max={iterations}
              value={folIterationStart}
              onChange={e => setFolIterationStart(Number(e.target.value))}
              style={{ width: '60px' }}
            />
          </div>
        )}
      </div>
      <div style={{ marginTop: '1em' }}>
        <button onClick={onRegenerate}>Regenerate Tree</button>
      </div>
    </div>
  );
}
