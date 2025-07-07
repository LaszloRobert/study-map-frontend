import React from 'react';

const GamePanel = ({ gameMode, currentGameCounty, timer }) => {
  return (
    <>
      {gameMode && currentGameCounty && (
        <div className="bg-surface p-4 rounded-xl shadow-lg border border-primary text-center max-w-xs mx-auto -mt-2 sm:-mt-[80px]">
          <p className="text-xl font-semibold text-text">
            Alege: <span className="text-primary">{currentGameCounty}</span>
          </p>
          <div className="mt-2 text-accent font-medium text-lg flex items-center justify-center gap-1">
            ⏳ <span>{timer}s</span> remaining
          </div>
        </div>
      )}
    </>
  );
};

export default GamePanel; 