import React from 'react';

const UnlockedCountiesList = ({ unlockedCounties }) => (
  <div className="mt-4 w-full max-w-3xl px-1">
    <h2 className="text-lg sm:text-2xl font-extrabold mb-1 sm:mb-2 text-primary flex items-center gap-2">
      <span className="border-l-4 border-primary pl-2">Județe deblocate</span>
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
      {unlockedCounties.map((county) => (
        <div key={county} className="p-2 sm:p-3 bg-white rounded-lg shadow text-center text-sm sm:text-base font-semibold border border-gray-200 text-gray-800">
          {county}
        </div>
      ))}
    </div>
  </div>
);

export default UnlockedCountiesList; 