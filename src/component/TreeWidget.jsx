import React from 'react';

export default function TreeWidget({ iterations, setIterations }) {
  return (
    <div style={{ margin: '1em 0' }}>
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
  );
}
