import React from 'react';

export default function Statistics({ branchCount, foliageCount, cameraPosition }) {
  return (
    <div style={{
      position: 'absolute',
      top: 10,
      left: 10,
      color: 'white',
      fontSize: '0.9em',
      background: 'rgba(0,0,0,0.4)',
      padding: '6px 12px',
      borderRadius: '6px',
      zIndex: 1000,
      pointerEvents: 'none',
    }}>
      Branches: {branchCount}<br />
      Foliage Sprites: {foliageCount}<br />
      {cameraPosition && typeof cameraPosition.x === 'number' && (
        <>Camera Position: {cameraPosition.x.toFixed(2)}, {cameraPosition.y.toFixed(2)}, {cameraPosition.z.toFixed(2)}</>
      )}
    </div>
  );
}
