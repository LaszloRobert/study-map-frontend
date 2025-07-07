import React from 'react';

const Tooltip = ({ hoveredCounty, countyPrice, dialogPosition }) => {
  if (!hoveredCounty) return null;
  // Add extra offset on mobile to avoid overlapping 'Stop joc'
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const extraTop = isMobile ? 60 : 0;
  return (
    <div
      className="absolute bg-white p-4 rounded-lg shadow-lg border border-gray-200"
      style={{
        position: 'fixed',
        left: dialogPosition.x,
        top: dialogPosition.y + extraTop,
        zIndex: 1000,
      }}
    >
      <h3 className="font-bold mb-2">{hoveredCounty}</h3>
      <p className="mb-2">Cost deblocare: {countyPrice} coins</p>
    </div>
  );
};

export default Tooltip; 