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
  branchSegments, setBranchSegments,
  barkColor, setBarkColor,
  folIterationStart, setFolIterationStart,
  minBranchOffset, setMinBranchOffset,
  maxBranchOffset, setMaxBranchOffset,
  trunkLength, setTrunkLength,
  trunkLengthFactor, setTrunkLengthFactor,
  leafTextureSize, setLeafTextureSize,
  seed, setSeed,
  onRegenerate
}) {
  // Handler for glTF export
  function handleExportGLTF() {
    if (typeof window.exportTreeGLTF === 'function') {
      window.exportTreeGLTF();
    } else {
      alert('glTF export function not implemented.');
    }
  }
  const [foliageOpen, setFoliageOpen] = useState(false);
  const [trunkOpen, setTrunkOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(false);

  // React styleSheet for recurring elements
  const styles = {
    paramRow: {
      marginBottom: '1em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start', // Left align all parameter rows
    },
    label: {
      minWidth: '140px',
      marginRight: '8px',
    },
    slider: {
      width: '80px',
      marginRight: '8px',
    },
    input: {
      width: '60px',
    },
    iconWrap: {
      display: 'inline-block',
      marginLeft: '8px',
      position: 'relative',
    },
    icon: {
      display: 'inline-block',
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      background: '#eee',
      border: '1px solid #aaa',
      textAlign: 'center',
      lineHeight: '22px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '16px',
      color: '#333',
      position: 'relative',
    },
  };
  return (
    <div style={{ margin: '1em 0' }}>
      <div style={{ marginBottom: '1em' }}>
        <label htmlFor="seed">Seed: </label>
        <input
          id="seed"
          type="number"
          min={0}
          max={9999999}
          value={seed}
          onChange={e => setSeed(Number(e.target.value))}
          style={{ width: '100px' }}
        />
      </div>
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
                    <div style={styles.paramRow}>
                      <label htmlFor="trunkLength" style={styles.label}>Trunk Length: </label>
                      <input
                        id="trunkLength-slider"
                        type="range"
                        min={1.0}
                        max={100.0}
                        step={0.5}
                        value={trunkLength}
                        onChange={e => setTrunkLength(Number(e.target.value))}
                        style={styles.slider}
                      />
                      <input
                        id="trunkLength"
                        type="number"
                        min={1.0}
                        max={100.0}
                        step={0.5}
                        value={trunkLength}
                        onChange={e => setTrunkLength(Number(e.target.value))}
                        style={styles.input}
                      />
                      <div style={{ flex: 1 }} />
                      <span style={styles.iconWrap}>
                        <span style={styles.icon} title="Length of the trunk in world units.">?</span>
                      </span>
                    </div>
                  </div>
                  <div style={{ marginBottom: '1em' }}>
                    <div style={styles.paramRow}>
                      <label htmlFor="trunkLengthFactor" style={styles.label}>Trunk Length Factor: </label>
                      <input
                        id="trunkLengthFactor-slider"
                        type="range"
                        min={1.0}
                        max={100.0}
                        step={0.25}
                        value={trunkLengthFactor}
                        onChange={e => setTrunkLengthFactor(Number(e.target.value))}
                        style={styles.slider}
                      />
                      <input
                        id="trunkLengthFactor"
                        type="number"
                        min={1.0}
                        max={100.0}
                        step={0.25}
                        value={trunkLengthFactor}
                        onChange={e => setTrunkLengthFactor(Number(e.target.value))}
                        style={styles.input}
                      />
                      <div style={{ flex: 1 }} />
                      <span style={styles.iconWrap}>
                        <span style={styles.icon} title="Multiplier for trunk length, only affects the first branch (trunk).">?</span>
                      </span>
                    </div>
                  </div>
                  <div style={{ marginBottom: '1em' }}>
                    <div style={styles.paramRow}>
                      <label htmlFor="trunkThickness" style={styles.label}>Trunk Thickness: </label>
                      <input
                        id="trunkThickness-slider"
                        type="range"
                        min={0.1}
                        max={10}
                        step={0.01}
                        value={trunkThickness}
                        onChange={e => setTrunkThickness(Number(e.target.value))}
                        style={styles.slider}
                      />
                      <input
                        id="trunkThickness"
                        type="number"
                        min={0.1}
                        max={10}
                        step={0.01}
                        value={trunkThickness}
                        onChange={e => setTrunkThickness(Number(e.target.value))}
                        style={styles.input}
                      />
                      <div style={{ flex: 1 }} />
                      <span style={styles.iconWrap}>
                        <span style={styles.icon} title="Thickness of the trunk in world units.">?</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
      <div style={{ marginTop: '1em', border: '1px solid #ccc', borderRadius: '6px', padding: '0.5em' }}>
        <div style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setBranchOpen(v => !v)}>
          {branchOpen ? '▼' : '▶'} Branch Parameters
        </div>
        {branchOpen && (
          <div style={{ marginTop: '1em' }}>
            <div style={{ marginBottom: '1em' }}>
              <div style={styles.paramRow}>
                <label htmlFor="branchSegments" style={styles.label}>Branch Segments: </label>
                <input
                  id="branchSegments-slider"
                  type="range"
                  min={4.0}
                  max={32.0}
                  step={1}
                  value={branchSegments}
                  onChange={e => setBranchSegments(Number(e.target.value))}
                  style={styles.slider}
                />
                <input
                  id="branchSegments"
                  type="number"
                  min={4.0}
                  max={32.0}
                  step={1}
                  value={branchSegments}
                  onChange={e => setBranchSegments(Number(e.target.value))}
                  style={styles.input}
                />
                <div style={{ flex: 1 }} />
                <span style={styles.iconWrap}>
                  <span style={styles.icon} title="Number of mesh segments for each branch (controls smoothness).">?</span>
                </span>
              </div>
            </div>
            <div style={{ marginBottom: '1em' }}>
              <div style={styles.paramRow}>
                <label htmlFor="branchThicknessFactor" style={styles.label}>Branch Thickness Factor: </label>
                <input
                  id="branchThicknessFactor-slider"
                  type="range"
                  min={0.1}
                  max={2}
                  step={0.01}
                  value={branchThicknessFactor}
                  onChange={e => setBranchThicknessFactor(Number(e.target.value))}
                  style={styles.slider}
                />
                <input
                  id="branchThicknessFactor"
                  type="number"
                  min={0.1}
                  max={2}
                  step={0.01}
                  value={branchThicknessFactor}
                  onChange={e => setBranchThicknessFactor(Number(e.target.value))}
                  style={styles.input}
                />
                <div style={{ flex: 1 }} />
                <span style={styles.iconWrap}>
                  <span style={styles.icon} title="Factor by which branch thickness shrinks per iteration.">?</span>
                </span>
              </div>
            </div>
            <div style={{ marginBottom: '1em' }}>
              <div style={styles.paramRow}>
                <label htmlFor="branchLengthFactor" style={styles.label}>Branch Length Factor: </label>
                <input
                  id="branchLengthFactor-slider"
                  type="range"
                  min={0.1}
                  max={2}
                  step={0.01}
                  value={branchLengthFactor}
                  onChange={e => setBranchLengthFactor(Number(e.target.value))}
                  style={styles.slider}
                />
                <input
                  id="branchLengthFactor"
                  type="number"
                  min={0.1}
                  max={2}
                  step={0.01}
                  value={branchLengthFactor}
                  onChange={e => setBranchLengthFactor(Number(e.target.value))}
                  style={styles.input}
                />
                <div style={{ flex: 1 }} />
                <span style={styles.iconWrap}>
                  <span style={styles.icon} title="Factor by which branch length shrinks per iteration.">?</span>
                </span>
              </div>
            </div>
            <div style={{ marginBottom: '1em' }}>
              <div style={styles.paramRow}>
                <label htmlFor="barkColor" style={styles.label}>Bark Color: </label>
                <input
                  id="barkColor"
                  type="color"
                  value={`#${barkColor.toString(16).padStart(6, '0')}`}
                  onChange={e => setBarkColor(parseInt(e.target.value.replace('#', ''), 16))}
                  style={{ width: '60px', height: '30px', verticalAlign: 'middle' }}
                />
                <div style={{ flex: 1 }} />
                <span style={styles.iconWrap}>
                  <span style={styles.icon} title="Color of the bark material.">?</span>
                </span>
              </div>
            </div>
            <div style={{ marginBottom: '1em' }}>
              <div style={styles.paramRow}>
                <label htmlFor="minAngle" style={styles.label}>Min Branch Angle (deg): </label>
                <input
                  id="minAngle-slider"
                  type="range"
                  min={5}
                  max={175}
                  step={1}
                  value={minAngle}
                  onChange={e => setMinAngle(Number(e.target.value))}
                  style={styles.slider}
                />
                <input
                  id="minAngle"
                  type="number"
                  min={5}
                  max={175}
                  value={minAngle}
                  onChange={e => setMinAngle(Number(e.target.value))}
                  style={styles.input}
                />
                <div style={{ flex: 1 }} />
                <span style={styles.iconWrap}>
                  <span style={styles.icon} title="Minimum angle between branches in degrees.">?</span>
                </span>
              </div>
            </div>
            <div style={{ marginBottom: '1em' }}>
              <div style={styles.paramRow}>
                <label htmlFor="maxAngle" style={styles.label}>Max Branch Angle (deg): </label>
                <input
                  id="maxAngle-slider"
                  type="range"
                  min={5}
                  max={175}
                  step={1}
                  value={maxAngle}
                  onChange={e => setMaxAngle(Number(e.target.value))}
                  style={styles.slider}
                />
                <input
                  id="maxAngle"
                  type="number"
                  min={5}
                  max={175}
                  value={maxAngle}
                  onChange={e => setMaxAngle(Number(e.target.value))}
                  style={styles.input}
                />
                <div style={{ flex: 1 }} />
                <span style={styles.iconWrap}>
                  <span style={styles.icon} title="Maximum angle between branches in degrees.">?</span>
                </span>
              </div>
            </div>
            <div style={{ marginBottom: '1em' }}>
              <div style={styles.paramRow}>
                <label htmlFor="minBranch" style={styles.label}>Min Branches: </label>
                <input
                  id="minBranch-slider"
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={minBranch}
                  onChange={e => setMinBranch(Number(e.target.value))}
                  style={styles.slider}
                />
                <input
                  id="minBranch"
                  type="number"
                  min={0}
                  max={10}
                  value={minBranch}
                  onChange={e => setMinBranch(Number(e.target.value))}
                  style={styles.input}
                />
                <div style={{ flex: 1 }} />
                <span style={styles.iconWrap}>
                  <span style={styles.icon} title="Minimum number of branches per node.">?</span>
                </span>
              </div>
            </div>
            <div style={{ marginBottom: '1em' }}>
              <div style={styles.paramRow}>
                <label htmlFor="maxBranch" style={styles.label}>Max Branches: </label>
                <input
                  id="maxBranch-slider"
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={maxBranch}
                  onChange={e => setMaxBranch(Number(e.target.value))}
                  style={styles.slider}
                />
                <input
                  id="maxBranch"
                  type="number"
                  min={0}
                  max={10}
                  value={maxBranch}
                  onChange={e => setMaxBranch(Number(e.target.value))}
                  style={styles.input}
                />
                <div style={{ flex: 1 }} />
                <span style={styles.iconWrap}>
                  <span style={styles.icon} title="Maximum number of branches per node.">?</span>
                </span>
              </div>
            </div>
            <div style={{ marginBottom: '1em' }}>
              <div style={styles.paramRow}>
                <label htmlFor="minBranchOffset" style={styles.label}>Min Branch Offset: </label>
                <input
                  id="minBranchOffset-slider"
                  type="range"
                  min={0.0}
                  max={1.0}
                  step={0.01}
                  value={minBranchOffset}
                  onChange={e => setMinBranchOffset(Number(e.target.value))}
                  style={styles.slider}
                />
                <input
                  id="minBranchOffset"
                  type="number"
                  min={0.0}
                  max={1.0}
                  step={0.01}
                  value={minBranchOffset}
                  onChange={e => setMinBranchOffset(Number(e.target.value))}
                  style={styles.input}
                />
                <div style={{ flex: 1 }} />
                <span style={styles.iconWrap}>
                  <span style={styles.icon} title="Minimum offset for branch placement along parent branch.">?</span>
                </span>
              </div>
            </div>
            <div style={{ marginBottom: '1em' }}>
              <div style={styles.paramRow}>
                <label htmlFor="maxBranchOffset" style={styles.label}>Max Branch Offset: </label>
                <input
                  id="maxBranchOffset-slider"
                  type="range"
                  min={0.0}
                  max={1.0}
                  step={0.01}
                  value={maxBranchOffset}
                  onChange={e => setMaxBranchOffset(Number(e.target.value))}
                  style={styles.slider}
                />
                <input
                  id="maxBranchOffset"
                  type="number"
                  min={0.0}
                  max={1.0}
                  step={0.01}
                  value={maxBranchOffset}
                  onChange={e => setMaxBranchOffset(Number(e.target.value))}
                  style={styles.input}
                />
                <div style={{ flex: 1 }} />
                <span style={styles.iconWrap}>
                  <span style={styles.icon} title="Maximum offset for branch placement along parent branch.">?</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: '1em', border: '1px solid #ccc', borderRadius: '6px', padding: '0.5em' }}>
        <div style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setFoliageOpen(v => !v)}>
          {foliageOpen ? '▼' : '▶'} Foliage Parameters
        </div>
        {foliageOpen && (
          <div style={{ marginTop: '1em' }}>
            <div style={styles.paramRow}>
              <label htmlFor="folIterationStart" style={styles.label}>Foliage Iteration Start: </label>
              <input
                id="folIterationStart-slider"
                type="range"
                min={0}
                max={iterations}
                step={1}
                value={folIterationStart}
                onChange={e => setFolIterationStart(Number(e.target.value))}
                style={styles.slider}
              />
              <input
                id="folIterationStart"
                type="number"
                min={0}
                max={iterations}
                step={1}
                value={folIterationStart}
                onChange={e => setFolIterationStart(Number(e.target.value))}
                style={styles.input}
              />
              <div style={{ flex: 1 }} />
              <span style={styles.iconWrap}>
                <span style={styles.icon} title="Iteration at which foliage generation starts. Lower values place leaves closer to the trunk.">?</span>
              </span>
            </div>
            <div style={styles.paramRow}>
              <label htmlFor="leafTextureSize" style={styles.label}>Leaf Texture Size: </label>
              <input
                id="leafTextureSize-slider"
                type="range"
                min={1.0}
                max={10.0}
                step={0.01}
                value={leafTextureSize}
                onChange={e => setLeafTextureSize(Number(e.target.value))}
                style={styles.slider}
              />
              <input
                id="leafTextureSize"
                type="number"
                min={1.0}
                max={10.0}
                step={0.01}
                value={leafTextureSize}
                onChange={e => setLeafTextureSize(Number(e.target.value))}
                style={styles.input}
              />
              <div style={{ flex: 1 }} />
              <span style={styles.iconWrap}>
                <span style={styles.icon} title="Size of the leaf texture sprites in world units.">?</span>
              </span>
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: '1em' }}>
        <button onClick={onRegenerate}>Regenerate Tree</button>
        <button
          style={{ marginTop: '1em', width: '100%' }}
          onClick={handleExportGLTF}
        >
          Export Tree as glTF
        </button>
      </div>
    </div>
  );
}
