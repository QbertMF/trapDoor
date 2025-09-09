import React from 'react';

export default function Statistics({ branchCount, foliageCount }) {
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
      Foliage Sprites: {foliageCount}
    </div>
  );
}
