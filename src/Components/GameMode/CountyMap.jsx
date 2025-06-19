import React from 'react';
import { ReactComponent as RomaniaMap } from '../../assets/Romania-Map.svg';

const CountyMap = ({
  unlockedCounties,
  lockPositions,
  onCountyClick,
  onCountyHover,
  onCountyLeave,
  svgRef,
  gameMode,
  countyColors,
  highlightedCounty,
  gamePool,
  countyPrice,
}) => {
  return (
    <div className={`relative w-full max-w-3xl px-1 ${gameMode ? 'game-mode' : ''}`}>
      <RomaniaMap
        ref={svgRef}
        onClick={onCountyClick}
        onMouseMove={!gameMode ? onCountyHover : undefined}
        onMouseLeave={!gameMode ? onCountyLeave : undefined}
        className="w-full h-auto map"
      />
      {/* Render lock icons for counties not yet unlocked (outside game mode) */}
      {!gameMode && (
        <svg
          viewBox="0 0 613 433"
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        >
          {lockPositions.map((pos, index) => (
            <g
              key={index}
              transform={`translate(${pos.x},${pos.y})`}
              className="cursor-pointer"
              onClick={() => onCountyClick({ target: { getAttribute: () => pos.name } })}
            >
              <text
                x="0"
                y="5"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="20"
                fill="#333"
              >
                🔒
              </text>
              <text
                x="0"
                y="28"
                textAnchor="middle"
                fontSize="15"
                fontWeight="bold"
                fill="#333"
              >
                {countyPrice}
              </text>
            </g>
          ))}
        </svg>
      )}
    </div>
  );
};

export default CountyMap; 