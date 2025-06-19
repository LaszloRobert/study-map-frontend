import React from 'react';

const UnlockedCountiesList = ({ unlockedCounties }) => (
  <div className="mt-8 w-full max-w-3xl">
    <h2 className="text-xl font-bold mb-4">Unlocked Counties</h2>
    <div className="grid grid-cols-3 gap-4">
      {unlockedCounties.map((county) => (
        <div key={county} className="p-2 bg-gray-100 rounded text-center">
          {county}
        </div>
      ))}
    </div>
  </div>
);

export default UnlockedCountiesList; 